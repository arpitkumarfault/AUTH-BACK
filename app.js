import express from 'express'
import dbConnection from './database/dbConnection.js'
import dotenv from 'dotenv'
import router from './routes/useAuthRoutes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.get('/profile', (req, res) => {
  res.send('The profile page')
})

app.get('/', (req, res) => {
  res.send('The home page')
})

app.use('/api/v3/user', router)

dbConnection()

export default app
