import axios from "axios"
import { useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

export const useRedirect = (userAuthStatus) => {
  const history = useHistory()

  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post('/dj-rest-auth/token/refresh/')
        // this code runs if user is logged in
        if (userAuthStatus === 'loggedIn') {
          history.push('/')
        }
      } catch(err) {
        // this code runs if user is logged out
        if (userAuthStatus === 'loggedOut') {
          history.push('/')
        }
      }
    }

    handleMount()
  }, [history, userAuthStatus])
}