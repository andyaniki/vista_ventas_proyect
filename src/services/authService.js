import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; 

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data; // Debe devolver { token, user }
};
