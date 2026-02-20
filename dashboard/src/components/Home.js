import React,{ useEffect } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => { 
  useEffect(() => {
    // get token from URL
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");
  
    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
  
      // clean URL
      window.history.replaceState({}, document.title, "/");
    }
  
    // attach token to axios
    const token = localStorage.getItem("token");
  
    if (token) {
      axios.defaults.headers.common["Authorization"] =
        `Bearer ${token}`;
    }
  
    console.log("Token setup done:", localStorage.getItem("token"));
  
  }, []);
  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;
