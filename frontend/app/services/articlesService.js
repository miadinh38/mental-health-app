import axios from 'axios';
import { API_URL } from '../../constants/api';

export const insertArticlesService = async() => {
  return await axios.post(`${API_URL}/articles`);
}

export const checkArticlesExist = async() => {
  return await axios.get(`${API_URL}/articles/check-articles`);
}

export const fetchAllArticlesService = async() => {
  return await axios.get(`${API_URL}/articles`);
}

export const searchedArticlesService = async(searchInput) => {
  return await axios.get(`${API_URL}/articles/search?q=${encodeURIComponent(searchInput)}`);
}
