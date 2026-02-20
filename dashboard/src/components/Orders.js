import React,{useState,useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    axios.get("http://localhost:3002/allOrders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setAllOrders(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  
  }, []);
  return (
    <div className="orders">
      {!allOrders.length ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>

          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      ) : (
        <div>
          <h3 className="title">Orders ({allOrders.length})</h3>

          <div className="order-table">
            <table>
              <tr>
                <th>Name</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Mode</th>
              </tr>
              {allOrders.map((order, index) => {
                return (
                  <tr key={index}>
                    <td>{order.name}</td>
                    <td>{order.qty}</td>
                    <td>{order.price.toFixed(2)}</td>
                    <td>{order.mode}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
