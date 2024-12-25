import axios from 'axios';

export const axiosSecure = axios.create({
    baseURL: 'https://b10a11-server-side-abdurrahmanmahmud5981.vercel.app',
    withCredentials: true,
  })