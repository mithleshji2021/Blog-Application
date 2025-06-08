import React from 'react'
import { Link } from 'react-router-dom'
import databaseService from '../appwrite/database'

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-[#1c065a] rounded-xl px-4 py-4 text-center'>
                <div className='w-full justify-center pb-2'>
                    <img src={databaseService.getFileView(featuredImage)} className='rounded-xl' alt={title} />
                </div>
                <h2 className='text-xl font-bold text-slate-400'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard