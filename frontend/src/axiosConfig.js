import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // now using .env
  withCredentials: true, // still keeps cookies for auth
});

export default instance;
