import React from "react";

function RenderShop(props) {
  const { products } = props;
  console.log(products);
  const listProducts = products.map((product, index) => {
    return (
      <div className="grid" key={index}>
        <article className="card product-item">
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
            <button className="btn">Add to Cart</button>
          </div>
        </article>
      </div>
    );
  });
  if(products !== undefined) {
    return <div>{listProducts}</div>;
  }
  else{
    <div>
        Page not undefined
    </div>
  }
}

export default RenderShop;
