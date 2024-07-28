import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { IoIosStarHalf } from "react-icons/io";
import Loading from "./Loading";
import Product from "./Product";

export default function ProductSection({ title, tagline, limit, sorting, open }) {

    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(true);


    useEffect(()=> {
      fetch('https://fakestoreapi.com/products?limit='+limit+'&sort='+sorting)
      .then((response) => {
          return response.json();
          
      })
      .then((response) => {
        setLoading(false);
          setProducts(response);
      })
      .catch((error) => {
          
      })
    },[]);


    

    return (
      <div className="bg-white">
        <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">{ title }</h2>
            <p>{ tagline }</p>
          <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {
              loading ?
                <>
                  <Loading/><Loading/><Loading/><Loading/><Loading/><Loading/><Loading/><Loading/>
                </>
              : 
                <Product products={products}/>
                
            }
          </div>
        </div>
      </div>
    )
  }
  