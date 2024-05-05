import axios from 'axios';
import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux'
import { setAdminLogin, setUserLogin } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../../components/const/urls';

const AdminLogin = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${BaseUrl}admin-login/`, {
                "username": username,
                "password": password
            })
            dispatch(setAdminLogin(response.data))
            navigate('/admin')
        } catch (error) {
            console.log(error.response.data)
            let errors = [];
                if (error.response && error.response.data) {
                    errors = [...errors, ...Object.values(error.response.data)];
                }
                setError(errors);
        }    
    }

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-lime-200">
      <div className="border rounded-md bg-lime-100 mx-80 py-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">Admin Login</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-md font-medium leading-6 text-gray-900">Username</label>
              <div className="mt-2">
                <input 
                onChange={(e) => setUsername(e.target.value)}
                type="text" required 
                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-md font-medium leading-6 text-gray-900">Password</label>
              </div>
              <div className="mt-2">
                <input 
                onChange={(e) => setPassword(e.target.value)}
                id="password" name="password" type="password" autoComplete="current-password" required 
                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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

            <div className='flex w-full justify-center'>
              <button type="submit" className=" rounded-md bg-lime-800 px-5 py-2 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-lime-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
