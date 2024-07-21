import AOS from "aos";
import React, { useEffect } from "react";
import Banner from "../Banner/Banner";
import Hero from "../Hero/Hero";
import Products from "../ProductDetails/Products";
import img1 from "../../assets/tmpAssets/child2.png";
import img2 from "../../assets/tmpAssets/man2.png";
import MobileSearchBar from "../Navbar/MobileSearchBar";

const BannerData = {
  discount: "30% OFF",
  title: "Fine Smile",
  date: "10 Jan to 28 Jan",
  image: img1,
  title2: "Air Solo Bass",
  title3: "Winter Sale",
  title4:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis",
  bgColor: "#f42c37",
};

const BannerData2 = {
  discount: "30% OFF",
  title: "Happy Hours",
  date: "14 Jul to 28 Sep",
  image: img2,
  title2: "Smart Solo",
  title3: "Winter Sale",
  title4:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis",
  bgColor: "#2dcc6f",
};

const Home = () => {
  // Effect for AOS
  // const name = localStorage.getItem("name");
  useEffect(() => {
    AOS.init({
      duration: 2000,
      // easing: "ease-in-sine",
      // delay: 100,
      // offset: 100,
    });
    // AOS.refresh();
    // toast.success(`WELCOME BACK ${name}`)
  }, []);

  return (
    <main className='px-4 duration-200'>

      <section className='p-2'>
      <MobileSearchBar />
      </section>

      <section className='hidden lg:block' data-aos='fade-in'>
        <Hero />
      </section>

      <section className="mt-15">
      <Products />
      </section>

      <section id="banner1" data-aos="fade-in">
        <Banner data={BannerData} />
      </section>
      <section id="banner2" data-aos="fade-in">
        <Banner data={BannerData2} />
      </section>
    </main>
  );
};

export default Home;
