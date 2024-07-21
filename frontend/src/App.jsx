// import React from "react";
import { useEffect } from "react";
import About from "./pages/About/About";
import Categories from "./pages/Categories/Categories";
import WomenCategory from "./pages/Categories/WomenCategory";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import NewPassword from "./pages/Auth/NewPassword";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import EmptyCart from "./pages/Cart/EmptyCart";
import ErrorPage from "./pages/Error/ErrorPage";
import Products from "./pages/ProductDetails/Products";
import ProductDetail from "./pages/ProductDetails/ProductDetail";
import Trending from "./pages/Categories/Trending";
import ChildrenCategory from "./pages/Categories/ChildrenCategory";
import MenCategory from "./pages/Categories/MenCategory";
import Accessories from "../src/pages/Categories/Accessories";
import UserProfile from "../src/pages/UserProfile/UserProfile";
import { SearchProvider } from "./contexts/SearchContext";

import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// Layout for More Pages
import RootLayout from "./pages/Layouts/RootLayout";
import CategoriesLayout from "./pages/Layouts/CategoriesLayout";
import PrivateRoute from "./pages/Auth/PrivateRoute";
import Checkout from "./pages/Payments/Checkout";
import ThankYou from "./pages/Payments/ThankYou";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route exact path='/register' element={<Signup />} />
      <Route exact path='/login' element={<Login />} />
      <Route element={<RootLayout />}>
        {/* Public routes */}
        <Route path='/' element={<Home />} />
        <Route path='/products/:productId' element={<ProductDetail />} />
        <Route exact path='/about' element={<About />} />
        <Route path='/empty-cart' element={<EmptyCart />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/newpassword' element={<NewPassword />} />
        

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path='/cart/:userId' element={<Cart />} />
          <Route path='/products' element={<Products />} />
          <Route path='/userprofile/:userId' element={<UserProfile />} />
          <Route path='/categories' element={<Categories />} />
          {/* layout for categories */}
          <Route path='/categories' element={<CategoriesLayout />}>
            <Route path='women' element={<WomenCategory category='women' />} />
            <Route path='men' element={<MenCategory category='men' />} />
            <Route
              path='children'
              element={<ChildrenCategory category='children' />}
            />
            <Route path='accessories' element={<Accessories category='jewelery' />} />
            <Route exact path='trending' element={<Trending category='trending'/>} />
          </Route>
          <Route path="/checkout" element={<Checkout />}/>
          <Route path="/thankyou" element={<ThankYou />}/>

          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Route>
    </Route>
  )
);
const App = () => {
  return (
    <SearchProvider>
      <RouterProvider router={router} />
    </SearchProvider>
  );
}

export default App;
