import React, { useState, useContext,useEffect } from "react";
import axios from "axios";
import GeneralContext from "../context/GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ symbol, mode, price,name }) => {
  const { closeBuyWindow } = useContext(GeneralContext);

  const [stockQuantity, setStockQuantity] = useState("");
  const [stockPrice, setStockPrice] = useState(price || 0);

  useEffect(() => {
    setStockPrice(price);
  }, [price]);

  const handleBuyClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const qty = Number(stockQuantity);

      if (!Number.isInteger(qty) || qty <= 0) {
        alert("Quantity must be a positive number");
        return;
      }

      await axios.post(
        "https://trading-backend-buvs.onrender.com/newOrder",
        {
          name: name,
          symbol:symbol,
          qty: Number(stockQuantity),
          price: stockPrice,
          mode: "BOUGHT",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      closeBuyWindow();
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const handleSellClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`https://trading-backend-buvs.onrender.com/holding/${symbol}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const holdingQty = res.data.qty;

      const qty = Number(stockQuantity);

      if (!Number.isInteger(qty) || qty <= 0) {
        alert("Quantity must be a positive number");
        return;
      }
      if (holdingQty < qty) {
        alert("You do not have enough stocks quantities!");
        return;
      }

      await axios.post(
        "https://trading-backend-buvs.onrender.com/newOrder",
        {
          name: name,
          symbol:symbol,
          qty: Number(stockQuantity),
          price: stockPrice,
          mode: "SOLD",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      closeBuyWindow();
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="container" id="buy-window">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              min="1"
              step="1"
              type="number"
              value={stockQuantity}
              onChange={(e) => {
                const value = e.target.value;

                if (value === "" || /^[0-9]+$/.test(value)) {
                  setStockQuantity(value);
                }
              }}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <p>₹{stockPrice || "Loading..."}</p>
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          {mode === "buy" ? (
            <button className="btn btn-blue" onClick={handleBuyClick}>
              Buy
            </button>
          ) : (
            <button className="btn btn-blue" onClick={handleSellClick}>
              Sell
            </button>
          )}

          <button className="btn btn-grey" onClick={closeBuyWindow}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
