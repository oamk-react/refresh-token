import React from 'react'
import { useState } from 'react';
import { UserContext } from './UserContext.js';
import axios from 'axios'

const base_url = 'http://localhost:3001'

export default function UserProvider({children}) {
  const userFromSessionStorage = sessionStorage.getItem('user')
  const [user, setUser] = useState(userFromSessionStorage ? JSON.parse(userFromSessionStorage): {email: 'admin@foo.com',password: 'adm123FOO?'})

  const signIn = async () => {
    const json = JSON.stringify(user)
    const headers = {headers: {'Content-Type':'application/json'}}
    try {
      const response = await axios.post(base_url + '/signin',json,headers)
      setUser(response.data)
      sessionStorage.setItem("user",JSON.stringify(response.data))
    } catch(error) {
      setUser({email: '',password: ''})
      throw error
    }
  } 

  return (
    <UserContext.Provider value={{user, setUser,signIn}}>
      { children }
    </UserContext.Provider>
  )
}

