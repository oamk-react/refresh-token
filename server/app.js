import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

const { sign,verify } = jwt

const jwt_secret = 'aEbsDjd!hf567?890'
const port = 3001

const app = express()
app.use(cors({credentials: true,origin: 'http://localhost:3000'}))
app.use(express.json())
app.use(cookieParser())

app.use((req,res,next) => {
  res.exposeHeaders = () => {
    return res.header('Access-Control-Expose-Headers','Authorization,Set-Cookie')
  }

  res.authorizationHeader = (email) => {
    const access_token = sign({user: email},jwt_secret,{expiresIn: '1m'})
    return res.header('Authorization','Bearer ' + access_token)
  }

  res.refreshToken = (email) => {
    const refresh_token = sign({user: email},jwt_secret,{expiresIn: '2m'})
    
    return res.cookie('refreshToken',refresh_token,{
       /*        httpOnly: false,
              path:"/",
              domain: "localhost",
              secure: false,
              sameSite: "lax", */
              maxAge: 1000 * 60 * 2
            })
          }

  next()
})

const auth = (req,res,next) => {
  let decodedUser = null
  if (!req.headers.authorization || !req.cookies['refreshToken']) 
    return res.status(401).json({error: 'Unauthorized'})
  
  try { 
    const authHeader = req.headers.authorization
    const access_token = authHeader.split(" ")[1]
    decodedUser = verify(access_token,jwt_secret)
  } catch (error) { 
    try {
      const refresh_token = req.cookies['refreshToken']
      decodedUser = verify(refresh_token,jwt_secret)
    } catch (error) {
      return res.status(401).json({error: 'Unauthorized'})
    }
  }    
  finally {
    res.exposeHeaders()
    res.authorizationHeader(decodedUser.email)
    next()
  }
}

app.get('/',(req,res) => {
  res.status(200).send('Server running...')
})

app.post('/signin',(req,res) => {
  const { email, password } = req.body
  if (email === 'admin@foo.com' && password === 'adm123FOO?') {
    return res
      .exposeHeaders()
      .authorizationHeader(email)
      .refreshToken(email)
      .status(200)
      .json({
        email: email
      }
    )
  }
  return res.status(401).json({error: 'Invalid credentials'}) 
})

app.post('/autologin',(req,res) => {
  if (req.cookies['refreshToken']) {
    try {
      const refresh_token = req.cookies['refreshToken']
      const decodedUser = verify(refresh_token,jwt_secret)
      return res.exposeHeaders()
                .authorizationHeader(decodedUser.email)
                .status(200).json({message: 'Valid refreshtoken'})
    } catch (error) {
      return res.status(401).json({error: 'Unauthorized'})
    }
  } else {
    return res.status(401).json({error: 'Unauthorized'})
  }  
})

app.get('/secured',auth,(req,res) => {
  return res.status(200).json({message: 'This is secured content.'})
})


app.listen(port)