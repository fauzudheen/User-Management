import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import AdminNav from '../../components/admin/AdminNav';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    async function fetchUsers() {
        try {
            const response = await axios.get('http://127.0.0.1:8000/account/users/');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this user?");
        if (shouldDelete) {
        try {
            await axios.delete(`http://127.0.0.1:8000/account/users/${id}`);
            console.log("Deleted successfully");
            fetchUsers();
        } catch (error) {
            console.error("Error while deleting user", error);
        }
    }
    };

    return (
        <>
            <AdminNav />
            <div className="min-h-screen w-full bg-lime-100 text-gray-900">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-8 text-center">User List</h1>
                    <Link to="create" className="block mb-4">
                        <button className="bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-600 text-white font-semibold px-4 py-2 rounded">
                            Create User
                        </button>
                    </Link>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse  bg-lime-50">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2">Profile</th>
                                    <th className="border border-gray-300 px-4 py-2">Username</th>
                                    <th className="border border-gray-300 px-4 py-2">First Name</th>
                                    <th className="border border-gray-300 px-4 py-2">Last Name</th>
                                    <th className="border border-gray-300 px-4 py-2">Email</th>
                                    <th className="border border-gray-300 px-4 py-2">Created At</th>
                                    <th className="border border-gray-300 px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, id) => (
                                    <tr key={id}>
                                        <td className="border border-gray-300 px-4 py-2 flex justify-center items-center">
                                            {user.profile ? (
                                                <img src={user.profile} alt="Profile" className="w-12 h-12 object-cover rounded-full" />
                                            ) : (
                                                <span>No Profile Image</span>
                                            )}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                                        <td className="border border-gray-300 px-4 py-2">{user.first_name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{user.last_name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {new Date(user.date_joined).toLocaleString('en-US', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit',
                                            })}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <div className="flex justify-around">
                                                <FaEdit onClick={() => navigate(`edit/${user.id}`)} className="cursor-pointer text-yellow-500" size={20} /> 
                                                <FaTrash onClick={() => handleDelete(user.id)} className="cursor-pointer text-red-600" size={20} /> 
                                            </div>
                                        </td>
                                    </tr>
                                ))}     
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserList;
