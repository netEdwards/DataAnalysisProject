import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from 'axios';
import sy from './compstyles.module.css';
import { useEffect, useState } from "react";


function isDemoMode(){
  return localStorage.getItem('isDemo') === 'true';
}

const PrivateRoute = ({children}) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  
  const loadingDiv = () => { 
    return(
      <div className={sy.spinner}>
        <span className={sy.loader}></span>
      </div>);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token || isDemoMode()) {
      setIsAuth(true);
    }
    if(token){axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;}
    setLoading(false);
  }, []);

  if (loading) {
    return loadingDiv();
  }

  if (!isAuth) {
    return <Navigate to="/login"/>
  }

  return children;
}

export default PrivateRoute;