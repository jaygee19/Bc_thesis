import axios from 'axios'
import { API_URL } from './ApiHelper'

class AuthHelper {
  static getInstance() {
    if (AuthHelper._instance == null) AuthHelper._instance = new AuthHelper()
    return AuthHelper._instance
  }

  async loadCurrentUser() {
    const token = localStorage.getItem('token')
    this.currentUser = await this.getUserFromToken(token)
  }

  async loginUser(token) {
    localStorage.setItem('token', token)
    this.currentUser = await this.getUserFromToken(token)
  }

  getCurrentUser() {
    return this.currentUser
  }

  logoutUser() {
    localStorage.removeItem('token')
    this.currentUser = null
  }

  isUserLoggedIn() {
    return this.currentUser != null
  }

  isUserAdmin() {
    if (this.currentUser == null) return false
    return this.currentUser.isAdmin
  }

  async getUserFromToken(token) {
    if (token == null) return null

    const res = await axios.get(API_URL + '/user', {
      headers: { Authorization: 'Bearer ' + token },
    })

    if (
      res.data.status === 'Authorization Token not found' ||
      res.data.user === undefined
    )
      return null

    return {
      token: token,
      ldap_login: res.data.user.ldap_login,
    }
  }

  getAuthHeaders() {
    return { Authorization: 'Bearer ' + this.currentUser.token }
  }
}

export default AuthHelper