import React, { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
    let auth = {'token':false}
    const navigate = useNavigate()

    useEffect(() => {
      if (!auth.token) {
          navigate('/user/signin');
      }
  }, [auth.token, navigate]);

  return auth.token ? <Outlet /> : null;
}

export default PrivateRoutes
