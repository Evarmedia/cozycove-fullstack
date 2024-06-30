// RecommendedProducts.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const RecommendedProducts = () => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const token = localStorage.getItem('token');

  const deployedUrl = import.meta.env.VITE_DEPLOYED_URL; // to be used after deployment of backend/revert to localhost if during development


  useEffect(() => {
    axios.get(`${deployedUrl}/api/product/?_limit=5`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        setRecommendedProducts(res.data.data);
        // console.log(res.data.data);
      }).catch((error) => {
        console.error({message: error.message});
      });
  }, [token]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {recommendedProducts.map((product, index) => (
        <div key={product._id} className="flex justify-center p-4">
            <ProductCard product={product} />
          
        </div>
      ))}
    </div>
  );
};

export default RecommendedProducts;
