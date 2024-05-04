import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const ReverseUserProtectedRoutes = () => {
  const auth = useSelector(state => state.auth.isUserAuthenticated)
    const navigate = useNavigate()

    useEffect(() => {
      if (auth) {
          navigate('/user/home');
      }
  }, [auth, navigate]);

  return auth ? <Outlet /> : null;
}

export default ReverseUserProtectedRoutes
