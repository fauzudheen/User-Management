import React, { useEffect, useState } from 'react'
import UserNav from '../../components/user/UserNav'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { BaseUrl } from '../../components/const/urls'
import { useSelector } from 'react-redux'

const UserProfile = () => {
    const token = useSelector(state => state.auth.userToken)
    const [user, setUser] = useState()
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUser = async() => {
            try {
                const decodedToken = jwtDecode(token)
                const response = await axios.get(`${BaseUrl}users/${decodedToken.user_id}`)
                setUser(response.data)
                console.log(response.data)
            } catch (error) {
                console.log(error.response.data)
                let errorMessage = 'An error occurred. Please try again later.';
                if (error.response && error.response.data) {
                    errorMessage = Object.values(error.response.data).join(' ');
                }
                setError(errorMessage);
                }
        }
        fetchUser();
    }, [])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    if (!user) {
        return null;
    }

  return (
        <div style={{ height: "100vh", overflow: "hidden" }}>
            <UserNav />
            <div className='bg-purple-100 h-full flex justify-center py-10'>
                <div className='bg-purple-50 p-8 sm:p-12 lg:p-16 rounded-lg shadow-xl mb-20'>
                    <img src={user.profile} alt="User Photo" className="w-32 h-32 rounded-full mx-auto mb-4 shadow-md border-4 border-white" />
                    <h1 className='text-center text-3xl font-bold mb-12'>{user.username}</h1>
                    <div className="grid grid-cols-2 gap-12">
                        <div>
                            <p className='text-center text-lg font-semibold'>First Name:</p>
                            <p className='text-center'>{user.first_name}</p>
                        </div>
                        <div>
                            <p className='text-center text-lg font-semibold'>Last Name:</p>
                            <p className='text-center'>{user.last_name}</p>
                        </div>
                        <div>
                            <p className='text-center text-lg font-semibold'>Email:</p>
                            <p className='text-center'>{user.email}</p>
                        </div>
                        <div>
                            <p className='text-center text-lg font-semibold'>Date Joined:</p>
                            <p className='text-center'>{formatDate(user.date_joined)}</p>

                        </div>
                    </div>
                        {error && <p className='text-red-600 text-center'>Error: {error}</p>}
                </div>
            </div>
        </div>
  )
}

export default UserProfile
