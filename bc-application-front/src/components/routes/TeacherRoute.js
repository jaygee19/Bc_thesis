import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthHelper from '../../helpers/AuthHelper'

const TeacherRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (!AuthHelper.getInstance().isUserTeacher() ) {
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

export default TeacherRoute