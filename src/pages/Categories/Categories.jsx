/* eslint-disable react/no-unescaped-entities */
// import React from "react";
import Image1 from "../../assets/tmpAssets/man1.png";
import Image2 from "../../assets/tmpAssets/woman1.png";
import Image3 from "../../assets/tmpAssets/child1.png";
import { NavLink } from "react-router-dom";

const Categories = () => {
  return (
    <div className="my-12 px-8 sm:py-8 sm:px-36">
      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* first col */}
          <NavLink to="men">
          <div className="py-10 pl-5 bg-gradient-to-br from-blue-700/90 to-blue-900/70 text-white rounded-3xl relative h-[320px] flex items-end">
            <div>
              <div className="mb-4">
                <p className="mb-[2px] text-gray-400">Enjoy</p>
                <p className="text-2xl font-semibold mb-[2px]">The Best</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2">
                  Men's Wear
                </p>
                <button className="bg-white text-black rounded-full px-4 py-1 hover:bg-gray-600">
                    Browse
                </button>
              </div>
            </div>
            <img src={Image1} alt="" className="w-[320px] absolute right-0 bottom-0" />
          </div>
          </NavLink>
          {/* second col */}
          <NavLink to="women">
          <div className="py-10 pl-5 bg-gradient-to-br from-brandYellow to-brandYellow/90 text-white rounded-3xl relative h-[320px] flex items-end">
            <div>
              <div className="mb-4">
                <p className="mb-[2px] text-white">Own</p>
                <p className="text-2xl font-semibold mb-[2px]">Your Favourite</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-40 mb-2 z-10">
                  Women's <br/>Fashion
                </p>
                <button className="bg-white text-yellow-600 rounded-full px-4 py-1">
                    Browse
                </button>
              </div>
            </div>
            <img
              src={Image2}
              alt=""
              className="sm:w-[320px] w-[200px] h-[300px] sm:h-auto absolute -right-2 sm:-bottom-5 -bottom-1"
            />
          </div>
          </NavLink>

          {/* kids col */}
          <NavLink to="children">
          <div className="sm:col-span-1 py-10 pl-5 bg-gradient-to-br from-primary to-primary/90 text-white rounded-3xl relative h-[320px] flex items-end">
            <div>
              <div className="mb-4">
                <p className="mb-[2px] text-white">Enjoy</p>
                <p className="text-2xl font-semibold mb-[2px]">With</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-40 mb-2">
                  Kid's Wears
                </p>
                <button className="bg-white text-red-600 rounded-full px-4 py-1">
                    Browse
                </button>
              </div>
            </div>
            <img
              src={Image3}
              alt=""
              className="w-[250px] absolute top-36 -translate-y-1/2 -right-6"
            />
          </div>
          </NavLink>
          {/* Accessories section*/}
          {/* <NavLink to="children">
          <div className="sm:col-span-1 py-10 pl-5 bg-gradient-to-br from-primary to-primary/90 text-white rounded-3xl relative h-[320px] flex items-end">
            <div>
              <div className="mb-4">
                <p className="mb-[2px] text-white">coming soon</p>
                <p className="text-2xl font-semibold mb-[2px]">Enjoy</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-40 mb-2">
                  Accessories
                </p>
                <button className="bg-white text-red-600 rounded-full px-4 py-1">
                    Browse
                </button>
              </div>
            </div>
            <img
              src={Image3}
              alt=""
              className="w-[250px] absolute top-36 -translate-y-1/2 -right-6"
            />
          </div>
          </NavLink> */}
        </div>
      </div>
    </div>
  );
};

export default Categories;
