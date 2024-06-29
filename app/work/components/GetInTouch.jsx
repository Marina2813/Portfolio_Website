import AnimatedButton from '@/app/common/button'
import React from 'react'

const GetInTouch = () => {
  return (
    <div className='h-screen w-full flex flex-col justify-center items-center'>
        <h1 className='text-6xl font-bold'>Let’s build something better</h1>
        <p className='w-1/2 text-center text-xl py-8'>All that said, if you are looking for help building something that promotes sustainability, diversity, or generally aims to make a positive impact, then let’s talk.</p>      
        <AnimatedButton />
    </div>
  )
}

export default GetInTouch
