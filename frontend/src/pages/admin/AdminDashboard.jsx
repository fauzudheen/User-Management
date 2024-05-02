import React, { useEffect, useState } from 'react'
import UserList from './UserList'
import AdminNav from '../../components/admin/AdminNav'
import axios from 'axios'
import { BaseUrl } from '../../components/const/urls'

const Admin = () => {
  const [totalUsers, setTotalUsers] = useState()
  useEffect(() => {
    const getTotalUsers = async() => {
      try {
        const response = await axios.get(BaseUrl)
        setTotalUsers(response.data.length)
      } catch (error) {
        console.error("Error fetching totalUsers count", error)
      }
    }
    getTotalUsers();
  })

  return (
    <div className="h-screen w-screen bg-purple-100">
      <AdminNav /> 
      <div className="px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-2">Total Users</h2>
            <p className="text-gray-700">{totalUsers}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin
