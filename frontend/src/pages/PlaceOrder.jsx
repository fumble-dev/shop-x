import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData(data => ({ ...data, [name]: value }))
  }

  const initPay = async (order) => {

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (resopnse) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', resopnse, { headers: { token } })
          if (data.success) {
            navigate('/orders')
            setCartItems({});
          }
        } catch (error) {
          console.error(error)
          toast.error(error)
        }
      }
    }

    const rzp = new window.Razorpay(options);
    rzp.open()
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod": {
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });

          if (response.data.success) {
            setCartItems({})
            toast.success("Order placed successfully!");
            navigate("/orders");
          } else {
            toast.error(response.data.message)
          }
          break;
        }

        case 'razorpay': {
          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } })
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order)
          }

          break;
        }

        default:
          break;
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={"Delivery"} text2={"Information"} />
        </div>
        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" placeholder='First Name' className='border border-gray-300 rounded py01.5 px-3.5 w-full' required />
          <input onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" placeholder='Last Name' className='border border-gray-300 rounded py01.5 px-3.5 w-full' required />
        </div>
        <input onChange={onChangeHandler} name='email' value={formData.email} type="email" placeholder='Email Address' className=' border border-gray-300 rounded py01.5 px-3.5 w-full' required />
        <input onChange={onChangeHandler} name='street' value={formData.street} type="text" placeholder='Street / Locality' className='  border border-gray-300 rounded py01.5 px-3.5 w-full' required />
        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='city' value={formData.city} type="text" placeholder='City' className='border border-gray-300 rounded py01.5 px-3.5 w-full' required />
          <input onChange={onChangeHandler} name='state' value={formData.state} type="text" placeholder='State' className='border border-gray-300 rounded py01.5 px-3.5 w-full' required />
        </div>
        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="number" placeholder='Pincode' className='border border-gray-300 rounded py01.5 px-3.5 w-full' required />
          <input onChange={onChangeHandler} name='country' value={formData.country} type="text" placeholder='Country' className='border border-gray-300 rounded py01.5 px-3.5 w-full' required />
        </div>
        <input onChange={onChangeHandler} name='phone' value={formData.phone} type="number" placeholder='Phone Number' className='border border-gray-300 rounded py01.5 px-3.5 w-full' required />
      </div>

      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={"Payment"} text2={"Method"} />
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('razorpay')} className='flex  items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 rounded-full border ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={() => setMethod('cod')} className='flex  items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 rounded-full border ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-xl font-medium'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='  w-full text-center mt-8'>
            <button type='submit' className='cursor-pointer bg-black text-white px-16 text-sm py-3 '>Place Order</button>
          </div>

        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
