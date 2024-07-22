import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem('token') !== null
  );
  const navigate = useNavigate();

  const login = () => {
   
    localStorage.setItem('token', 'your_token_here');
    setAuthenticated(true);
    // navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
    navigate('/login');
    // window.location.href = '/login'; 
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
