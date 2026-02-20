import React, { useState, useContext, useEffect } from "react";

import GeneralContext from "../context/GeneralContext";

import { Tooltip, Grow } from "@mui/material";

import { watchlist } from "../data/data";

import axios from "axios";

import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";
import { DoughnutChart } from "./DoughnutChart";

const WatchList = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    fetchStockPrice();
  }, []);


  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.length > 1) {
        fetchSearchResults();
      } else {
        setResults([]);
      }
    }, 500); // debounce (wait 500ms)

    return () => clearTimeout(delay);
  }, [query]);

  const fetchSearchResults = async () => {
    try {
      const res = await axios.get(`https://trading-backend-buvs.onrender.com/search/${query}`);

      setResults(res.data);
    } catch (err) {
      console.log(err);
    }
  };


  const fetchStockPrice = async () => {
    try {
      // fetch all prices together
      const prices = await Promise.all(
        watchlist.map(async (stock) => {
          const res = await axios.get(
            `https://trading-backend-buvs.onrender.com/stock/${stock.symbol}`
          );
  
          return res.data.price; 
        })
      );
  
      setStockData(prices);
  
    } catch (err) {
      console.log("Stock fetch error:", err);
    }
  };


  const data = {
    labels: watchlist.map((stock)=>stock.name),
    datasets: [
      {
        label: 'Price per unit',
        data: stockData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          value={query}
          placeholder="Search stock..."
          className="search"
          onChange={(e) => setQuery(e.target.value)}
        />
        {results.length === 0 && (
          <span className="counts">{watchlist.length}/50</span>
        )}
      </div>

      {results.length > 0 ? (
        <ul className="list">
          {results.slice(0, 10).map((stock, index) => (
            <li key={index}>
              <WatchListItem
                key={index}
                stock={{
                  name: stock.description,
                  symbol: stock.symbol,
                  percent: "",
                  isDown: false,
                }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="list">
          {watchlist.map((stock, index) => {
            return <WatchListItem stock={stock} key={index} />;
          })}
        </ul>
      )}
      <DoughnutChart data={data}/>
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [showWatchListActions, setShowWatchListActions] = useState(false);
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    fetchStockPrice();
  }, []);

  const fetchStockPrice = async () => {
    try {
      const res = await axios.get(
        `https://trading-backend-buvs.onrender.com/stock/${stock.symbol}`
      );

      setStockData(res.data);
    } catch (err) {
      console.log("Stock fetch error:", err);
    }
  };

  const handleMouseEnter = (e) => {
    setShowWatchListActions(true);
  };

  const handleMouseLeave = (e) => {
    setShowWatchListActions(false);
  };

  if (stockData?.price === "N/A") return null;

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
        <p className={stockData?.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stockData?.percent || "..."}</span>
          {stockData?.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price">₹{stockData?.price || "Loading..."}</span>
        </div>
      </div>
      {showWatchListActions && (
        <WatchListActions
          symbol={stock.symbol}
          name={stock.name}
          price={stockData?.price}
        />
      )}
    </li>
  );
};

const WatchListActions = ({ symbol ,name,price}) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(symbol,name, "buy",price);
  };
  const handleSellClick = () => {
    generalContext.openBuyWindow(symbol,name ,"sell",price);
  };

  return (
    <span className="actions">
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
          onClick={handleBuyClick}
        >
          <button className="buy">Buy</button>
        </Tooltip>
        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
          onClick={handleSellClick}
        >
          <button className="sell">Sell</button>
        </Tooltip>
        <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>
        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
