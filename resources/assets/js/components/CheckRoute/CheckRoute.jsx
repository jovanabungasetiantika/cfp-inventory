import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const CheckRoute = ({ component: Component, isGuest, falseComponent, decisionFunc, ...rest }) => {
  return (
    <Route
      {...rest}

      render={ props => (
        decisionFunc() ?
          <Redirect to={{
            pathname: isGuest ? '/' : '/login',
            state: { from: props.location }
          }} />
          : (<Component {...props} />)
      )}
    />
  )
}

export default CheckRoute