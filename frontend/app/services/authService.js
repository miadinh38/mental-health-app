import axios from 'axios';

export const registerUserService = ({ name, email, password, birthday, phone, gender }) => {
  return axios.post("http://localhost:8000/api/auth/register", { name, email, password, birthday, phone, gender })
}