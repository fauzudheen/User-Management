import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../../components/const/urls';
import AdminNav from '../../components/admin/AdminNav';

const CreateUser = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [profilePictureURL, setProfilePictureURL] = useState('');
    const [error, setError] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username && email && firstName && lastName && password){
            try {
                const formData = new FormData();
                formData.append("first_name", firstName)
                formData.append("last_name", lastName)
                formData.append("username", username)
                formData.append("email", email)
                formData.append("password", password)
                if (profilePicture) {
                    formData.append('profile', profilePicture);
                }
                await axios.post(`${BaseUrl}signup/`, formData)
                navigate('/admin/users/')
            }
            catch (error) {
                console.log(error.response.data)
                let errors = [];
                if (error.response && error.response.data) {
                    errors = [...errors, ...Object.values(error.response.data)];
                }
                setError(errors);
            }
            }else{
                alert("All fields are required")
            }
        }

    return (
        <section className="bg-blue-100">
            <AdminNav />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-blue-50 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Create User
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div className="flex flex-wrap">
                                <div className="w-full md:w-1/2 pr-2">
                                    <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                                    <input 
                                        type="text"
                                        id="firstName"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="First Name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="w-full md:w-1/2 pl-2">
                                    <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                                    <input 
                                        type="text"
                                        id="lastName"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="Last Name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            {/* Similar divs for username, email, and password */}
                            <div className="flex flex-wrap">
                                <div className="w-full md:w-1/2 pr-2">
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                                    <input 
                                        type="text"
                                        id="username"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="w-full md:w-1/2 pl-2">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                    <input 
                                        type="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="name@company.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap">
                                <div className="w-full md:w-1/2 pr-2">
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <input 
                                        type="password"
                                        id="password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="w-full md:w-1/2 pl-2">
                                    <label htmlFor="profilePicture" className="block mb-2 text-sm font-medium text-gray-900">Profile Picture</label>
                                    <input 
                                        type="file"
                                        id="profilePicture"
                                        className="hidden"
                                        onChange={handleProfilePictureChange}
                                    />
                                    <label htmlFor="profilePicture" className="cursor-pointer flex items-center justify-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                                        {profilePictureURL ? (
                                            <img src={profilePictureURL} alt="Profile" className="w-12 h-12 object-cover rounded-full mr-2" />
                                        ) : (
                                            <span>No Profile Image</span>
                                        )}
                                    </label>
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
                                className="w-full text-white bg-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Create an account
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreateUser;
