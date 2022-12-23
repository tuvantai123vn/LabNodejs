import React, { useState } from "react";



const Add_product = () => {
    const {title, setTitle} = useState();
const {imageUrl, setImageUrl} = useState();
const {price, setPrice} = useState();
const {description, setDescription} = useState();


const submitForm = (value) => {
    value.preventDefault();
    const newProduct = {
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description
    }
    console.log(newProduct);
}

const onChangTitle = (e) => {
    setTitle(e.target.value);

}
const onChangImageUrl = (e) => {
    setImageUrl(e.target.value);

}
const onChangPrice = (e) => {
    setPrice(e.target.value);

}
const onChangDescription = (e) => {
    setDescription(e.target.value);

}
    return(
        <div>
            <form className="product-form" onSubmit={submitForm}>
                <div className="form-control">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" onChange={onChangTitle}/>
                    <label htmlFor="imageUrl">ImageUrl</label>
                    <input type="text" name="imageUrl" id="imageUrl" onChange={onChangImageUrl}/>
                    <label htmlFor="price">Price</label>
                    <input type="text" name="price" id="price" onChange={onChangPrice}/>
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" onChange={onChangDescription}/>
                </div>
                <button className="btn" type="submit">Add Product</button>
            </form>
        </div>
    );
}
export default Add_product;