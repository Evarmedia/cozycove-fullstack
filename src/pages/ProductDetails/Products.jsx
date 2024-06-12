// import React from 'react'
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { SearchContext } from '../../contexts/SearchContext';
import { IoMdSearch } from "react-icons/io";



const Products = () => {
  const [products, setProducts] = useState([]);

  const { searchTerm } = useContext(SearchContext);

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:3005/api/product', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      setProducts(res.data.data);

      // console.log(res.data.data);

    }).catch(error => {
      console.error({message: error.message});
    });
  }, [token])


  const filteredProducts = products.filter(product =>
    product.title && searchTerm ? product.title.toLowerCase().includes(searchTerm.toLowerCase()) : true
  );
  

  return (
    <div className="">
      <div className="flex gap-10 justify-start flex-wrap">
        <div className="mx-auto mt-8">
          <h1 className="text-3xl text-center font-semibold mb-4">See All Products</h1>
            {
              filteredProducts.length > 0 ? (
              <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">

              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
              </div>
              </>
            ) : (<>
              <div className="w-full flex justify-center items-center flex-col">
                
                <IoMdSearch className="text-8xl animate-bounce text-black"/>
              <h1 className="text-2xl font-semibold font-mono">
                {`No Results for "${searchTerm}"`}
              </h1>

              </div>
              </>)
            }
            
          
        </div>
      </div>
    </div>
  );
};

export default Products;
