import React from 'react'
import {useGSAP} from '@gsap/react'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function Fact() {


  useGSAP( () =>{
    gsap.from('.slide1', {
      x : 200,
      opacity : 0,
      scrollTrigger : {
        trigger : '.page2',
        start : 'top 50%',
        end : 'bottom 100%',
        scrub : 2,
      }
    })

    gsap.from('.slide2', {
      x : -200,
      opacity : 0,
      scrollTrigger : {
        trigger : '.page2',
        start : 'top 50%',
        end : 'bottom 100%',
        scrub : 2,
      }
    })
  })
  

  return (
    <div className=' h-screen w-screen p-12 bg-gray-300'>
      <div className='page2 h-full w-full flex flex-row items-center justify-center'>

        <div className='slide1 h-full w-1/3 gap-8 flex flex-col justify-center items-center text-black'>
          <div className='montserrat font-bold text-5xl text-center overflow-hidden'>EMPLOYEE <br/> PORTAL</div>
          <div className='hover:scale-110'><button type="button" class="h-10 w-auto overflow-hidden px-8 cursor-pointer font-bold bg-white text-black rounded-3xl ">Login</button></div>
        </div>

        <div id='middle' className='h-full w-1/3 text-white flex justify-center items-center text-5xl font-bold z-10'>
          <div className='h-1/3 w-6/10 montserrat text-center'>
            <h1 className='overflow-hidden'>JOIN US</h1>
            <p className='text-2xl font-thin'>Track and Manage Environment Friendly products</p>
          </div>
        </div>

        <div className='slide2 h-full w-1/3 gap-8 flex flex-col justify-center items-center text-black'>
          <div className='montserrat font-bold text-5xl text-center overflow-hidden'>CUSTOMER <br /> SUPPORT </div>
          <div className='hover:scale-110'><button type="button" class="h-10 w-auto overflow-hidden px-8 cursor-pointer font-bold bg-white text-black rounded-3xl">Login</button></div>
        </div>
      </div>
    </div>
  )
}
