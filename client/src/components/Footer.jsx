import React from 'react'

export default function Footer() {
  return (
    <footer className='w-screen '>
      <div className='h-8/10 w-screen flex justify-evenly items-center flex-col gap-5 '>
        <div className='montserrat text-5xl font-extrabold w-auto h-auto overflow-hidden'>CONTACT US</div>
        <div>
          <div className='text-2xl font-thin w-auto h-auto overflow-hidden'>Email:officialmeetjariwala@gmail.com</div>
          <div className='text-2xl font-thin w-auto h-auto overflow-hidden'>Phone: +91 9428867728</div>
          <div className='text-2xl font-thin w-auto h-auto overflow-hidden'>Address: 123, Main Street, City, Country</div>
        </div>
      </div>
    </footer>
  )
}
