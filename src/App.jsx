// import React from "react";
// import { useState } from 'react'

import About from "./pages/About/About";
import Categories from "./pages/Categories/Categories";
import WomenCategory from "./pages/Categories/WomenCategory";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Cart from "./pages/Cart/Cart";
import EmptyCart from "./pages/Cart/EmptyCart";
import ErrorPage from "./pages/Error/ErrorPage";
import Products from "./pages/ProductDetails/Products";
import Trending from "./pages/Categories/Trending";
import ChildrenCategory from "./pages/Categories/ChildrenCategory";
import ProductDetail from "./pages/ProductDetails/ProductDetail";
import MenCategory from "./pages/Categories/MenCategory";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import NewPassword from "./pages/Auth/NewPassword";
import Accessories from "../src/pages/Categories/Accessories";
// import SearchResultsPage from "./pages/Navbar/SearchResultsPage";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// Layout for Pages
import RootLayout from "./pages/Layouts/RootLayout";
import CategoriesLayout from "./pages/Layouts/CategoriesLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<RootLayout />}>
        <Route exact path="/" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
        {/* <Route exact path="/search" element={<SearchResultsPage />} /> */}
        <Route exact path="/newpassword" element={<NewPassword />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/empty-cart" element={<EmptyCart />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/:productId" element={<ProductDetail />} />
        <Route exact path="/categories" element={<Categories />} />
        {/* for categories */}
        <Route exact path="/categories" element={<CategoriesLayout />}>
          <Route exact path="women" element={<WomenCategory category="women" />} />
          <Route exact path="men" element={<MenCategory category="men" />} />
          <Route exact path="children" element={<ChildrenCategory category="children" />} />
          <Route exact path="assesory" element={<Accessories category="jewelery" />} />
          <Route exact path="trending" element={<Trending />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
