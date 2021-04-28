
import axios from 'axios'
import AuthHelper from './AuthHelper'

export async function getApiResponse(endpoint, method, data = null, contentType = 'application/json') {
  return await axios.request({
    method: method,
    url: 'http://localhost:8000/api/' + endpoint,
    data: data,
    headers: AuthHelper.getInstance().getCurrentUser() != undefined ||  AuthHelper.getInstance().getCurrentUser() != null
    ? AuthHelper.getInstance().getAuthHeaders() : null,
    contentType: contentType,
  })
}