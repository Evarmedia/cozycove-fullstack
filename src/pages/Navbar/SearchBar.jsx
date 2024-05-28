// import React from 'react'

import { useState } from "react";
import { IoMdSearch } from "react-icons/io";

const SearchBar = () => {
  const [input, SetInput] = useState("");

  const fetchData = (value) => {
    fetch("http://localhost:4000/products")
      .then((response) => response.json())
      .then((json)=> {
        const results = json.filter((product) => {
          return value && product && product.title && (product.title.toLowerCase().includes(value) || product.title.toUpperCase().includes(value));
        })
        console.log(results)
      });
  };

  const handleSearch = (value) => {
    SetInput(value);
    fetchData(value);
  };

  return (
    <div className="relative group hidden sm:block w-full">
      <input
        type="text"
        placeholder="Search"
        className="search-bar"
        value={input}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <IoMdSearch className="text-xl text-gray-600 group-hover:text-primary dark:text-gray-400 absolute top-1/2 -translate-y-1/2 right-3 duration-200" />
    </div>
  );
};

export default SearchBar;
