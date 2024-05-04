import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Outlet } from 'react-router-dom'

const UserProtectedRoutes = () => {

    const auth = useSelector(state => state.auth.isUserAuthenticated)
    const navigate = useNavigate()

    useEffect(() => {
      if (!auth) {
          navigate('/user/signin');
      }
  }, [auth, navigate]);

  return auth ? <Outlet /> : null;
}

export default UserProtectedRoutes
