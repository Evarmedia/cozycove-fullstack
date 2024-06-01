import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const token = localStorage.getItem("token");
  // const userId = localStorage.getItem('userId'); //get userId from localStorage
  const { userId } = useParams(); // get userId from useParams hook

  const [userData, setUserData] = useState({});

  // // Ediform stateManagement
  // const [email, setEmail] = useState("");
  // const [firstname, setFirstname] = useState("");
  // const [lastname, setLastname] = useState("");
  // const [city, setCity] = useState("");
  // const [state, setState] = useState("");
  // const [zip, setZip] = useState("");
  // const [country, setCountry] = useState("");


  useEffect(() => {
    // NOTE: CHANGE THIS TO AN EDIT_USER (POST) METHOD, DO SAME IN BACKEND
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/api/auth/showuser/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
        // console.log(response.data); // handle the response data as needed
      } catch (error) {
        console.error("Error fetching product:", error); // handle the error as needed
      }
    };

    // Call the async function
    fetchData();
  }, [userId, token]);

  return (
    <div>
      <section className='py-24 relative'>
        <div className='w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto'>
          <div className='w-full flex-col justify-center items-center gap-4 inline-flex'>
            <h2 className='text-center text-gray-900 text-4xl font-bold font-manrope leading-normal'>
              Edit Your Profile
            </h2>
            <p className='text-center text-gray-500 text-base font-normal leading-relaxed'>
              Update your information to ensure a seemless process of generating
              your invoices or bills
            </p>
          </div>
          <div className='lg:my-14 my-8 grid lg:grid-cols-2 grid-cols-1 gap-8'>
            <div className='w-full flex-col justify-start items-start gap-6 inline-flex'>
              <h4 className='text-gray-900 text-xl font-semibold leading-8'>
                Basic Information
              </h4>
              <div className='w-full flex-col justify-start items-start gap-8 flex'>
                <div className='w-full flex-col justify-start items-start gap-1.5 flex'>
                  <label
                    htmlFor=''
                    className='flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed'
                  >
                    Email
                    {/* Asterics instead of svg---lesscode */}
                    <h1 className='text-red-500 text-sm'>*</h1>
                  </label>
                  <input
                    type='text'
                    className='w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex'
                    placeholder={userData.email}
                    // value={}
                    // onChange={}
                    required
                  />
                </div>
                <div className='w-full justify-start items-start gap-7 flex sm:flex-row flex-col'>
                  <div className='w-full flex-col justify-start items-start gap-1.5 flex'>
                    <label
                      htmlFor=''
                      className='flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed'
                    >
                      First Name
                      {/* Asterics instead of svg---lesscode */}
                      <h1 className='text-red-500 text-sm'>*</h1>
                    </label>
                    <input
                      type='text'
                      className='w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex'
                      placeholder={userData.firstname}
                      // value={}
                      // onChange={}
                      required
                    />
                  </div>
                  <div className='w-full flex-col justify-start items-start gap-1.5 flex'>
                    <label
                      htmlFor=''
                      className='flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed'
                    >
                      Last Name
                      {/* Asterics instead of svg---lesscode */}
                      <h1 className='text-red-500 text-sm'>*</h1>
                    </label>
                    <input
                      type='text'
                      className='w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex'
                      placeholder={userData.lastname}
                      // value={}
                      // onChange={}
                      required
                    />
                  </div>
                </div>
                <div className='w-full flex-col justify-start items-start gap-1.5 flex'>
                  <label
                    htmlFor=''
                    className='flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed'
                  >
                    Phone Number
                    {/* Asterics instead of svg---lesscode */}
                    <h1 className='text-red-500 text-sm'>*</h1>
                  </label>
                  <input
                    type='text'
                    className='w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex'
                    placeholder='+333-082-992-211'
                    // value={}
                    // onChange={}
                    required
                  />
                </div>
              </div>
            </div>
            <div className='w-full flex-col justify-start items-start gap-6 inline-flex'>
              <h4 className='text-gray-900 text-xl font-semibold leading-8'>
                Address Information
              </h4>
              <div className='w-full flex-col justify-start items-start gap-8 flex'>
                <div className='w-full flex-col justify-start items-start gap-1.5 flex'>
                  <label
                    htmlFor=''
                    className='flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed'
                  >
                    Address
                    {/* Asterics instead of svg---lesscode */}
                    <h1 className='text-red-500 text-sm'>*</h1>
                  </label>
                  <input
                    type='text'
                    className='w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex'
                    placeholder='Edit Address'
                    // value={}
                    // onChange={}

                  />
                </div>
                <div className='w-full flex-col justify-start items-start gap-1.5 flex'>
                  <label
                    htmlFor=''
                    className='flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed'
                  >
                    Address 2{/* Asterics instead of svg---lesscode */}
                    <h1 className='text-red-500 text-sm'>*</h1>
                  </label>
                  <input
                    type='text'
                    className='w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex'
                    placeholder='Edit Address'
                    // value={}
                    // onChange={}

                  />
                </div>
                <div className='w-full justify-start items-start gap-7 flex sm:flex-row flex-col'>
                  <div className='w-full flex-col justify-start items-start gap-1.5 flex'>
                    <label
                      htmlFor=''
                      className='flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed'
                    >
                      City
                      {/* Asterics instead of svg---lesscode */}
                      <h1 className='text-red-500 text-sm'>*</h1>
                    </label>
                    <input
                      type='text'
                      className='w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex'
                      placeholder='Lagos'
                      // value={}
                      // onChange={}
                      required
                    />
                  </div>
                  <div className='w-full flex-col justify-start items-start gap-1.5 flex'>
                    <label
                      htmlFor=''
                      className='flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed'
                    >
                      State
                      {/* Asterics instead of svg---lesscode */}
                      <h1 className='text-red-500 text-sm'>*</h1>
                    </label>
                    <input
                      type='text'
                      className='w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex'
                      placeholder='Lagos'
                      // value={}
                      // onChange={}
                      required
                    />
                  </div>
                </div>
                <div className='w-full justify-start items-start gap-7 flex sm:flex-row flex-col'>
                  <div className='w-full flex-col justify-start items-start gap-1.5 flex'>
                    <label
                      htmlFor=''
                      className='flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed'
                    >
                      Zip
                      {/* Asterics instead of svg---lesscode */}
                      <h1 className='text-red-500 text-sm'>*</h1>
                    </label>
                    <input
                      type='text'
                      className='w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex'
                      placeholder='201239'
                      // value={}
                      // onChange={}
                      required
                    />
                  </div>
                  <div className='w-full flex-col justify-start items-start gap-1.5 flex'>
                    <label
                      htmlFor=''
                      className='flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed'
                    >
                      Country
                      {/* Asterics instead of svg---lesscode */}
                      <h1 className='text-red-500 text-sm'>*</h1>
                    </label>
                    <input
                      type='text'
                      className='w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex'
                      placeholder='Euthopia'
                      // value={}
                      // onChange={}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className='mx-auto sm:w-fit w-full px-7 py-3 bg-indigo-600 hover:bg-indigo-700 transition-all duration-700 ease-in-out rounded-xl shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex'>
            <span className='px-2 text-center text-white text-lg font-semibold leading-8'>
              Save
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
