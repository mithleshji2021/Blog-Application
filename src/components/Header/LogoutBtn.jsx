import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../../store/authSlice'
import { useNavigate } from 'react-router-dom';


function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = () => {

    authService.logout()
      .then(() => {
        dispatch(logout());
        navigate('/');

      })
  }

  
  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-[#140441] rounded-full text-white font-bold' onClick={handleLogout}>Logout</button>
  )
}

export default LogoutBtn