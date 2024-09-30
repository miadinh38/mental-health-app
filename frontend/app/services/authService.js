import axios from 'axios';
import { API_URL } from '../../constants/api';

export const registerUserService = ({ name, email, password, birthday, phone, gender }) => {
  return axios.post(`${API_URL}/auth/register`, { name, email, password, birthday, phone, gender })
}

export const loginUserService = ({ email, password}) => {
  return axios.post(`${API_URL}/auth/login`, { email, password })
}

export const checkAuthenticationService = (token) => {
  const headers = {
    Authorization: `Bearer ${token}`
  }
  return axios.get(`${API_URL}/auth/is-verify`, {
      headers
    }
  )
}

export const forgotPasswordService = ({ email }) => {
  return axios.post(`${API_URL}/auth/forgot-password`, { email })
}