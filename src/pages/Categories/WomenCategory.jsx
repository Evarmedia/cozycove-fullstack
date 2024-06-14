// import React from 'react'
import { useEffect, useState } from "react";
import ProductCard from "../ProductDetails/ProductCard";
import axios from "axios";


// eslint-disable-next-line react/prop-types
const WomenCategory = ({category}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3005/api/product?category=${category}`)
      .then((res) => {
        setProducts(res.data.data); // 
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [category]);

  return (
    <div className="my-8 mx-4">
      <h1 className="text-3xl text-center uppercase font-semibold mb-4">{category}</h1>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
}

export default WomenCategory