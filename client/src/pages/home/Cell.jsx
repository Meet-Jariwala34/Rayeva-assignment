import React from 'react'
import img1 from '../../assets/cell1.jpg'
import img2 from '../../assets/cell2.jpg'
import img3 from '../../assets/cell3.jpg'
import img4 from '../../assets/cell4.jpg'
import img5 from '../../assets/cell5.jpg'
import img6 from '../../assets/cell6.jpg'
import {useGSAP} from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {gsap} from 'gsap'
gsap.registerPlugin(ScrollTrigger)


export default function Cell() {

  useGSAP( () => {
    gsap.from('#gallery div', {
      y : 10,
      opacity : 0,
      stagger : 0.2,
      scrollTrigger : {
        trigger : '#gallery',
        start : 'top 40%',
        end : 'bottom 90%',
      }
    })
  })

  return (
    <div className='page3 h-screen w-screen flex flex-col items-center'>
      <div className='h-1/4 w-screen flex justify-center items-center'>
        <div className='montserrat text-5xl text-black font-extrabold w-auto h-auto overflow-hidden'>OUR PRODUCT</div>
      </div>

      <div id='gallery' className='h-3/4 w-screen flex flex-wrap gap-4 justify-evenly mb-4 items-center'>
        <div className='h-3/7 w-1/4' ><img src={img1} className='h-full w-full object-cover' alt="product image" /></div>
        <div className='h-3/7 w-1/4' ><img src={img2} className='h-full w-full object-cover' alt="product image" /></div>
        <div className='h-3/7 w-1/4' ><img src={img3} className='h-full w-full object-cover' alt="product image" /></div>
        <div className='h-3/7 w-1/4' ><img src={img4} className='h-full w-full object-cover' alt="product image" /></div>
        <div className='h-3/7 w-1/4' ><img src={img5} className='h-full w-full object-cover' alt="product image" /></div>
        <div className='h-3/7 w-1/4' ><img src={img6} className='h-full w-full object-cover' alt="product image" /></div>
      </div>
    </div>
  )
}
