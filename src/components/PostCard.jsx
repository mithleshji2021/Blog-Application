import React from 'react'
import { Link } from 'react-router-dom'
import databaseService from '../appwrite/database'

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl px-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={databaseService.getFilePreview(featuredImage)} className='rounded-xl' alt={title} />
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard