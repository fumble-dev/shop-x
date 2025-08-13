import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div >
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'About'} text2={'Us'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} className='w-full max-w-[450px]' alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            At our core, we believe fashion is more than just clothing — it’s self-expression. Our platform brings together the latest trends, timeless classics, and unique designs so you can create a style that’s truly your own.
          </p>
          <p>
            From everyday essentials to statement pieces, we handpick collections that blend quality, comfort, and style. Whether you’re refreshing your wardrobe or hunting for the perfect outfit, we make shopping effortless and inspiring.
          </p>
          <b className='text-gray-800'>
            Our Mission
          </b>
          <p>
            Our mission is to make fashion accessible and exciting for everyone. We strive to empower confidence through style, offering an inclusive range of products that cater to diverse tastes, sizes, and lifestyles — all while ensuring a seamless online shopping experience.
          </p>
        </div>
      </div>

      <div className='text-xl py-4 '>
        <Title text1={'Why'} text2={'Choose Us'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance</b>
          <p className='text-gray-600'>
            Every item in our store is carefully curated and inspected to meet the highest standards of craftsmanship. From premium fabrics to precise stitching, we ensure you receive products that are made to last and look exceptional.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience</b>
          <p className='text-gray-600'>
            Enjoy a smooth, stress-free shopping experience from the comfort of your home. With intuitive navigation, secure payment options, and quick delivery, finding your next favorite outfit has never been easier.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>
            Our friendly support team is here to assist you every step of the way. Whether you have questions about sizing, need styling advice, or require help with your order, we’re just a message away.
          </p>
        </div>
      </div>

      <NewsLetterBox/>

    </div>
  )
}

export default About
