import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatCurrency } from "../utils/formatCurrency";
import { formatIndianCurrency } from "../utils/formatIndianCurrency";


const Summary = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:3002/allHoldings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const holdingsFromDB = res.data;

        const updatedHoldings = await Promise.all(
          holdingsFromDB.map(async (holding) => {
            try {
              const stockRes = await axios.get(
                `http://localhost:3002/stock/${holding.symbol}`
              );

              return {
                ...holding,
                price: stockRes.data.price,
              };
            } catch {
              return {
                ...holding,
                price: holding.price,
              };
            }
          })
        );

        // 3️⃣ save updated holdings
        setAllHoldings(updatedHoldings);
        
        const fetchProfile = async () => {
          try {
            const token = localStorage.getItem("token");
      
            const res = await axios.get("http://localhost:3002/profile", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
      
            setUser(res.data);
          } catch (err) {
            console.log("Profile fetch error:", err);
          }
        };
        fetchProfile();
      } catch (err) {
        console.log("Error fetching holdings:", err);
      }
    };

    fetchHoldings();
  }, []);

  const totalInvestment = allHoldings.reduce(
    (sum, stock) => sum + (stock.avg || 0) * stock.qty,
    0
  );

  const currentValue = allHoldings.reduce(
    (sum, stock) => sum + (stock.price || 0) * stock.qty,
    0
  );

  const equityValue = currentValue;

  const totalProfit = currentValue - totalInvestment;

  const totalProfitID = totalProfit >= 0 ? "profit" : "loss";

  const totalProfitPercent =
    totalInvestment > 0 ? (totalProfit / totalInvestment) * 100 : 0;

  return (
    <>
      <div className="username">
        <h6>Hi, {user?.username || "User"}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{formatIndianCurrency(equityValue)}</h3>
            <p>Total equity value</p>
          </div>

          {/* <div className="second">
            <p>
              Margins used <span>0</span>{" "}
            </p>
            <p>
              Opening balance <span>3.74k</span>{" "}
            </p>
          </div> */}
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({allHoldings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 id={totalProfitID}>
              {totalProfit < 0 ? "-" : "+"}
              {formatCurrency(Math.abs(totalProfit))}{" "}
              <small id={totalProfitID}>
                {totalProfit > 0 ? "+" : ""}
                {totalProfitPercent.toFixed(2)}%
              </small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{formatCurrency(currentValue)}</span>{" "}
            </p>
            <p>
              Investment <span>{formatCurrency(totalInvestment)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
