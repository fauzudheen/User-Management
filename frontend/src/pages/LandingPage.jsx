import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router for navigation

const LandingPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="flex flex-col items-center justify-center w-1/2">
        <Link to="/user/home" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transition duration-300 ease-in-out mb-8">
          User Home
        </Link>
        <Link to="/admin" className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transition duration-300 ease-in-out">
          Admin Home
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
