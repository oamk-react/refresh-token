import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'

const { sign,verify } = jwt

const jwt_secret = 'aEbsDjd!hf567?890'
const port = 3001

const app = express()
app.use(cors())
app.use(express.json())

const auth = (req,res,next) => {
  if (!req.headers.authorization) return res.status(401).json({error: 'Unauthorized'})
  try { 
    const authHeader = req.headers.authorization
    const access_token = authHeader.split(" ")[1]

    verify(access_token,jwt_secret)
    next()
  } catch (error) { 
    return res.status(401).json({error: 'Unauthorized'})
  }    
}

app.get('/',(req,res) => {
  res.status(200).send('Server running...')
})

app.post('/signin',(req,res) => {
  const { email, password } = req.body
  if (email === 'admin@foo.com' && password === 'adm123FOO?') {
    const access_token = sign({user: email},jwt_secret)
    return res
      .status(200)
      .json({
        email: email,
        access_token: access_token
      }
    )
  }
  return res.status(401).json({error: 'Invalid credentials'}) 
})

app.get('/secured',auth,(req,res) => {
  return res.status(200).json({message: 'This is secured content.'})
})


app.listen(port)