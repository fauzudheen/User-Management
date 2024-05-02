import axios from 'axios';
import React, { useState } from 'react';
import jwt_decode from 'jwt-decode'

const UserSignin = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const handleSubmit = async(e) => {
        e.preventDefault()
        const response = await axios.post('http://127.0.0.1:8000/api/token/', {
            "username": username,
            "password": password
        })

        setUser(jwt_decode(response.data.access))
        console.log("user", user)
    }

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-blue-100">
      <div className="border rounded-md bg-blue-50 mx-80 py-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">Sign in</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-md font-medium leading-6 text-gray-900">Username</label>
              <div className="mt-2">
                <input 
                onChange={(e) => setUsername(e.target.value)}
                id="email" name="email" type="text" autoComplete="email" required 
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div className='flex w-full justify-center'>
              <button type="submit" className=" rounded-md bg-blue-800 px-5 py-2 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
            </div>
          </form>

          <p className="mt-10 text-center text-md text-gray-500">
            Not a member?
            <a href="/user/signup" className="font-semibold ml-2 leading-6 text-indigo-600 hover:text-indigo-500">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserSignin;
