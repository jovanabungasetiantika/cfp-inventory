// import jwtDecode from 'jwt-decode'
import Cookies from 'universal-cookie'

const isExpired = () => {
  const cookies = new Cookies()
  const token = cookies.get('rajainv') || null

  if (!token) return true
  
  const current = Math.round(new Date().getTime() / 1000)

  if (token.expire_at < current) { return true }

  return false
}

export default isExpired
