import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import CreateUser from './pages/admin/CreateUser';
import Admin from './pages/admin/AdminDashboard';
import EditUser from './pages/admin/EditUser';
import UserList from './pages/admin/UserList';
import UserHome from './pages/user/UserHome';
import LandingPage from './pages/LandingPage';
import UserSignin from './pages/user/UserSignin';
import UserSignup from './pages/user/UserSignup';
import PrivateRoutes from './utils/PrivateRoutes';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/users' element={<UserList />} />
        <Route path='admin/users/create' element={<CreateUser />} />
        <Route path='admin/users/edit/:id' element={<EditUser />} />

        <Route path='/user/signin' element={<UserSignin />} />
        <Route path='/user/signup' element={<UserSignup />} />
        
        <Route element={<PrivateRoutes />}>
          <Route path='/user/home' element={<UserHome />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
