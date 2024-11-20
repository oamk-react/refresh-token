import React, { useEffect,useState } from 'react'
import { useUser } from '../hooks/useUser'
import './Login.css'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { user, setUser, signIn,autoLogin } = useUser()
  const [autoLogging, setAutoLogging] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    (async() => {
      try {
        await autoLogin()
        navigate("/")
      } catch {
        // If there is any error change to login screen.
        setAutoLogging(false)
      }
    })()
  }, [])
  


  const login = async (e) => {
    e.preventDefault()
    try {
      await signIn()
      navigate("/")
    } catch (error) {
      const message = error.response && error.response.data ? error.response.data.error : error
      alert(message)
    } 
  }

  return (
    <>
      {
        autoLogging ? (
          <p>Logging in ...</p>
        ) : (
          <form onSubmit={login}>
            <h3>Login</h3>
            <div>
              <input 
                placeholder='Type your email here...'
                type="email"
                value={ user.email }
                onChange={e => setUser({...user,email: e.target.value})}
              />
            </div>
            <div>
              <input 
                placeholder='Type your password here...'
                type="password"
                value={user.password}
                onChange={e => setUser({...user,password: e.target.value})}
              />
            </div>
            <button>Ok</button>
          </form>
        )
      } 
    </>
  )
}
