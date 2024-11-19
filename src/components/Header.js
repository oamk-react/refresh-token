import React,{useEffect, useState} from 'react'
import './Header.css'

export default function Header() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date())
    },1000)
  
    return () => {
      clearInterval(id)
    }
  }, [])
  
  return (
    <header>{time.toLocaleTimeString()}</header>
  )
}
