import axios from 'axios';
import { API_URL } from '../../constants/api';

export const fetchAllArticlesService = async() => {
  return await axios.get(`${API_URL}/articles`);
}