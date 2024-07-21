import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineAddBox } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import ProductsTable from "./ProductsTable";
import SearchBar from "./SearchBar";
import Spinner from "./elements/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [priceOrder, setPriceOrder] = useState("");
  const [alphabeticalOrder, setAlphabeticalOrder] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3005/api/product")
      .then((res) => {
        setProducts(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    setSelectedProductId(id);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(
        `http://localhost:3005/api/product/deleteproduct/${selectedProductId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setShowDeletePopup(false);
        toast.warning(res.data.message);
        axios
          .get("http://localhost:3005/api/product")
          .then((res) => {
            setProducts(res.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
    setSelectedProductId(null);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const handlePriceOrderChange = (e) => {
    setPriceOrder(e.target.value);
  };

  const handleAlphabeticalOrderChange = (e) => {
    setAlphabeticalOrder(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const filteredProducts = products
    .filter(
      (product) =>
        product.title && product.title.toLowerCase().includes(searchValue)
    )
    .filter((product) => category === "" || product.category === category)
    .sort((a, b) => {
      if (priceOrder === "asc") {
        return a.price - b.price;
      } else if (priceOrder === "desc") {
        return b.price - a.price;
      } else {
        return 0;
      }
    })
    .sort((a, b) => {
      if (alphabeticalOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else if (alphabeticalOrder === "desc") {
        return b.title.localeCompare(a.title);
      } else {
        return 0;
      }
    });

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center py-4 gap-2'>
        <h1 className='text-xs sm:text-3xl text-center font-bold'>PRODUCTS</h1>

        <SearchBar searchValue={searchValue} handleSearch={handleSearch} />

        <div className='flex justify-between gap-4'>
          <button
            className='bg-red-800 hover:scale-110 text-white font-semibold hover:bg-red-600 rounded-full px-1 sm:px-2 text-xs sm:text-base'
            title='Log Out'
            onClick={handleLogout}
          >
            Logout
          </button>
          <Link to='/products/create'>
            <MdOutlineAddBox className='text-green-700 text-3xl sm:text-4xl hover:scale-110' />
          </Link>
        </div>
      </div>

      <div className='flex flex-col md:flex-row justify-between items-center py-4 space-y-2 md:space-y-0 md:space-x-4'>
        <div className='w-full md:w-auto'>
          <label className='mr-2 font-semibold'>Price Order:</label>
          <select
            value={priceOrder}
            onChange={handlePriceOrderChange}
            className='w-full md:w-auto border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value=''>None</option>
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </select>
        </div>
        <div className='w-full md:w-auto'>
          <label className='mr-2 font-semibold'>Alphabetical Order:</label>
          <select
            value={alphabeticalOrder}
            onChange={handleAlphabeticalOrderChange}
            className='w-full md:w-auto border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value=''>None</option>
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </select>
        </div>
        <div className='w-full md:w-auto'>
          <label className='mr-2 font-semibold'>Category:</label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className='w-full md:w-auto border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value=''>None</option>
            <option value='men'>Men</option>
            <option value='women'>Women</option>
            <option value='children'>Children</option>
            <option value='jewelry'>Jewelry</option>
            <option value='electronics'>Electronics</option>
          </select>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <ProductsTable
          filteredProducts={filteredProducts}
          handleDelete={handleDelete}
        />
      )}

      {showDeletePopup && (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10'>
          <div className='bg-white p-8 rounded-lg'>
            <h2 className='text-2xl mb-4'>Delete Product</h2>
            <p className='mb-4'>
              Are you sure you want to delete this product?
            </p>
            <div className='flex justify-center'>
              <button
                onClick={handleConfirmDelete}
                className='bg-red-800 font-bold text-white px-4 py-2 rounded mr-4'
              >
                Yes😥
              </button>
              <button
                onClick={handleCancelDelete}
                className='bg-green-600 font-bold text-white px-4 py-2 rounded'
              >
                No😃
              </button>
            </div>
          </div>
          <div
            className='w-screen h-screen absolute -z-10 popup-overlay backdrop-blur-[1px]'
            onClick={handleCancelDelete}
          ></div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Home;
