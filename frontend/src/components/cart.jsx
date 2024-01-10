// Cart.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Gọi API để lấy dữ liệu giỏ hàng từ máy chủ Node.js
    axios
      .get("http://localhost:4000/carts/getcart")
      .then((response) => {
        const cartData = response.data;
        console.log(cartData)
        setCart(cartData.products);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleRemoveFromCart = (productId) => {
    axios
      .delete(`http://localhost:4000/carts/remove-cart/${productId}`)
      .then((response) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);
      })
      .catch((error) => console.error("Error removing from cart:", error));
  };

  const groupedProducts = Array.from(
    { length: Math.ceil(cart.length / 4) },
    (_, index) => cart.slice(index * 4, (index + 1) * 4)
  );

  return (
    <div>
      {groupedProducts.map((row, rowIndex) => (
        <div key={rowIndex} className="grid">
          {row.map((item) => (
            <div key={item.id} className="card product-item">
              <header className="card__header">
                <h1 className="product__title">Title: {item.id}</h1>
              </header>
              <div className="card__content">
                <p className="product__description">Quantity: {item.qty}</p>
                <p className="product__description">Price: {item.price}</p>
              </div>
              <div className="card__actions">
                <button
                  className="btn"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
      <header className="card__header">
        <h1 className="product__title">
          Total Price: $
          {cart.reduce((total, item) => total + item.qty * item.price, 0)}
        </h1>
      </header>
    </div>
  );
};

export default Cart;
