import React from 'react'

const Navbar = ({setToken}) => {
  return (
    <div  className='flex items-center py-2 px-[4%] justify-between'>
      <img  className='w-[max(10%,80px)]'  alt="" />
      <button onClick={()=>setToken('')} className='cursor-pointer bg-gray-600 text-white px-5 py-2 sm:px-7 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar
