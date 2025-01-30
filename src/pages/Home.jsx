import React,{useEffect, useState} from 'react'
import databaseService from '../appwrite/database'
import { Container } from '../components'
import { PostCard } from '../components'
import { useSelector } from 'react-redux'

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
        return <div className="flex items-center justify-center min-h-screen bg-gray-400">
        <div className="w-16 h-16 border-4 border-red-500 border-dashed rounded-full animate-spin"></div>
      </div>
    }

    if(!userStatus){
        return(
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                        <h1 className='text-2xl font-bold hover:text-gray-500'>
                            Login to read posts
                        </h1>
                        </div>
                    </div>
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