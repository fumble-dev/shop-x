import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className="mt-40 text-sm">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="ShopX Logo" />
          <p className="w-full md:w-2/3 text-gray-600">
            ShopX is your go-to destination for the latest trends, quality products, 
            and unbeatable prices — all in one place.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">Company</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">Get in touch</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91 7386312778</li>
            <li>contact@shopx.com</li>
          </ul>
        </div>
      </div>

      <hr />
      <p className="py-5 text-sm text-center">
        Copyright 2024 @shopx.com - All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
