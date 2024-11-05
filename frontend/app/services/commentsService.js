import axios from "axios";
import { API_URL } from "../../constants/api";


export const fetchComments = async (token, postId) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(`${API_URL}/posts/${postId}/comments`, { headers });
};

export const createNewComment = async (token, content, postId) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.post(`${API_URL}/posts/${postId}/comments`, content , { headers });
};

export const updateComment = async (token, content, postId, commentId) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.put(`${API_URL}/posts/${postId}/comments/${commentId}`, content , { headers });
};

export const deleteComment = async (token, postId, commentId) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.delete(`${API_URL}/posts/${postId}/comments/${commentId}`, { headers });
};
