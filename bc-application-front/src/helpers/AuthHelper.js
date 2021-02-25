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
    console.log("po logine" + this.currentUser)
  }

  getCurrentUser() {
    return this.currentUser
  }

  logoutUser() {
    localStorage.removeItem('token')
    this.currentUser = null
    console.log("po logoute " + this.currentUser)
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
      res.data.user === null
    )
    {
        return null
    }

    return {
      token: token,
      //name: res.data.user.name,
    }
  }

  getAuthHeaders() {
    return { Authorization: 'Bearer ' + this.currentUser.token }
  }
}

export default AuthHelper