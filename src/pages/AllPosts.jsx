import React, { useEffect,useState } from 'react'
import { PostCard } from '../components'
import { Container } from '../components'
import databaseService from '../appwrite/database'
import LoadingPage from './LoadingPage'


function AllPosts() {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
        databaseService.getPosts([]).then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
            setIsLoading(false)
        })
    },[])

    if(isLoading){
        return <LoadingPage/>
    }

  return (
    <div className='w-full py-8'>
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

export default AllPosts