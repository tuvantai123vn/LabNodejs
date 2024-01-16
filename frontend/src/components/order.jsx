import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from the server
    axios
      .get("http://localhost:4000/order")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  return (
    <div>
      <h1>Your Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <h3>Order ID: {order._id}</h3>
            <p>User: {order.user.name}</p>
            <ul>
              {order.products.map((product) => (
                <li key={product._id}>
                  <p>Title: {product.product?.title}</p>
                  <p>Quantity: {product.quantity}</p>
                  {/* Assuming 'price' is part of the product data */}
                  <p>Price: ${product.product.price}</p>
                </li>
              ))}
            </ul>
            {/* Tính tổng giá của đơn hàng và hiển thị */}
            <p>
              Total Price: $
              {order.products.reduce(
                (total, product) =>
                  total + product.quantity * product.product.price,
                0
              )}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
