import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    imageUrl: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/products/${id}`
        );
        const productData = response.data;
        setProduct(productData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [id]);

  const { title, imageUrl, price, description } = product;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const submitForm = async (event) => {
    event.preventDefault();

    const updatedProduct = {
      title,
      imageUrl,
      price,
      description,
    };

    try {
      const response = await axios.patch(
        `http://localhost:4000/products/${id}`,
        updatedProduct
      );
      const updatedProductData = response.data;
      console.log("Success:", updatedProductData);
      // Redirect to the product detail page or any other page
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form className="product-form" onSubmit={submitForm}>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleInputChange}
          />
          <label htmlFor="imageUrl">ImageUrl</label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            value={imageUrl}
            onChange={handleInputChange}
          />
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            id="price"
            value={price}
            onChange={handleInputChange}
          />
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={handleInputChange}
          />
        </div>
        <button className="btn" type="submit">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
