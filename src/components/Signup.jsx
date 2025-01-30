import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Button, Logo } from './index'
import { Link } from 'react-router-dom'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {login} from '../../store/authSlice'


function Signup() {
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [isLoading, setIsLoading] = useState(false)

    const create = async (data) => {
       
        setError('')
        try {
            setIsLoading(true)
            const account = await authService.createAccount(data)
            

            if (account) {
                const userData = await authService.getCurrentUser()
                
                if (userData) {
                    dispatch(login({ userData }))
                    navigate('/')
                    
                }
            }else{
                setError("Something went wrong")
                setIsLoading(false)
            }

        } catch (error) {
            console.log("Error in Creating Account ::::",error)
        }
    }

    if(isLoading){
        return <div className="flex items-center justify-center min-h-screen bg-gray-400">
        <div className="w-16 h-16 border-4 border-red-500 border-dashed rounded-full animate-spin"></div>
      </div>
    }
    
    return (
        <div className='flex justify-center items-center '>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>

                <div className='flex justify-end'>
                    <span onClick={() => navigate('/')} className='flex justify-end  cursor-pointer  rounded-full text-white w-[1.5rem] pr-2 bg-gray-400'>X</span>
                </div>

                <div className='flex  justify-center  mb-2'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold leading-tight ">Sign up to create account</h2>

                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline text-red-600"
                    >
                        Sign In
                    </Link>
                </p>

                {error && <p className='text-red-600 mt-8 text-center '>{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>

                        <Input
                            label="Name"
                            placeholder="Enter your name"
                            {...register("name", { required: true })}
                        />

                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            name="email"
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                                }
                            })}
                        />

                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            name="password"
                            {...register('password', {
                                required: true,
                            })}
                        />

                        <Button type="submit" className='w-full'>Create Account</Button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup