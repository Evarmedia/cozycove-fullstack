// import React from 'react'
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { SearchContext } from '../../contexts/SearchContext';



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
    <div>
      <div className="flex gap-10 justify-start flex-wrap">
        <div className="mx-auto mt-8">
          <h1 className="text-3xl font-semibold mb-4">See Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {
              filteredProducts.length > 0 ? (<>
              {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
              </>) : (<>
              <h1>
                PRODUCT NOT FOUND
              </h1>
              </>)
            }
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
