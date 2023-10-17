import React, { useEffect, useState } from "react";
import queryString from "query-string";
import ProductAPI from "../API/ProductAPI";
import Pagination from "./Component/Pagination";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

function Products(props) {
  const [products, setProducts] = useState([]);
  const [temp, setTemp] = useState([]);
  const [total, setTotal] = useState([]);
  const [results, setResults] = useState('');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDeleteId, setProductToDeleteId] = useState("");

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleDeleteClick = (productId) => {
    setProductToDeleteId(productId);
    toggleDeleteModal();
  };

  const confirmDelete = async () => {
    const deleteproduct = await ProductAPI.delete(productToDeleteId);
    // Sau khi xóa thành công, bạn có thể cập nhật lại danh sách sản phẩm hoặc thực hiện các tương tác khác
    toggleDeleteModal();
  };

  const [pagination, setPagination] = useState({
    page: "1",
    count: "8",
    search: "",
    category: "all",
  });

  const onChangeText = (e) => {
    const value = e.target.value;
    if (!value) {
      setProducts(temp);
      return;
    }
    const searchProducts = temp.filter(
      (item) => item.name.toUpperCase().indexOf(value.toUpperCase()) !== -1
    );
    setProducts(searchProducts);
  };

  //Tổng số trang
  const [totalPage, setTotalPage] = useState();

  //Hàm này dùng để thay đổi state pagination.page
  //Nó sẽ truyền xuống Component con và nhận dữ liệu từ Component con truyền lên
  const handlerChangePage = (value) => {
    console.log("value", value);
    setPagination({
      page: value,
      count: pagination.count,
      category: pagination.category,
    });
  };

  useEffect(() => {
    const fetchAllData = async () => {
      // Nếu mà category === 'all' thì nó sẽ gọi hàm get tất cả sản phẩm
      // Ngược lại thì nó sẽ gọi hàm pagination và phân loại sản phẩm
      const params = {
        page: pagination.page,
        count: pagination.count,
        search: pagination.search,
        category: pagination.category,
      };

      const query = queryString.stringify(params);

      const newQuery = "?" + query;

      const products = await ProductAPI.getPagination(newQuery);
      setProducts(products.data.products);
      setTemp(products.data.products);
      setResults(products.data.totalCount)
      console.log(products);
      // setPagination.page(products)

      //Tính tổng số trang = tổng số sản phẩm / số lượng sản phẩm 1 trang

      const totalPa = Math.ceil(
        parseInt(products.data.products.length) / parseInt(pagination.count)
      ) + 1;
      setTotalPage(totalPa);
    };
    fetchAllData();
  }, [pagination]);
  console.log(totalPage);

  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center">
            <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">
              Basic Initialisation
            </h4>
            <div className="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb m-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="/" className="text-muted">
                      Home
                    </a>
                  </li>
                  <li
                    className="breadcrumb-item text-muted active"
                    aria-current="page"
                  >
                    Table
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Products</h4>
                <div className="d-flex justify-content-between">
                  <input
                    className="form-control w-25"
                    onChange={onChangeText}
                    type="text"
                    placeholder="Enter Search!"
                  />
                  <a
                    href={"/new"}
                    style={{ cursor: "pointer", color: "white" }}
                    className="btn btn-success"
                  >
                    Create Product
                  </a>
                </div>

                <br />
                <div className="table-responsive">
                  <table className="table table-striped table-bordered no-wrap">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Category</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products &&
                        products?.map((value) => (
                          <tr key={value._id}>
                            <td>{value._id}</td>
                            <td>{value.name}</td>
                            <td>{value.price}</td>
                            <td>
                              {value.img1.startsWith("http") ? (
                                <img
                                  src={value.img1}
                                  style={{ height: "60px", width: "60px" }}
                                  alt=""
                                />
                              ) : (
                                <img
                                  src={`http://localhost:5001/${value.img1}`}
                                  style={{ height: "60px", width: "60px" }}
                                  alt=""
                                />
                              )}
                            </td>
                            <td>{value.category}</td>
                            <td>
                              <a
                                href={`/products/view-edit/${value._id}`}
                                style={{ cursor: "pointer", color: "white" }}
                                className="btn btn-success"
                              >
                                Update
                              </a>
                              &nbsp;
                              <a
                                onClick={() => handleDeleteClick(value._id)} // Sử dụng hàm xử lý xóa khi nhấp vào nút "Delete"
                                style={{
                                  cursor: "pointer",
                                  color: "white",
                                }}
                                className="btn btn-danger"
                              >
                                Delete
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <Pagination
                    pagination={pagination}
                    handlerChangePage={handlerChangePage}
                    totalPage={totalPage}
                    results={results}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isDeleteModalOpen} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Confirm Delete</ModalHeader>
        <ModalBody>Are you sure you want to delete this product?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={confirmDelete}>
            Delete
          </Button>
          <Button color="secondary" onClick={toggleDeleteModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <footer className="footer text-center text-muted">
        All Rights Reserved by Adminmart. Designed and Developed by{" "}
        <a href="https://www.facebook.com/KimTien.9920/">Tiền Kim</a>.
      </footer>
    </div>
  );
}

export default Products;
