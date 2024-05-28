// RecommendedProducts.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const RecommendedProducts = () => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3005/api/product/?_limit=5`)
      .then(res => {
        setRecommendedProducts(res.data.data);
        // console.log(res.data.data);
      }).catch((error) => {
        console.error({message: error.message});
      });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {recommendedProducts.map((product) => (
        <div key={product.id} className="flex justify-center p-4">
            <ProductCard product={product} />
          
        </div>
      ))}
    </div>
  );
};

export default RecommendedProducts;
