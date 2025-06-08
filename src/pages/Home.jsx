import React,{useEffect, useState} from 'react'
import databaseService from '../appwrite/database'
import { Container } from '../components'
import { PostCard } from '../components'
import { useSelector } from 'react-redux'
import LoadingPage from './LoadingPage'
import homeImage from '../../src/images/homeImage'

function Home() {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const userStatus = useSelector((state)=>state.auth.status)
    
    
    useEffect(()=>{
        if(userStatus){
            databaseService.getPosts().then((posts)=>{
                if(posts){
                    setPosts(posts.documents)
                }
                 
            })
        }
        setIsLoading(false)
    },[])

    if(isLoading){
        <LoadingPage/>
    }

    if(!userStatus){
        return(
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className=' flex justify-center'>
                        <img className='rounded-xl w-[50rem]' src={homeImage} alt="Login to read post" />
                    </div>
                    {/* <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                        <h1 className='text-2xl text-slate-400 font-bold hover:text-white cursor-pointer'>
                            Login to read posts
                        </h1>
                        </div>
                    </div> */}
                </Container>

            </div>
        )
    }

    return (
        <div className='w-full py-8 '>
            <Container>
                <div className='flex flex-col md:flex-row flex-wrap'>
                    {posts.map((post)=>(
                        <div key={post.$id} className='p-2 w-full md:w-1/4'>
                            <PostCard {...post}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )

  
}

export default Home