import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify'
import axios from 'axios'

const Login = () => {

  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [currentState, setCurrentState] = useState('Login');

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token);
          toast.success(response.data.message)
          navigate('/')
        } else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token);
          toast.success(response.data.message)
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token,navigate])

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-md mx-auto mt-16 gap-6 text-gray-800">
      <div className="flex items-center gap-3 mb-4">
        <p className="text-3xl ">{currentState}</p>
        <hr className="border-0 w-10 h-[2px] bg-gray-800" />
      </div>

      {currentState === 'Sign Up' ? <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required /> : ""}
      <input onChange={(e) => setEmail(e.target.value)} type="email" value={email} className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your Password?</p>
        {
          currentState === 'Login' ?
            <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p>
            : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
        }
      </div>
      <button disabled={loading} className='bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer'>
        {loading ? (currentState === 'Login' ? 'Signing In...' : 'Signing Up...') : (currentState === 'Login' ? 'Sign In' : 'Sign Up')}
      </button>
    </form>
  )
}

export default Login
