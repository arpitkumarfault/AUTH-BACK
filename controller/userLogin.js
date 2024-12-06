import tokenGeneration from './tokenGeneration.js';
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = tokenGeneration(user._id, email);

    // Set the token in a cookie
    res.cookie(process.env.JWT_SECRET, token, {
      httpOnly: true,
      maxAge: 3600000, // 1 hour
    });

    return res.status(200).json({
      message: 'Login successful ✅✅',
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong 🚨🚨🚨' });
  }
};

export default userLogin;
