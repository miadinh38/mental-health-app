import axios from 'axios';
import { API_URL } from '../../constants/api';

export const insertArticlesService = async() => {
  return await axios.post(`${API_URL}/articles`);
}

export const fetchAllArticlesService = async(currentPage, limit) => {
  return await axios.get(`${API_URL}/articles?page=${currentPage}&limit=${limit}`);
}

export const searchedArticlesService = async(searchInput, currentPage, limit) => {
  return await axios.get(`${API_URL}/articles/search?q=${encodeURIComponent(searchInput)}&page=${currentPage}&limit=${limit}`);
}
