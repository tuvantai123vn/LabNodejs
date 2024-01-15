import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/carts/getcart")
      .then((response) => {
        setCart(response.data);
        
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleCheckout = async () => {
    try {
      await axios.post("http://localhost:4000/order/checkout");
      // Optionally, you can redirect the user or show a success message
      console.log("Đặt hàng thành công!");
      navigate("/");
    } catch (error) {
      console.error("Lỗi khi thực hiện thanh toán:", error);
    }
  };

  const handleRemoveFromCart = (productId) => {
    axios
      .delete(`http://localhost:4000/carts/remove-cart/${productId}`)
      .then((response) => {
        const updatedCart = cart.filter((item) => item._id !== productId);
        setCart(updatedCart);
      })
      .catch((error) => console.error("Error removing from cart:", error));
  };

  return (
    <div>
      <div className="grid">
        {cart.map((item) =>
          item.products.map((product) => (
            <div key={product._id} className="card product-item">
              <header className="card__header">
                <h1 className="product__title">
                  Title: {product.product?.title}
                </h1>
              </header>
              <div className="card__image">
                <img
                  src={product.product?.imageUrl}
                  alt={product.product?.title}
                />
              </div>
              <div className="card__content">
                <p className="product__description">
                  Quantity: {product.quantity}
                </p>
                <p className="product__description">Price: {product.price}</p>
              </div>
              <div className="card__actions">
                <button
                  className="btn"
                  onClick={() => handleRemoveFromCart(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <header className="card__header">
        <h1 className="product__title">
          Total Price: ${cart.map((item) => item.totalPrice)}
          <button className="btn" onClick={handleCheckout}>
        Checkout
      </button>
        </h1>
        
      </header>
    </div>
  );
};

export default Cart;