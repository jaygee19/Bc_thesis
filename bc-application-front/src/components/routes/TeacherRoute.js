import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthHelper from '../../helpers/AuthHelper'

const TeacherRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (!AuthHelper.getInstance().isUserTeacher() ) {
          console.log("Ma ma vratit na login")
        return (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
      console.log("Mam ostat na stranke")
      return <Component {...props} {...rest} />
    }}
  />
)

export default TeacherRoute