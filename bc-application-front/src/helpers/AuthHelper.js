import axios from 'axios'
import { API_URL } from './ApiHelper'

class AuthHelper {
  static getInstance() {
    if (AuthHelper._instance == null) AuthHelper._instance = new AuthHelper()
    return AuthHelper._instance
  }

  async loadCurrentUser() {
    const token = localStorage.getItem('token')
    //console.log("MAM TOKEN" + token)
    this.currentUser = await this.getUserFromToken(token)
  }

  async loginUser(token) {
    localStorage.setItem('token', token)
    this.currentUser = await this.getUserFromToken(token)
    //console.log("po logine" + this.currentUser)
  }

  async getUserFromToken(token) {
    //console.log("Ziskavam usera")
    if (token == null) 
    {
        //console.log("Token je NULL")
        return null
    }

    const res = await axios.get(API_URL + '/user', {
      headers: { Authorization: 'Bearer ' + token },
    })

    if ( res.data.status === 'Authorization Token not found' || res.data.user === null)
    {
        //console.log("Neviem preco som tu")
        return null
    }

    ///console.log("Som spravne")
    return {
      token: token,
      user_id: res.data.user_id,
      isTeacher : res.data.role === 't',
      isStudent : res.data.role === 's',
    }
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
    if (this.currentUser != null) 
    {
        return true;
    } else {
        return false;
    }
    //return this.currentUser != null
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
        console.log("Halus")
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

  getAuthHeaders() {
    return { Authorization: 'Bearer ' + this.currentUser.token }
  }
}

export default AuthHelper