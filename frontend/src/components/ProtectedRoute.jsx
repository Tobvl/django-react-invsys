import {Navigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN} from '../constants';
import { useState, useEffect } from 'react';


function ProtectedRoute({children}) {
  /* Verificar si estamos autorizados antes de entrar a la ruta
  vamos a intentar autorizarnos viendo si tenemos un token
  y si tenemos un token blabla y si no podemos acceder,
  nos retorna al login*/

  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    auth().catch((error) => {
      setIsAuthorized(false);
      console.log("Error al autenticar por primera vez!: ", error)
    });
  }, [])
  

  const refreshToken = async () => {
    // Refrescar el token
    // Obtenemos el refresh token del local storage
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    /* Intentamos refrescar el token haciendo una petición a nuestro backend
    (pasandole el refresh token) y si nos da un token de vuelta (status 200)
    lo autorizamos y pasamos al localStorage el nuevo token de acceso*/
    try {
      const res = await api.post('/api/token/refresh/', {
        refresh: refreshToken,
        });
        if (res.status === 200) {
          localStorage.setItem(ACCESS_TOKEN, res.data.access);
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
    } catch (error) {
      console.log(error)
      setIsAuthorized(false);
    }
    
  }

  const auth = async () => {
    // Ver si tenemos un access token
    // Si tenemos uno, ver si está expirado o no
    // Si está expirado, lo refrescamos (así el usuario no se preocupa de nada)
    // Si no podemos refrescarlo, redirigimos al usuario a /login

    const token = localStore.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000; // Convertir a segundos y no milisegundos

    // Si el token expiró
    if (tokenExpiration < now){
      // Refrescar el token
      await refreshToken()
    } else {
      // Si no expiró, estamos autorizados
      setIsAuthorized(true);
    }
  }
  
  if (isAuthorized === null) {
    return <div>Cargando...</div>
  }

  // Si estamos autorizados, mostrar el children
  // Si no, redirigir a /login usando react router dom
  return isAuthorized ? children : <Navigate to="/login" /> 
  
};

export default ProtectedRoute;