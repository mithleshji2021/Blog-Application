import React, { useState } from 'react'
import { Logo, LogoutBtn, Container } from '../index';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoMdMenu, IoMdClose } from "react-icons/io";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const [isMenuOpen, setIsMenuOpen] = useState(false)


  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      name: "Home",
      path: "/",
      active: true
    },
    {
      name: "Add Post",
      path: "/add-post",
      active: authStatus
    },

    {
      name: "All Posts",
      path: "/all-posts",
      active: authStatus
    },
    {
      name: "Signup",
      path: "/signup",
      active: !authStatus
    },
    {
      name: "Login",
      path: "/login",
      active: !authStatus
    },

  ]

  return (
    <header className='py-2 shadow bg-blue-800  '>
      <Container>
        <nav className='md:flex justify-center items-center hidden'>
          <div className='mr-4'>
            <Link to="/">
              <Logo width='70px' />
            </Link>
          </div>
          <ul className=' flex ml-auto '>
            {
              navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button onClick={() => navigate(item.path)}

                      className={`inline-block px-6 py-2 duration-200 hover:bg-[#140441] rounded-full text-white font-bold ${location.pathname === item.path ? 'text-yellow-400' : 'text-white'}`}>
                      {item.name}

                    </button>
                  </li>

                ) : null

              )
            }
            {
              authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )
            }
          </ul>
        </nav>

        <nav className='md:hidden'>
          <div className='flex justify-between items-center'>
            <Link to="/">
              <Logo width='70px' />
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='text-white'>

              {isMenuOpen ? (
                <IoMdClose className='w-6 h-6' />
              ) : (
                <IoMdMenu className='w-6 h-6' />
              )}
            </button>
          </div>
        </nav>
        
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <ul className='flex flex-col text-left  font-medium my-8 gap-2  bg-blue-800'>

            {navItems.map((item) => (
              item.active ? (
                <li key={item.name} onClick={() => setIsMenuOpen(false)}>
                  <button

                    onClick={() => navigate(item.path)} className={` text-left px-2 py-1 rounded-lg hover:bg-slate-700 w-full ${location.pathname === item.path ? 'text-yellow-400' : 'text-white'}`}>{item.name}</button>
                </li>)
                : null
            ))}
            {
              authStatus && (
                <li onClick={() => setIsMenuOpen(false)} className='text-center bg-red-700 rounded-lg '>
                  <LogoutBtn />
                </li>
              )
            }
          </ul>
        </div>
      </Container>
    </header >
  )
}

export default Header