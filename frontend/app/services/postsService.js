import axios from "axios";
import { API_URL } from "../../constants/api";

export const fetchPosts = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(`${API_URL}/posts`, { headers });
};

export const createNewPost = async (token, content) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.post(`${API_URL}/posts`, content , { headers });
};

export const updatePost = async (token, content, postId) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.put(`${API_URL}/posts/${postId}`, content , { headers });
};

export const deletePost = async (token, postId) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.delete(`${API_URL}/posts/${postId}`, { headers });
};
