import React, { useState } from 'react'

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');

  const onSubmitHandler = async(e) =>{
    e.preventDefault();
  }
  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-md mx-auto mt-16 gap-6 text-gray-800">
      <div className="flex items-center gap-3 mb-4">
        <p className="text-3xl ">{currentState}</p>
        <hr className="border-0 w-10 h-[2px] bg-gray-800" />
      </div>

      {currentState === 'Sign Up' ? <input type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required /> : ""}
      <input type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      <input type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your Password?</p>
        {
          currentState === 'Login' ?
            <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p>
            : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login
