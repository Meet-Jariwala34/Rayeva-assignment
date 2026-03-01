import React , {useEffect} from 'react'
import gsap from 'gsap'

export default function Loader() {

    useEffect(()=>{
        gsap.to('.loader-box',{
        rotate : 360,
        repeat : -1,
        duration : 1.25
    })

    },[])

  return (
    <div className='absolute top-0  left-0 h-screen w-screen bg-white flex flex-col justify-center items-center gap-5 z-10'>
        <div className='loader-box h-[10vmax] overflow-hidden w-[10vmax] bg-green-600 rounded-full flex justify-center items-center relative'>
            <div className='h-8/10 w-8/10 z-5 bg-white rounded-full'>
                
            </div>
            <div className='h-40/100 w-10/10 absolute -top-1/100 left-0/100 z-2 overflow-hidden bg-green-200'></div>
        </div>
        <p className=' montserrat font-bold text-4xl overflow-hidden text-green-600 '>Loading</p>
    </div>
  )
}
