import React, { useState, useEffect } from "react";

import axios from "axios";
import { VerticalBarChart } from "./VerticalBarChart";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("https://trading-backend-buvs.onrender.com/allHoldings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const holdingsFromDB = res.data;

        const updatedHoldings = await Promise.all(
          holdingsFromDB.map(async (holding) => {
            try {
              const stockRes = await axios.get(
                `https://trading-backend-buvs.onrender.com/stock/${holding.symbol}`
              );

              return {
                ...holding,
                price: stockRes.data.price,
              };
            } catch {
              // fallback if API fails
              return {
                ...holding,
                price: holding.price,
              };
            }
          })
        );

        // 3️⃣ save updated holdings
        setAllHoldings(updatedHoldings);
      } catch (err) {
        console.log("Error fetching holdings:", err);
      }
    };

    fetchHoldings();
  }, []);

  const labels = allHoldings.map((stock) =>stock["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) =>stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const totalInvestment = allHoldings.reduce(
    (sum, stock) => sum + (stock.avg || 0) * stock.qty,
    0
  );

  // current market value
  const currentValue = allHoldings.reduce(
    (sum, stock) => sum + (stock.price || 0) * stock.qty,
    0
  );

  // total profit
  const totalProfit = currentValue - totalInvestment;

  // profit class
  const totalProfitID = totalProfit >= 0 ? "profit" : "loss";

  // percent change
  const totalProfitPercent =
    totalInvestment > 0 ? (totalProfit / totalInvestment) * 100 : 0;
  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Name</th>
            <th>Qty.</th>
            <th>LTP</th>
            <th>Avg. cost</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
          </tr>
          {allHoldings.map((stock, index) => {
            const curValue = stock.price * stock.qty;
            const isProfit = curValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const netChange =
              stock.avg > 0 ? ((stock.price - stock.avg) / stock.avg) * 100 : 0;

            return (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                {stock.price ? <td>{stock.price.toFixed(2)}</td> : <td></td>}
                {stock.avg ? <td>{stock.avg.toFixed(2)}</td> : <td></td>}
                <td>{curValue.toFixed(2)}</td>
                {stock.avg ? (
                  <td className={profClass}>
                    {(curValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                ) : (
                  <td></td>
                )}
                {stock.avg ? (
                  <td className={profClass}>{netChange.toFixed(5)}</td>
                ) : (
                  <td></td>
                )}
              </tr>
            );
          })}
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>{totalInvestment.toFixed(2)}</h5>
          <p>Total investment</p>
        </div>

        <div className="col">
          <h5>{currentValue.toFixed(2)}</h5>
          <p>Current value</p>
        </div>

        <div className="col">
          <h5 id={totalProfitID}>
            {totalProfit > 0 ? "+" : ""}
            {totalProfit.toFixed(2)} ({totalProfit > 0 ? "+" : ""}
            {totalProfitPercent.toFixed(2)}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
      <br/>
      <br/>
      <VerticalBarChart data={data}/>
    </>
  );
};

export default Holdings;
