import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Product = () => {
  const { productId } = useParams();
  const { products } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');

  const fetchProductData = () => {
    products.forEach((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        console.log(item);
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [products, productId]);

  return productData ? (
    <div className="border-t-2 pt-10">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        
        {/* Left side - Images */}
        <div className="flex-1 flex flex-col sm:flex-row gap-3 sm:gap-0">
          
          {/* Thumbnails */}
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

          {/* Main image */}
          <div className="flex-1 flex items-center justify-center">
            <img
              src={image}
              alt={productData.name}
              className="w-full max-h-[500px] object-contain"
            />
          </div>
        </div>

        {/* Right side - Product info */}
        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-3">{productData.name}</h1>
          <p className="text-lg font-bold mb-4">${productData.price}</p>
          <p className="text-gray-600">{productData.description}</p>
        </div>
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
