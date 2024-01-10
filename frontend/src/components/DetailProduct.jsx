// DetailProduct.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import hook useParams

function DetailProduct() {
  const [product, setProduct] = useState(null);
  const { id } = useParams(); // Lấy giá trị từ đường dẫn

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(
          `http://localhost:4000/products/${id}`
        );
        setProduct(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }

    fetchProduct();
  }, [id]); // Thêm id vào dependency array

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="img-fluid"
          />
        </div>
        <div className="col-md-6">
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p className="font-weight-bold">Price: {product.price}</p>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
