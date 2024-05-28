import AOS from "aos";
import React from 'react';
import Banner from '../Banner/Banner';
import Hero from "../Hero/Hero";
import Products from '../ProductDetails/Products';
import img1 from '../../assets/tmpAssets/child2.png'
import img2 from '../../assets/tmpAssets/man2.png'


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
  date: "14 Jan to 28 Jan",
  image: img2,
  title2: "Smart Solo",
  title3: "Winter Sale",
  title4:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis",
  bgColor: "#2dcc6f",
};

const Home = () => {

// Effect for AOS 
  React.useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
      offset: 100,
    });
    AOS.refresh();
  }, []);


  return (
    <main className="px-4 duration-200">        
        <Hero />
        <Products />
        <Banner data={BannerData}/>
        <Banner data={BannerData2}/>
    </main>
  )
}

export default Home