import React from 'react'
import gsap from 'gsap'
import { useEffect, useRef } from "react";


export default function Replying() {

    const container = useRef();

    useEffect( () =>{
      gsap.to(".dot", {
      scale: 1.5,
      opacity: 1,
      duration: 0.6,
      repeat: -1,
      yoyo : 2,
      stagger: 0.2,
      
    });
    })

  return (
    <div ref={container} className="flex h-50 p-7 w-full flex-col items-center gap-4 relative top-35">
        <div className='flex h-full p-5 overflow-hidden gap-3'>
            <div className="dot w-4 h-4 bg-green-400 rounded-full opacity-30 shadow-[0_0_15px_rgba(74,222,128,0.5)]"></div>
            <div className="dot w-4 h-4 bg-green-400 rounded-full opacity-30 shadow-[0_0_15px_rgba(74,222,128,0.5)]"></div>
            <div className="dot w-4 h-4 bg-green-400 rounded-full opacity-30 shadow-[0_0_15px_rgba(74,222,128,0.5)]"></div>
        </div>
        <p className="text-green-400 text-3xl overflow-hidden h-auto p-3 flex items-center font-mono  animate-pulse">
        GEMINI IS ANALYZING SUSTAINABILITY DATA...
      </p>
    </div>
  )
}
