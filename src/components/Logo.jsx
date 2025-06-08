import React from 'react'

function Logo({width = "100px"}) {
  return (
    <div className='flex flex-row justify-center items-center'>
      <img width={50} src="images/logo" alt="" />
      <span className='text-white'>CodeBlog</span>
    </div>
  )
}

export default Logo