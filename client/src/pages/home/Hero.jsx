import React from 'react'
import {useGSAP} from '@gsap/react'
import {gsap} from 'gsap'
import {Link} from 'react-router-dom'

export default function Hero() {

  gsap.registerPlugin()
  
  // Fade-up animation
  useGSAP(() =>{
    const tl = gsap.timeline();
      tl.from('#home-hero', { opacity: 0, duration: 1.5, ease : 'expoScale'})
      tl.from('#home-hero .enter', { y: 50, opacity: 0, duration: 1, stagger : 0.3}, '-=0.5')
  })

  return (
    <div id='home-hero' className='h-screen w-screen flex flex-row p-8 justify-between items-center relative'>
      <div className='h-auto w-4/10 overflow-hidden absolute top-1/3 flex flex-col items-center justify-start'>
        <h1 className='enter text-5xl montserrat font-bold text-gray-100 mb-4 whitespace-nowrap overflow-hidden'>Welcome to Rayeva</h1>
        <p className='enter text-lg text-gray-300 mb-8'>Discover the power of AI with Rayeva, your ultimate AI assistant for seamless productivity and creativity.</p>

        {/* User Login Page */}
        <Link to='/login' className='enter overflow-hidden'><button className='enter hero-btn h-auto w-auto bg-green-500 text-white px-6 py-3 rounded-lg cursor-pointer '>Get Started</button></Link> 
      </div>

      <div className='h-full w-1/2 '></div>
    </div>
  )
}
