import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUserLogout } from '../../redux/authSlice';

const UserNav = () => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(setUserLogout());
    }
  return (
    <nav className="bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div>
            <Link to="/user/home" className="flex items-center">
              <span className="text-white text-lg font-semibold">User Home</span>
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link to="/user/home" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/user/profile" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Profile
            </Link>
            <button onClick={handleLogout} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default UserNav;
