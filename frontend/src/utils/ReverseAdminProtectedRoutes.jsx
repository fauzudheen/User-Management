import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const ReverseAdminProtectedRoutes = () => {
    const auth = useSelector(state => state.auth.isAdminAuthenticated)
    const navigate = useNavigate()

    useEffect(() => {
        if(auth) {
            navigate('/admin')
        }
    }, [auth, navigate]);
    
  return auth ? <Outlet /> : null;
}

export default ReverseAdminProtectedRoutes
