import React, { useState, useEffect } from "react";
import axios from "axios";

import Menu from "./Menu";

const TopBar = () => {
  const [niftyValue, setNiftyValue] = useState(0);
  const [sensexValue, setSensexValue] = useState(0);

  useEffect( () => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("https://trading-backend-buvs.onrender.com/nifty", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const res2 = await axios.get("https://trading-backend-buvs.onrender.com/sensex", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNiftyValue(res.data.price);
        setSensexValue(res2.data.price)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">{niftyValue} </p>
          <p className="percent"> </p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">{sensexValue}</p>
          <p className="percent"></p>
        </div>
      </div>

      <Menu />
    </div>
  );
};

export default TopBar;
