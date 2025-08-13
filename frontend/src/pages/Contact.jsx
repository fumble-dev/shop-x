import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'Contact'} text2={'Us'} />
      </div>

      <div className="my-10 flex flex-col md:flex-row justify-center gap-8 mb-20">
        <img src={assets.contact_img} className="w-full md:max-w-[480px]" alt="" />
        <div className="flex flex-col justify-center items-start gap-4">
          <p className="font-semibold text-xl text-gray-700">Our Store</p>
          <p className="text-gray-600">
            ShopX, 5th Floor, X Mall <br /> Banjara Hills, Hyderabad, Telangana, India
          </p>
          <p className="text-gray-600">
            Tel: +91 12345 67890 <br /> Email: queries@shopx.com
          </p>
          <p className="font-semibold text-xl text-gray-700">Careers at ShopX</p>
          <p className="text-gray-600">Learn more about our teams and job openings</p>
          <button className="border border-black px-6 py-3 text-sm hover:bg-black hover:text-white">
            Explore Jobs
          </button>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  )
}

export default Contact
