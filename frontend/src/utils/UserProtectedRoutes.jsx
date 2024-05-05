import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Outlet } from 'react-router-dom'
import { setUserLogin, setUserLogout } from '../redux/authSlice'
import axios from 'axios'

const UserProtectedRoutes = () => {
  
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAuthenticated  = useSelector(state => state.auth.isUserAuthenticated)
    const refreshToken = useSelector(state => state.auth.userRefresh)
    
    const updateToken = async() => {
      console.log("update token works")
      console.log(refreshToken)
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {refresh: refreshToken});
        if (response.status === 200) {
          dispatch(setUserLogin(response.data));
        } else {
          dispatch(setUserLogout());
          console.error('Token refresh failed and user got logged out', response.data);
          navigate('/user/signin');
        }
    } catch (error) {
        console.error('Failed to refresh token:', error);
        navigate('/user/signin');
    }
    }


    useEffect(() => {
      if (isAuthenticated) {
        updateToken();
      } else {
        navigate('/user/signin');
      }
    }, [isAuthenticated]);
  
    useEffect(() => {
      let interval;
      if (isAuthenticated) {
        interval = setInterval(updateToken, 4 * 60 * 1000); 
      }
      return () => clearInterval(interval);
    }, [isAuthenticated, refreshToken, dispatch, navigate]);

  return isAuthenticated ? <Outlet /> : null;
}

export default UserProtectedRoutes
