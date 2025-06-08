import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from '../store/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
import { Admin } from './components'
import LoadingPage from './pages/LoadingPage'



function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {

        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .catch((error) => console.log("error in current user", error))
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-[#140441]'>
      <div className='w-full block'>
        <Header />
        <Admin />
        <main>
          <Outlet />

        </main>
        <Footer />
      </div>

    </div>
  ) : <LoadingPage/>
}

export default App
