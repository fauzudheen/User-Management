import axios from 'axios';
import React, { useState } from 'react'
import { BaseUrl } from '../../components/const/urls';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserLogin } from '../../redux/authSlice';


const UserSignup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = async(e) => {
        console.log(formData)
        e.preventDefault();
        if (formData.password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        try {
            const response = await axios.post(`${BaseUrl}signup/`, formData)
            dispatch(setUserLogin(response.data.access))
            alert(response.data.message)
            navigate('/user/home')
        } catch (error) {
            console.log(error.response.data)
            let errorMessage = 'An error occurred. Please try again later.';
            if (error.response && error.response.data) {
                errorMessage = Object.values(error.response.data).join(' ');
            }
            setError(errorMessage);
        }
    }

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-purple-100">
      <div className="border rounded-md bg-purple-50 mx-80 py-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">Sign Up</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-md font-medium leading-6 text-gray-900">First Name</label>
              <div className="mt-2">
                <input onChange={handleChange} value={formData.first_name} name='first_name' type="text" required className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <label className="block text-md font-medium leading-6 text-gray-900">Last Name</label>
              <div className="mt-2">
                <input onChange={handleChange} value={formData.last_name} name='last_name' type="text" required className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <label className="block text-md font-medium leading-6 text-gray-900">Username</label>
              <div className="mt-2">
                <input onChange={handleChange} value={formData.username} name='username' type="text" required className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-md font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input onChange={handleChange} value={formData.email} name='email' id="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-md font-medium leading-6 text-gray-900">Password</label>
              </div>
              <div className="mt-2">
                <input onChange={handleChange} value={formData.password} name='password' id="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-md font-medium leading-6 text-gray-900">Confirm Password</label>
              </div>
              <div className="mt-2">
                <input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} name='password' id="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div className='flex w-full justify-center'>
              <button type="submit" className=" rounded-md bg-purple-800 px-5 py-2 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-purple-900">Sign Up</button>
            </div>
          </form>
          {error && <p className='text-red-600 text-center'>Error: {error}</p>}
          <p className="mt-10 text-center text-md text-gray-500">
            Already a member?
            <a href="/user/signin" className="font-semibold ml-2 leading-6 text-indigo-600 hover:text-indigo-500">Signin</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserSignup
