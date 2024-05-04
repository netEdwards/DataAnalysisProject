import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from 'axios';
import sy from './compstyles.module.css';
import { useEffect, useState } from "react";

function isAuthenticated(){
  console.log('Auth?', localStorage.getItem('token'));
  console.log('Checking auth:', !!localStorage.getItem('token'));
  return !!localStorage.getItem('token');
}

function isDemoMode(){
  console.log('Demo?', localStorage.getItem('isDemo'));
  console.log('Checking demo mode:', localStorage.getItem('isDemo') === 'true');
  return localStorage.getItem('isDemo') === 'true';
}

const PrivateRoute = ({children}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isDemoMode()) { // Only set the Authorization header if not in demo mode
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
    setLoading(false);
  },  []);
  let location = useLocation();
  if (!isAuthenticated() && !isDemoMode()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (loading){
    return (
      <div className={sy.spinner}>
        <span className={sy.loader}></span>
      </div>
    )
  }

  return children;
}

export default PrivateRoute;