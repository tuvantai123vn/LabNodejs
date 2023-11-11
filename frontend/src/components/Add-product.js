import React, { useState } from "react";

const Add_product = () => {
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');


const submitForm = (value) => {
    value.preventDefault();
    const newProduct = {
        title,
        imageUrl,
        price,
        description
    }
      fetch('http://localhost:4000/add-products', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
        mode: 'cors'
      })
        .then((response) => response.json())
        .then((newProduct) => {
          window.location = 'http://localhost:3000';
          console.log('Success:', newProduct);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    return(
        <div>
            <form className="product-form" onSubmit={submitForm}>
                <div className="form-control">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <label htmlFor="imageUrl">ImageUrl</label>
                    <input type="text" name="imageUrl" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/>
                    <label htmlFor="price">Price</label>
                    <input type="text" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)}/>
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <button className="btn" type="submit">Add Product</button>
            </form>
        </div>
    );
}
export default Add_product;