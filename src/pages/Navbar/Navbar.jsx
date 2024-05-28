// import React, { useState } from 'react';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaCaretDown } from "react-icons/fa6";
import { MdPerson } from "react-icons/md";
import { NavLink } from "react-router-dom";
import MobileSearchBar from "./MobileSearchBar";
import SearchBar from "./SearchBar";
import Mobilemenu from "./Mobilemenu";

const MenuLinks = [
  {
    id: 1,
    name: "Home",
    link: "/home",
  },
  {
    id: 2,
    name: "Shop",
    link: "/products",
  },
  {
    id: 3,
    name: "About",
    link: "/about",
  },
  {
    id: 4,
    name: "Brands",
    link: "/categories",
  },
];

const DropdownLinks = [
  {
    id: 1,
    name: "Trending Products",
    link: "/categories/trending",
  },
  {
    id: 2,
    name: "Men Fashion",
    link: "/categories/men",
  },
  {
    id: 3,
    name: "Women Fashion",
    link: "/categories/women",
  },
  {
    id: 4,
    name: "Children Fashion",
    link: "/categories/children",
  },
];

const Navbar = () => {
  return (
    <>
      <div className="lg:px-32 w-full bg-white dark:bg-gray-900 duration-200 sticky z-40 border-b-2 border-grey-200">
        <div className="py-3">
          <div className="flex justify-between items-center">
            <div className="mx-12 lg:mx-0 flex tems-center gap-4">
              <NavLink
                href="/"
                className="text-primary font-semibold tracking-tighter text-2xl sm:text-3xl"
              >
                CozyCove
              </NavLink>
              <div className="hidden lg:block">
                <ul className="flex items-center gap-4">
                  {MenuLinks.map((data, index) => (
                    <li key={index}>
                      <NavLink
                        to={data.link}
                        className="inline-block px-4 font-semibold text-gray-900 hover:text-black focus:bg-blue-300 focus:rounded-full"
                      >
                        {data.name}
                      </NavLink>
                    </li>
                  ))}
                  <li className="relative cursor-pointer group">
                    <NavLink
                      to="#"
                      className="flex items-center gap-[2px] font-semibold text-gray-900 dark:hover:text-white py-2"
                    >
                      Categories
                      <span>
                        <FaCaretDown className="group-hover:rotate-180 duration-300" />
                      </span>
                    </NavLink>
                    {/**Dropdown menu */}
                    <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white shadow-md p-2 ">
                      <ul className="space-y-2">
                        {DropdownLinks.map((data) => (
                          <li key={data.id}>
                            <NavLink
                              className="text-gray-900  dark:hover:text-white duration-200 inline-block w-full p-2 hover:bg-primary/20 rounded-md font-semibold"
                              to={data.link}
                            >
                              {data.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex px-2 justify-between items-center gap-2 mx-6">
              <SearchBar />
              <div className="flex">
                <NavLink to="login">
                  <button className="btn-primary">Login</button>
                </NavLink>
                <NavLink to="/">
                  <button className=" ml-1 btn-primary">SignUp</button>
                </NavLink>
              </div>
              <div className=" hidden lg:inline-block text-3xl text-gray-600">
                <MdPerson />
              </div>
              <button className=" hidden lg:block relative p-3">
                <NavLink to="/cart">
                <AiOutlineShoppingCart className="text-2xl text-gray-600 dark:text-gray-400" />
                <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">
                  0
                </div>
                </NavLink>
              </button>
              <div className="p-2 absolute left-0 top-2">
                <Mobilemenu />
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileSearchBar />
    </>
  );
};

export default Navbar;
