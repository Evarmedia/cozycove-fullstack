import React, { useContext } from 'react';
import { SearchContext } from '../../contexts/SearchContext';
import { IoMdSearch } from "react-icons/io";
// import { useNavigate } from 'react-router-dom';


const SearchBar = () => {
  const { setSearchTerm } = useContext(SearchContext);


    // function that handles the search
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
      // navigate("/search");
  };

  return (
    <div className='relative group hidden sm:block w-full'>
    <input
      type='text'
      placeholder='Search'
      className='search-bar'
      onChange={handleSearch}
    />
    <IoMdSearch className='text-xl text-gray-600 group-hover:text-primary dark:text-gray-400 absolute top-1/2 -translate-y-1/2 right-3 duration-200' />
  </div>
  );
};

export default SearchBar;
