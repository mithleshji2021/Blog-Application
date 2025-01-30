import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from '../store/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .catch((error)=> console.log("error in current user", error))
    .finally(()=>{
      setLoading(false)
    })
  },[])

  return !loading ? (
  <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
   <div  className='w-full block'>
    <Header/>
    <main>
      <Outlet/>
      
    </main>
    <Footer/>
   </div>

  </div>
  ) : <div className="flex items-center justify-center min-h-screen bg-gray-400">
  <div className="w-16 h-16 border-4 border-red-500 border-dashed rounded-full animate-spin"></div>
</div>
}

export default App
