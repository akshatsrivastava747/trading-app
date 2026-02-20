import React,{ StrictMode } from 'react';

import { createRoot } from 'react-dom/client'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import App from './App.jsx'
import "./index.css"
import HomePage from './landing_page/home/HomePage.jsx';
import AboutPage from './landing_page/about/AboutPage.jsx';
import ProductPage from './landing_page/products/ProductPage.jsx';
import PricingPage from './landing_page/pricing/PricingPage.jsx';
import SupportPage from './landing_page/support/SupportPage.jsx';
import NavBar from './landing_page/Navbar.jsx';
import Footer from './landing_page/Footer.jsx';
import Signup from './landing_page/signup/Signup.jsx';
import NotFound from './landing_page/NotFound.jsx';
import Login from './landing_page/login/Login.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <NavBar/>
  <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/about" element={<AboutPage/>}/>
    <Route path="/product" element={<ProductPage/>}/>
    <Route path="/pricing" element={<PricingPage/>}/>
    <Route path="/support" element={<SupportPage/>}/>
    <Route path="*" element={<NotFound/>}/>
  </Routes>
  <Footer/>
  </BrowserRouter>
)
