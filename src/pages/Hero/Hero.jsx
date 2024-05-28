// import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image1 from "../../assets/tmpAssets/man2.png";
import Image3 from "../../assets/tmpAssets/child2.png";
import Image2 from "../../assets/tmpAssets/woman2.png";
import { NavLink } from "react-router-dom";

const HeroData = [
  {
    id: 1,
    img: Image1,
    subtitle: "Best Men",
    title: "Fashion",
    title2: "Shirts",
  },
  {
    id: 2,
    img: Image2,
    subtitle: "Women Special",
    title: "Fashion",
    title2: "Dresses",
  },
  {
    id: 1,
    img: Image3,
    subtitle: "Warm and Cozy",
    title: "Fashion for",
    title2: "Children",
  },
];

const Hero = () => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    pauseOnFocus: true,
  };
  return (
    <div className="md:px-28 px-6">
      <div className="sm:mt-6 overflow-hidden rounded-3xl min-h-[500px] flex justify-center items-center">
        <div className=" container bg-gray-300 md:w-full md:px-32 pb-6 sm:pb-0 border-gray-500 border-2 rounded-2xl shadow-lg">
          {/* Hero section */}
          <Slider {...settings}>
            {HeroData.map((data) => (
              <div key={data.id}>
                {/* grid grid-cols-1 sm:grid-cols-2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  {/* text content section */}
                  <div className="flex flex-col justify-center gap-4 sm:pl-3 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                    <h1 className="text-2xl sm:text-6xl lg:text-3xl font-bold">
                      {data.subtitle}
                    </h1>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
                      {data.title}
                    </h1>
                    <h1 className="text-5xl uppercase text-red-600 sm:text-[80px] md:text-[100px] xl:text-[150px] font-bold">
                      {data.title2}
                    </h1>
                    <div>
                      <NavLink to="categories">
                        <button className="btn-secondary text-xl px-4 shadow-md font-mono">
                          Explore Category
                        </button>
                      </NavLink>
                    </div>
                  </div>
                  {/* Img section */}
                  <div className="order-1 sm:order-2">
                    <div className="relative z-10">
                      <img
                        src={data.img}
                        alt="hero-image"
                        className="w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] sm:scale-105 lg:scale-120 object-contain mx-auto drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)] relative z-40"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Hero;
