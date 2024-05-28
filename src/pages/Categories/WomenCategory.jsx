// import React from 'react'
import { useEffect, useState } from "react";
import ProductCard from "../ProductDetails/ProductCard";


// eslint-disable-next-line react/prop-types
const WomenCategory = ({category}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/products?category=${category}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data); // Assuming your API response contains a 'products' array
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [category]);

  return (
    <div className="mt-8">
      <h1 className="text-3xl text-center uppercase font-semibold mb-4">{category}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}

export default WomenCategory