import React, { useEffect, useState } from 'react'
import UserNav from '../../components/user/UserNav'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { BaseUrl } from '../../components/const/urls'
import { jwtDecode } from 'jwt-decode'

const UserHome = () => {
    const token = useSelector(state => state.auth.userAccess)
    const [username, setUsername] = useState()
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUser = async() => {
            try {
                const decodedToken = jwtDecode(token)
                const response = await axios.get(`${BaseUrl}users/${decodedToken.user_id}`)
                setUsername(response.data.username)
            } catch (error) {
                if (error.response && error.response.data) {
                    setError(error.response.data.detail);
                } else {
                    setError('An error occurred. Please try again later.');
                }
            }
        }
        fetchUser();
    })
  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
        <UserNav />
    <div className='bg-purple-100 h-screen flex flex-col justify-center items-center'>
      <div className='w-full flex justify-center'>
        <div className='bg-purple-50 p-24 h-64 mx-96 rounded-lg shadow-xl'>
          <h1 className='text-center text-3xl font-bold'>Hello {username}</h1>
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
    </div>
  )
}

export default UserHome
