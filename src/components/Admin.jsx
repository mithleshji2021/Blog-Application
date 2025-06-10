import React from 'react'
import { useSelector } from 'react-redux'

function Admin() {

  const userStatus = useSelector((state) => state.auth.status)
  if (userStatus) {
    return (
      <div className='text-blue-600'>Only admin can do : create post, update post & delete post</div>
    )
  }
}

export default Admin
