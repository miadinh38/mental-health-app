import axios from 'axios';

export const registerUserService = ({ name, email, password, birthday, phone, gender }) => {
  return axios.post("http://localhost:8000/api/auth/register", { name, email, password, birthday, phone, gender })
}

export const loginUserService = ({ email, password}) => {
  return axios.post("http://localhost:8000/api/auth/login", { email, password })
}

export const checkAuthenticationService = (token) => {
  const headers = {
    Authorization: `Bearer ${token}`
  }
  return axios.get("http://localhost:8000/api/auth/is-verify", {
      headers
    }
  )
}