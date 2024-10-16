import axios from 'axios';
import { API_URL } from '../../constants/api';

export const checkUserHasJoined = async(token) => {
  const headers = {
    Authorization: `Bearer ${token}`
  }
  return await axios.get(`${API_URL}/community-users/has-joined`,{headers});
}

export const createCommunityUser = async({token, nickname}) => {
  const headers = {
    Authorization: `Bearer ${token}`
  }
  return await axios.post(`${API_URL}/community-users`, {nickname}, {headers});
}