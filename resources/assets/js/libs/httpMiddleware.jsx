import axiosMiddleware from 'redux-axios-middleware'
import axios from 'axios'
import Cookies from 'universal-cookie'

const axiosMiddlewareOptions = {
  returnRejectedPromiseOnError: true,
  interceptors: {
    request: [
      (state, config) => {
        const cookies = new Cookies()
        const rajainvToken = cookies.get('rajainv') || null
        if (rajainvToken) {
          config.headers["Authorization"] = `Bearer ${rajainvToken.token.accessToken}`; //eslint-disable-line
        }
        return config
      },
    ],
  },
}

export default axiosMiddleware(axios, axiosMiddlewareOptions)
