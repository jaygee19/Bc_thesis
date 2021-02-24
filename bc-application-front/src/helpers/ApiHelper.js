import axios from 'axios'
import AuthHelper from './AuthHelper'

export const API_URL = 'http://localhost:8000/api'

export async function getApiResponse(
  endpoint,
  method,
  data = null,
  contentType = 'application/json'
) {
   console.log("Textik " + AuthHelper.getInstance().getCurrentUser()) 
   //if (AuthHelper.getInstance().getCurrentUser() !== undefined)
  return await axios.request({
    method: method,
    url: API_URL + '/' + endpoint,
    data: data,
     //headers: null, 
    headers: AuthHelper.getInstance().getCurrentUser() != undefined ||  AuthHelper.getInstance().getCurrentUser() != null
    ? AuthHelper.getInstance().getAuthHeaders()
    : null,
    
    contentType: contentType,
  })
}