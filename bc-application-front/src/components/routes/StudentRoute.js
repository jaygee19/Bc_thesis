import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthHelper from '../../helpers/AuthHelper'

const StudentRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (!AuthHelper.getInstance().isUserStudent() ) {
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

export default StudentRoute