import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import tokenGeneration from './tokenGeneration.js'

const userRegister = async (req, res) => {
  const { email, password, username } = req.body

  try {
    // Check if the user already exists
    const existingUser = await userModel.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    })

    const token = tokenGeneration(newUser._id, email) // Pass userId and email separately

    // Set the token in a cookie
    res.cookie(process.env.JWT_SECRET, token, {
      httpOnly: true, // Ensures the cookie is only accessible via HTTP
      maxAge: 3600000, // 1 hour
    })

    await newUser.save()

    return res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }
}

export default userRegister
