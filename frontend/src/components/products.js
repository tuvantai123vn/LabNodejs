import React, { useState } from "react";
import axios from 'axios';
import { useEffect } from "react";

function ListProducts({products}){
    console.log(products);
    return (
          <article className="card product-item">
            <header className="card__header">
              <h1 className="product__title">{products.title}</h1>
            </header>
            <div className="card__image">
              <img src={products.imageUrl} alt={products.title} />
            </div>
            <div className="card__content">
              <h2 className="product__price">{products.price}</h2>
              <p className="product__description">{products.description}</p>
            </div>
            <div className="card__actions">
              <button className="btn">Add to Cart</button>
            </div>
          </article>
      );
}

function RenderShop() {
  const [products, setProducts] = useState([]);
    useEffect(() => {
        async function getdata(){
            const res = axios.get('http://localhost:4000/products');
            return res;
        }
        getdata().then((res) => setProducts(res.data));
        getdata().catch((err) => console.log(err));
    },[]);
 return(
  <div>
    {
      products.map((product, index) => {
        return(
          <div className="grid" key={index}>
        <ListProducts products={product} />
        </div>
        );
      })
    }
    
  </div>
 )
}

export default RenderShop;
