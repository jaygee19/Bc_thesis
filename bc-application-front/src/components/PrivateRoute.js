import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthHelper from '../helpers/AuthHelper'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (!AuthHelper.getInstance().isUserLoggedIn()) {
        return (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
      return <Component {...props} {...rest} />
    }}
  />
)

export default PrivateRoute