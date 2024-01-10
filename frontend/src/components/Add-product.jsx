import React, { useState } from "react";
import axios from 'axios';

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: '',
    imageUrl: '',
    price : '',
    description: ''
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const submitForm = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/products', product);
      console.log('Success:', response.data);
      window.location = 'http://localhost:3000';
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form className="product-form" onSubmit={submitForm}>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" value={product.title} onChange={handleChange} />
          <label htmlFor="imageUrl">ImageUrl</label>
          <input type="text" name="imageUrl" id="imageUrl" value={product.imageUrl} onChange={handleChange} />
          <label htmlFor="price">Price</label>
          <input type="text" name="price" id="price" value={product.price} onChange={handleChange} />
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" value={product.description} onChange={handleChange} />
        </div>
        <button className="btn" type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
