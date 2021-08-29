import axiosMiddleware from 'redux-axios-middleware'
import axios from 'axios'
import Cookies from 'universal-cookie'

const axiosMiddlewareOptions = {
  returnRejectedPromiseOnError: true,
  interceptors: {
    request: [
      (state, config) => {
        const cookies = new Cookies()
        const cfpinvToken = cookies.get('cfpinv') || null
        if (cfpinvToken) {
          config.headers["Authorization"] = `Bearer ${cfpinvToken.token.accessToken}`; //eslint-disable-line
        }
        return config
      },
    ],
  },
}

export default axiosMiddleware(axios, axiosMiddlewareOptions)
