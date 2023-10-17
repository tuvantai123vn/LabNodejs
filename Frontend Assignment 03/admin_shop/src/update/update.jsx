import React, { useState, useEffect } from "react";
import ProductAPI from "../API/ProductAPI";
import { Link, useParams } from "react-router-dom";

const Update = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    shortDescription: "",
    longDescription: "",
    price: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductAPI.getDetail(id);
        const productData = response.data;
        console.log(productData);
        setProduct({
          name: productData.name,
          category: productData.category,
          shortDescription: productData.short_desc,
          longDescription: productData.long_desc,
          price: productData.price,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", product.name);
      formData.append("category", product.category);
      formData.append("short_desc", product.shortDescription);
      formData.append("long_desc", product.longDescription);
      formData.append("price", product.price);

      const response = await ProductAPI.update(formData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <form
            style={{ width: "50%", marginLeft: "40px" }}
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Product Name"
                name="name"
                value={product.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Category"
                name="category"
                value={product.category}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Short Description</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Enter Short Description"
                name="shortDescription"
                value={product.shortDescription}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Long Description</label>
              <textarea
                className="form-control"
                rows="6"
                placeholder="Enter Long Description"
                name="longDescription"
                value={product.longDescription}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Price"
                name="price"
                value={product.price}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;
