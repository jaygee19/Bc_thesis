import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthHelper from '../helpers/AuthHelper'

const LoggedInRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (!AuthHelper.getInstance().isUserLoggedIn()) {
        console.log("Teraz nie je")

        return (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
      console.log("Teraz je prihlaseny")
      return <Component {...props} {...rest} />
    }}
  />
)

export default LoggedInRoute