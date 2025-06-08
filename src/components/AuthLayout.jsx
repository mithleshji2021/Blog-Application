import React,{useEffect, useState} from 'react'
import {  useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoadingPage from '../pages/LoadingPage'


export default function Protected({children, authentication = true}) {
    const authStatus = useSelector((state)=>state.auth.status)
    const [loader, setLoader] = useState(true)
    const navigate = useNavigate()

    useEffect(()=>{
        if(authentication && authStatus !== true){
            navigate('/login')
        }else if(!authStatus && authStatus === true){
            navigate('/')
        }
        // const auth = authStatus === true ? true : false
        // if(authentication && authStatus !== authentication){
        //     navigate('/login')
        // }else if(!authentication && authStatus !== authentication){
        //     navigate('/')
        // }

        setLoader(false)
    },[authStatus, navigate,authentication])

    

  return loader ? <div>{<LoadingPage/>}</div> : <>{children}</>
}

