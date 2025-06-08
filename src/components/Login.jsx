import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login as authLogin } from '../../store/authSlice'
import authService from '../appwrite/auth'
import { Input, Button, Logo } from './index'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import LoadingPage from '../pages/LoadingPage'

function Login() {
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const { register, handleSubmit } = useForm()

    const login = async (data) => {
        setError('')
        try {
            setIsLoading(true)
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(authLogin(userData))
                    navigate('/')
                    
                }

            } else {
                setError("Invalid credentials")
                setIsLoading(false)
            }
        } catch (error) {
            setError(error.message)
        }
    }

    if (isLoading) {
        return <LoadingPage/>
    }
    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-[#210766] rounded-xl px-10 pb-8 pt-4 border border-black/10`}>

                <div className='flex justify-end'>
                    <span onClick={() => navigate('/')} className='flex justify-end  cursor-pointer  rounded-full text-white w-[1.5rem] pr-2  bg-[#370cac]'>X</span>
                </div>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[8rem]'>
                        <Logo width="100%" />
                    </span>

                </div>
                <h2 className="text-center text-2xl font-bold leading-tight text-slate-400">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-slate-400">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline text-red-600"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">
                    {error}
                </p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email"
                            className="focus:bg-[#210766] bg-[#210766] text-white  border border-gray-400"
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
                            className="focus:bg-[#210766] bg-[#210766] text-white border border-gray-400"
                            placeholder="Enter your password"
                            type="password"
                            name="password"
                            {...register('password', {
                                required: true,
                            })}
                        />
                        <Button type="submit" className='w-full'>Sign in</Button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login