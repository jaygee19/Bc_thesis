import axios from 'axios'
import { API_URL } from './ApiHelper'
import { getApiResponse } from './ApiHelper'


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

  async getUserFromToken(token) {
    if (token == null) 
    {
        return null
    }

    const res = await axios.get(API_URL + '/user', {
      headers: { Authorization: 'Bearer ' + token },
    })

    if ( res.data.status === 'Authorization Token not found' || res.data.user === null)
    {
        return null
    }

    return {
      token: token,
      user_id: res.data.user_id,
      name: res.data.name,
      surname: res.data.surname,
      isTeacher : res.data.role === 't',
      isStudent : res.data.role === 's',
    }
  }

  getCurrentUser() {
    return this.currentUser
  }

  logoutUser() {
    // const res = await getApiResponse('logout', 'get', this.getUserToken())
    // console.log(res)
    localStorage.removeItem('token')
    this.currentUser = null
  }

  isUserLoggedIn() {
    if (this.currentUser != null) 
    {
        return true;
    } else {
        return false;
    }
  }

  isUserStudent() {
    if (this.currentUser == null) 
    {
        return false
    }
    return this.currentUser.isStudent
  }

  isUserTeacher() {
    if (this.currentUser == null) 
    {
        return false
    }
    return this.currentUser.isTeacher
  }

  getUserID() {
    if (this.currentUser == null) 
    {
        return null
    }
    return this.currentUser.user_id
  }

  getUserName() {
    if (this.currentUser == null) 
    {
        return null
    }
    return this.currentUser.name + " " + this.currentUser.surname
  }

  getUserToken() {
    if (this.currentUser == null) 
    {
        return null
    }
    return this.currentUser.api_token
  }

  getAuthHeaders() {
    return { Authorization: 'Bearer ' + this.currentUser.token }
  }
}

export default AuthHelper