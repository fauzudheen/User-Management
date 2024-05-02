import React from 'react';
import { Link } from 'react-router-dom';

const UserNav = () => {
  return (
    <nav className="bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div>
            <Link to="/admin" className="flex items-center">
              <span className="text-white text-lg font-semibold">User Home</span>
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link to="/admin" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/admin/users" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Profile
            </Link>
            <Link to="/logout" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Logout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default UserNav;
