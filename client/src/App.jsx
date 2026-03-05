import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Demo from './pages/error/demo'
import Login from './pages/login/login'
import LoginAdmin from './pages/login/LoginAdmin'
import SignUp from './pages/login/SignUp'
import NotFound from './pages/error/NotFound'
import Admin from './pages/admin/Admin'
import Customer from './pages/customer/Customer'
import { ToastContainer } from 'react-toastify';

// Importing the Backend Url
export const backendUrl = import.meta.env.VITE_BACKEND_URL

export default function App() {
  return (
    <div>
      <Nav/>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/demo' element={<Demo/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/admin-login' element={<LoginAdmin/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/admin/dashboard' element={<Admin/>}/>
        <Route path='/user/chats' element={<Customer/>}/>
        <Route path='/*' element={<NotFound/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}
