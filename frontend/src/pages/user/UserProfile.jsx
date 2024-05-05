import React, { useEffect, useState } from 'react'
import UserNav from '../../components/user/UserNav'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { BaseUrl } from '../../components/const/urls'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const UserProfile = () => {
    const token = useSelector(state => state.auth.userAccess)
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
    <div className='bg-purple-100 h-full flex justify-center py-4'>
        <div className='bg-purple-50 p-4 sm:p-8 lg:p-12 rounded-lg shadow-xl mb-20 relative'>
            <img src={user.profile} alt="User Photo" className="w-32 h-32 rounded-full mx-auto mb-4 shadow-md border-4 border-white" />
            <h1 className='text-center text-3xl font-bold mb-12'>{user.username}</h1>
            <div className="grid grid-cols-2 gap-8">
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
            <Link to='/user/profile/edit'>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <button className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            <FontAwesomeIcon icon={faEdit}/>
                    Edit Profile
                </button>
            </div>
            </Link>
        </div>
    </div>
</div>

  )
}

export default UserProfile
