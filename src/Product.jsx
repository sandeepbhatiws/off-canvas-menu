import React from 'react'
import { Link } from "react-router-dom";
import { IoIosStarHalf } from "react-icons/io";

export default function Product({products}) {
  return (
    products.map((product) => (
        <div key={product.id} className="relative group">
          <div className="w-full overflow-hidden bg-gray-200 rounded-md aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img
              src={product.image}
              alt={product.title}
              className="object-cover object-center w-full h-full lg:h-full lg:w-full"
            />
          </div>
          <div className="flex justify-between mt-4">
            <div>
              <h3 className="text-sm text-gray-700">
                <Link to={`/products/product-details/${product.id}`}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.title}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{product.category}</p>
              <p className="text-sm font-medium text-gray-900"><IoIosStarHalf /> {product.rating.rate}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">{product.price}</p>
            
          </div>
        </div>
      ))
  )
}
