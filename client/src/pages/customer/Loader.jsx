import React, {useRef, useEffect} from 'react';
import gsap from 'gsap';

export default function Loader() {

  
  const container = useRef();

  useEffect(()=>{
    const ctx = gsap.context(() => {
      gsap.to('.dot',{
    scale: 1.5,
    opacity: 1,
    duration: 0.6,
    repeat: -1,
    yoyo : 2,
    stagger: 0.2,
  })
    }, container);

    return () => ctx.revert(); // Cleanup
  },[])

  return (
    <div ref={container} className="p-2 flex-col gap-4 relative top-35 h-1/8 bg-white/20 rounded-lg w-2/10 flex items-center self-start overflow-hidden">
        <div id='loader-parent' className='flex h-full p-5 overflow-hidden items-center justify-evenly gap-5 shadow-none'>
            <div className="dot w-4 h-4 bg-green-400 rounded-full opacity-0 shadow-[0_0_15px_rgba(74,222,128,0.5)]"></div>
            <div className="dot w-4 h-4 bg-green-400 rounded-full opacity-0 shadow-[0_0_15px_rgba(74,222,128,0.5)]"></div>
            <div className="dot w-4 h-4 bg-green-400 rounded-full opacity-0 shadow-[0_0_15px_rgba(74,222,128,0.5)]"></div>
        </div>
    </div>
  )
}
