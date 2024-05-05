import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { BaseUrl } from '../../components/const/urls';
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';
import UserNav from '../../components/user/UserNav';

const UserEditProfile = () => {
    const [id, setId] = useState()
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePictureURL, setProfilePictureURL] = useState(null);
    const navigate = useNavigate()
    const [error, setError] = useState('');
    const token = useSelector(state => state.auth.userAccess)
    
    useEffect(() => {
        const fetchUser = async() => {
            try {
                const decodedToken = jwtDecode(token)
                const response = await axios.get(`${BaseUrl}users/${decodedToken.user_id}`)
                console.log("Response", response.data)
                setId(decodedToken.user_id)
                setUser(response.data);
                setFirstName(response.data.first_name);
                setLastName(response.data.last_name);
                setUsername(response.data.username);
                setEmail(response.data.email);
                setProfilePictureURL(response.data.profile);
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

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file);
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
              setProfilePictureURL(reader.result)
            }
            reader.readAsDataURL(file)
          }
    };

    const handleSubmit = async(e) => {
        e.preventDefault()
        if (username && email && firstName && lastName){
        try {
                const formData = new FormData();
                formData.append('first_name', firstName);
                formData.append('last_name', lastName);
                formData.append('username', username);
                formData.append('email', email);
                // formData.append('password', password);
                if (profilePicture) {
                    formData.append('profile', profilePicture);
                }
        
                await axios.patch(`${BaseUrl}users/${id}/`, formData)

                console.log("User updated successfully");
                navigate('/user/profile')
        } catch (error) {
            console.log(error.response.data)
            let errorMessage = 'An error occurred. Please try again later.';
            if (error.response && error.response.data) {
                errorMessage = Object.values(error.response.data).join(' ');
            }
            setError(errorMessage);
        }
    }else{
        alert("All fields are required")
    }
    }

  return (
    <section style={{ height: "100vh", overflow: "hidden" }}>
    <UserNav />
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0 bg-yellow-100">
        <div className="w-full bg-yellow-50 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-4">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 bg-yellow-50">
                <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Edit Profile
                </h1>
                {user ? (
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                        <div className="flex flex-wrap">
                            <div className="w-full md:w-1/2 pr-2">
                                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                                <input 
                                    type="text"
                                    id="firstName"
                                    className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 focus:ring focus:ring-opacity-50"
                                    placeholder="First Name"
                                    required
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="w-full md:w-1/2 pl-2">
                                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                                <input 
                                    type="text"
                                    id="lastName"
                                    className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 focus:ring focus:ring-opacity-50"
                                    placeholder="Last Name"
                                    required
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="w-full md:w-1/2 pr-2">
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                                <input 
                                    type="text"
                                    id="username"
                                    className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 focus:ring focus:ring-opacity-50"
                                    placeholder="Username"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="w-full md:w-1/2 pl-2">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                <input 
                                    type="email"
                                    id="email"
                                    className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 focus:ring focus:ring-opacity-50"
                                    placeholder="Email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap">
                            {/* <div className="w-full md:w-1/2 pr-2">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input 
                                    type="password"
                                    id="password"
                                    className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 focus:ring focus:ring-opacity-50"
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div> */}
                            <div className="w-full md:w-1/2 pl-2">
                                <label htmlFor="profilePicture" className="block mb-2 text-sm font-medium text-gray-900">Profile Picture</label>
                                {profilePictureURL ? (
                                    <img src={profilePictureURL} alt="Profile" className="w-12 h-12 object-cover rounded-full mr-2" />
                                ) : (
                                    <label htmlFor="profilePicture" className="cursor-pointer flex items-center justify-center bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 placeholder-gray-400 focus:ring focus:ring-opacity-50">
                                        No Profile Image
                                    </label>
                                )}
                                <input 
                                    type="file"
                                    id="profilePicture"
                                    className="hidden"
                                    onChange={handleProfilePictureChange}
                                />
                            </div>

                        </div>
                        {error && 
                        <ul className='text-red-600 text-start'>
                            <p className='font-semibold'>Error:</p>
                            {error.map((err, index) => (
                            <li key={index}>- {err}</li>
                            ))}
                        </ul>
                        }
                        <button 
                            type="submit" 
                            className="w-full text-white bg-yellow-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Save
                        </button>
                    </form>
                ) : (
                    <h1 className='text-gray-900'>Loading...</h1>
                )}
            </div>
        </div>
    </div>
</section>


  )
}

export default UserEditProfile
