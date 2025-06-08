import React from 'react'

function Logo({width = "100px"}) {
  return (
    <div className='flex flex-row justify-center items-center'>
      <img width={50} src="src/assets/Picsart_25-06-08_17-05-50-998.png" alt="" />
      <span className='text-white'>CodeBlog</span>
    </div>
  )
}

export default Logo