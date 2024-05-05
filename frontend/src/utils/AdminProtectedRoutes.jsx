import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { setAdminLogin, setAdminLogout } from '../redux/authSlice'

const AdminProtectedRoutes = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAuthenticated  = useSelector(state => state.auth.isAdminAuthenticated)
    const refreshToken = useSelector(state => state.auth.adminRefresh)

    const updateToken = async() => {
        console.log("update token works")
        console.log(refreshToken)
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {refresh: refreshToken});
          if (response.status === 200) {
            dispatch(setAdminLogin(response.data));
          } else {
            dispatch(setAdminLogout());
            console.error('Token refresh failed and admin got logged out', response.data);
            navigate('/admin/login');
          }
      } catch (error) {
          console.error('Failed to refresh token:', error);
          navigate('/admin/login');
      }
      }
  
  
      useEffect(() => {
        if (isAuthenticated) {
          updateToken();
        } else {
          navigate('/admin/login');
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

export default AdminProtectedRoutes
