import { Link } from 'react-router-dom'
import { useGet } from '../hooks/useGet'

export default function Home() {
  const { data, error, loading } = useGet()
  
  return (
    <div>
      <h3>Secret message from server</h3>
      {
        loading ? (
          <p>Loading...</p>
        ) : (
          error ? (
            <p>
              {error.response.data ? error.response.data.error : error.message}
              <br />
              {error.status === 401 && <Link to="/login">Login again</Link>}
            </p>
          ) : (
            <p>{data ? data.message : ''}</p>
          )
        )
      } 
    </div>
  )
}
