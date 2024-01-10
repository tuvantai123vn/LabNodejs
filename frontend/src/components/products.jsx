import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DetailProduct from "./DetailProduct";

function useCart() {
  const [cart, setCart] = useState([]);

  const addToCart = async (productId, productPrice, qty) => {
    const updatedCart = [...cart];
    const existingProduct = updatedCart.find((item) => item.id === productId);

    if (existingProduct) {
      existingProduct.qty += parseInt(qty, 10);
    } else {
      updatedCart.push({
        id: productId,
        qty: parseInt(qty, 10),
        price: parseFloat(productPrice),
      });
    }

    try {
      await axios.post("http://localhost:4000/cart/add-cart", {
        product_id: productId,
        quantity: 1,
        productPrice: parseFloat(productPrice),
      });
      setCart(updatedCart);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return { cart, addToCart };
}

function RenderShop() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:4000/products");
        setProducts(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const handleProductDetail = (id) => {
    navigate(`/product-detail/${id}`);
  };

  const groupedProducts = Array.from(
    { length: Math.ceil(products.length / 4) },
    (_, index) => products.slice(index * 4, (index + 1) * 4)
  );

  return (
    <div>
      {groupedProducts.map((row, rowIndex) => (
        <div key={rowIndex} className="grid">
          {row.map((product, index) => (
            <div key={index} className="card product-item">
              <header className="card__header">
                <h1 className="product__title">{product.title}</h1>
              </header>
              <div className="card__image">
                <img src={product.imageUrl} alt={product.title} />
              </div>
              <div className="card__content">
                <h2 className="product__price">{product.price}</h2>
                <p className="product__description">{product.description}</p>
              </div>
              <div className="card__actions">
                <button
                  className="btn"
                  onClick={() => handleProductDetail(product.id)}
                >
                  Detail
                </button>
                <button
                  className="btn"
                  onClick={() => addToCart(product.title, product.price)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default RenderShop;
