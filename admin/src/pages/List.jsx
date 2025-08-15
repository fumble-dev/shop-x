import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'
import { currency } from '../App'

const List = ({ token }) => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true) 

  const fetchList = async () => {
    try {
      setLoading(true) // Start loading
      const response = await axios.get(backendUrl + '/api/product/list', {
        headers: { token }
      })

      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error('Could not load products.')
    } finally {
      setLoading(false) 
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  if (loading) {
    return (
      <div className="p-4 text-center">
        <p className="animate-pulse text-gray-500">Loading products...</p>
      </div>
    )
  }

  return (
   <>
    <p className='mb-2'>All Products</p>
    <div className='flex flex-col gap-2'>
      <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className='text-center'>Action</b>
      </div>

      {
        list.map((item,index)=>(
          <div key={index}>
            <img src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency} {item.price}</p>
            <p>X</p>
          </div>
        ))
      }
    </div>
   </>
  )
}

export default List
