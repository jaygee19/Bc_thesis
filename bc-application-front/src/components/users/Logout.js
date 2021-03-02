import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import AuthHelper from '../../helpers/AuthHelper'

class Logout extends Component {
  render() {
    AuthHelper.getInstance().logoutUser()
    return <Redirect to="/" />
  }
}

export default Logout