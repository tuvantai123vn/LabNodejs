import React, { useState } from "react";
import ProductAPI from "../API/ProductAPI";
import { useHistory } from "react-router-dom";

const NewProduct = () => {
  const history = useHistory();
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageSelection = (event) => {
    setSelectedImages(Array.from(event.target.files));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { productName, category, shortDescription, longDescription, price } = event.target.elements;

      const formData = new FormData();
      formData.append("name", productName.value);
      formData.append("category", category.value);
      formData.append("short_desc", shortDescription.value);
      formData.append("long_desc", longDescription.value);
      formData.append("price", price.value);

      selectedImages.forEach((image) => {
        formData.append("image", image, image.name);
      });

      const response = await ProductAPI.postNewProduct(formData);
      console.log(response); //nếu thành công dùng react router dom chuyển về trang /products
      history.push("/products");
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
                name="productName"
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Category"
                name="category"
              />
            </div>
            <div className="form-group">
              <label>Short Description</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Enter Short Description"
                name="shortDescription"
              ></textarea>
            </div>
            <div className="form-group">
              <label>Long Description</label>
              <textarea
                className="form-control"
                rows="6"
                placeholder="Enter Long Description"
                name="longDescription"
              ></textarea>
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Price"
                name="price"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlFile1">
                Upload image (4 images)
              </label>
              <input
                type="file"
                className="form-control-file"
                id="exampleFormControlFile1"
                name="images"
                multiple={true}
                onChange={handleImageSelection}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
