import { Router } from 'express'
import express from 'express'
import userRegister from '../controller/userRegister.js'
import userLogin from '../controller/userLogin.js'
import { sendOtp } from '../controller/SendUserOtp.js'
import userVerificationOTP from '../controller/userOTPVerification.js'
const router = express.Router()


router.post('/send-otp', sendOtp)
router.post('/verify-otp', userVerificationOTP)
router.post('/register', userRegister)
router.post('/login', userLogin)

export default router
