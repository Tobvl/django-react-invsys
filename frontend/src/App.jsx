import react from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from "./pages/Login";
import Register from './pages/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

function Logout() {
  // Limpia el token de acceso y de refresh
  localStorage.clear();
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear();
  // Primero limpiamos el localStorage para no enviar tokens
  // a la ruta de registro por posibles errores
  return <Register />
}

// Comienza buscando por el primer route
// Si no encuentra el route, busca el siguiente, hasta el 404
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
            
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<RegisterAndLogout/>}/>
          <Route path="/*" element={<NotFound/>}/>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
