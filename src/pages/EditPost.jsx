import React, { useEffect, useState } from 'react'
import databaseService from '../appwrite/database'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, PostForm } from '../components'



function EditPost() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        databaseService.getPost(slug).then((post)=>{
            if(post){
                setPost(post)
            }else{
                navigate("/")
            }
        }
            
        )
    },[slug, useNavigate])

  
    return post ? 
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div> 
    : null
  
}

export default EditPost