import React, { useEffect, useState } from 'react'
import { useUser } from '../context/useUser'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  const { user } = useUser()
  const [message, setMessage] = useState('')
  
  return (
    <div>
      <h3>Secret message from server</h3>
      <p>{message}</p>
    </div>
  )
}
