import React from 'react'
import { useState } from 'react';
import { UserContext } from './UserContext.js';
import axios from 'axios'

const base_url = 'http://localhost:3001'

export default function UserProvider({children}) {
  const userFromSessionStorage = sessionStorage.getItem('user')
  // Correct email and  password are initialized just for testing purposes (so there is no need to type them over and over again while testing/developing).
  const [user, setUser] = useState(userFromSessionStorage ? JSON.parse(userFromSessionStorage): {email: 'admin@foo.com',password: 'adm123FOO?'})

  const signIn = async () => {
    const json = JSON.stringify(user)
    const headers = {headers: {'Content-Type':'application/json'}}
    try {
      axios.defaults.withCredentials = true
      const response = await axios.post(base_url + '/signin',json,headers)
      const token = readAuthorizationHeader(response)
      const user = {email: response.data.email,access_token: token}
      setUser(user)
      sessionStorage.setItem("user",JSON.stringify(user))
      //console.log(listCookies()) // This can be used to test if client receives any cookies from the server.
    } catch(error) {
      setUser({email: '',password: ''})
      throw error
    }
  }
  
/*   function listCookies() {
    var theCookies = document.cookie.split(';');
    var aString = '';
    for (var i = 1 ; i <= theCookies.length; i++) {
        aString += i + ' ' + theCookies[i-1] + "\n";
    }
    return aString;
  } */

  const updateToken = (response) => {
    const token = readAuthorizationHeader(response)
    const newUser = {...user,access_token: token}
    setUser(newUser)
    sessionStorage.setItem("user",JSON.stringify(newUser))
  }

  const readAuthorizationHeader = (response) => {
    if (response.headers.get('authorization') && 
      response.headers.get('authorization').split(' ')[0] === 'Bearer') {
      return response.headers.get('authorization').split(' ')[1]
    }
  }

  return (
    <UserContext.Provider value={{user, setUser,signIn,updateToken}}>
      { children }
    </UserContext.Provider>
  )
}

