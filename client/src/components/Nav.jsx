import React from 'react'
import logo from '../assets/logo.ico'
import {Link} from 'react-router-dom'

export default function Nav() {
  return (
    <nav className='h-10 w-8/10 z-10 flex flex-row justify-between items-center mx-auto px-5 text-white '>
      <Link to='/' className='flex h-full gap-2'><div className='flex h-full gap-2 p-1 '>
          <div><img src={logo} alt="Logo" className='h-full cursor-pointer'/></div>
          <div><h1 className='text-2xl font-bold cursor-pointer'>Rayeva</h1></div>
        </div>
      </Link>
      <div>
        <ul className='flex flex-row gap-4'>
          <Link to='/demo' ><li className='cursor-pointer'>Home</li></Link>
          <Link to='/demo' ><li className='cursor-pointer'>About</li></Link>
          <Link to='/demo' ><li className='cursor-pointer'>Contact</li></Link>
        </ul>
      </div>
    </nav>
  )
}
