import axios from "axios"
import { useUser } from "./useUser"
import { useState,useEffect } from "react"

export function useGet() {
  const { user, updateToken } = useUser()
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const headers = {headers: {Authorization: 'Bearer ' + user.access_token}}
    axios.get('http://localhost:3001/secured',headers)
      .then(response => {
        setData(response.data)
        updateToken(response)
      })
      .catch (err => {
        setError(err)       
      })
      setLoading(false)
  }, []) 

  return { data,error,loading }
}
