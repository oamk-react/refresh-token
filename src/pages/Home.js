import React, { useEffect, useState } from 'react'
import { useUser } from '../context/useUser'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  const { user } = useUser()
  const [message, setMessage] = useState('')
  
  useEffect(() => {
    const headers = {headers: {Authorization: 'Bearer ' + user.access_token}}
    axios.get('http://localhost:3001/secured',headers)
      .then(response => {
        setMessage(response.data.message)
      })
      .catch (error => {
        if (error.status === 401) navigate("/login")
      })
  }, [])
  
  return (
    <div>
      <h3>Secret message from server</h3>
      <p>{message}</p>
    </div>
  )
}
