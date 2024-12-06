import mongoose, { model } from 'mongoose'

const userModel = mongoose.Schema({
  username: { type: String },
  email: { type: String, unique: true },
  password: {
    type: String,
    required: true,
  },
})

const user = mongoose.model('user', userModel)
export default user
