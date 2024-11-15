import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

const port = 3001

const app = express()
app.use(cors({credentials: true,origin: 'http://localhost:3000',preflightContinue: true}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get('/',(req,res) => {
  res.status(200).send('Server running...')
})

app.listen(port)