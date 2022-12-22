import React from "react";

function ListProducts(products){
    console.log(products);
    return (
        <div className="grid">
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
        </div>
      );
}

function RenderShop(props) {
  const { products } = props;

  if(products !== null || products !== undefined ) {
    return(<div>
        {<ListProducts products={products} />}
    </div>);
  }
  else{
    return(
    <div>
        Page not undefined
    </div>
    );
  }
}

export default RenderShop;
