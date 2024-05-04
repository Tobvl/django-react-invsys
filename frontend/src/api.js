import axios from 'axios';
import { ACCESS_TOKEN } from './constants';

const api = axios.create({
    baseURL: 'import.meta.env.VITE_API_URL', // Permite cargar variables de entorno en el frontend

})

api.interceptors.request.use(
  (config) => {
    // Ver en el localstorage si hay un access token
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject("Ocurrió un error! (API INTERCEPTOR) " + error)
  }
)

export default api