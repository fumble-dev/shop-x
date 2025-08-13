import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = () => {
    products.forEach((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [products, productId]);

  return productData ? (
    <div className="border-t-2 pt-10">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Left Image Section */}
        <div className="flex-1 flex flex-col sm:flex-row gap-3 sm:gap-0">
          <div
            className="
              flex sm:flex-col
              overflow-x-auto sm:overflow-y-auto
              sm:w-[18.7%] w-full
              sm:max-h-[500px]
              gap-2
              p-1
            "
          >
            {productData.image.map((item, index) => (
              <img
                src={item}
                key={index}
                onClick={() => setImage(item)}
                className={`w-[24%] sm:w-full cursor-pointer border rounded ${
                  image === item ? 'border-black' : 'border-transparent'
                }`}
                alt=""
              />
            ))}
          </div>

          <div className="flex-1 flex items-center justify-center">
            <img
              src={image}
              alt={productData.name}
              className="w-full max-h-[500px] object-contain"
            />
          </div>
        </div>

        {/* Right Details Section */}
        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-3">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_dull_icon} className="w-3.5" alt="" />
            <p className="pl-2">(122) </p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 w-4/5">{productData.description}</p>

          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 cursor-pointer bg-gray-100 ${
                    size === item ? 'border-orange-500' : ''
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button onClick={()=>addToCart(productData._id, size)} className="cursor-pointer bg-black text-white px-8 py-3 text-sm active:bg-gray-700 ">
            Add To Cart
          </button>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description / Reviews */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border text-sm px-6 py-6 text-gray-500">
          <p>
            Crafted with attention to detail, this {productData.name} offers
            premium quality and timeless style. Designed for comfort and
            durability, it's perfect for daily wear and special occasions alike.
          </p>
          <p>
            Whether you're upgrading your wardrobe or buying as a gift, this
            product delivers on both style and practicality. Pair it with your
            favorite outfits for a versatile, elegant look that lasts.
          </p>
        </div>
      </div>

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
