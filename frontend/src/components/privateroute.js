import React from "react";
import {  Navigate, useLocation } from "react-router-dom";

function isAuthenticated(){
    console.log('Checking auth:', !!localStorage.getItem('userToken'));
    return !!localStorage.getItem('userToken');
}

const PrivateRoute = ({ children }) => {
    console.log('Children::::', children)
    let location = useLocation();
    if (!isAuthenticated()) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
  }



export default PrivateRoute;