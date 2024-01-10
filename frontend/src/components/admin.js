import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:4000/products");
        setProducts(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const handleProductDetail = (id) => {
    navigate(`/product-detail/${id}`);
  };

  const handleEditCart = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const handleDeleteProduct = (id) => {
    // Set selectedProductId for confirmation
    setSelectedProductId(id);
  };

  const handleConfirmDelete = async () => {
    try {
      // Perform delete operation
      await axios.delete(`http://localhost:4000/admin/${selectedProductId}`);

      // Refetch products after deletion
      const response = await axios.get("http://localhost:4000/products");
      setProducts(response.data);

      // Reset selectedProductId
      setSelectedProductId(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };


  const handleCancelDelete = () => {
      setSelectedProductId(null);
  };
  

  const groupedProducts = Array.from(
    { length: Math.ceil(products.length / 4) },
    (_, index) => products.slice(index * 4, (index + 1) * 4)
  );

  return (
    <div>
      {groupedProducts.map((row, rowIndex) => (
        <div key={rowIndex} className="grid">
          {row.map((product, index) => (
            <div key={index} className="card product-item">
              {/* ... (existing code) ... */}
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
                <button
                  className="btn"
                  onClick={() => handleProductDetail(product._id)}
                >
                  Detail
                </button>
                <button
                  className="btn"
                  onClick={() => handleEditCart(product._id)}
                >
                  Edit Cart
                </button>
                <button
                  className="btn btn-primary" // Use Bootstrap class for styling
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Confirm Deletion
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleCancelDelete}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this product?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleCancelDelete}
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={handleConfirmDelete}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
