import React, { useState, useEffect } from "react";
import UserAPI from "../API/UserAPI";
import ProductAPI from "../API/ProductAPI";
import HistoryAPI from "../API/HistoryAPI";

function Home(props) {
  const [users, setUsers] = useState([]);
  const [product, setProduct] = useState([]);
  const [order, setOrder] = useState([]);
  const date = new Date();

  console.log('props', props);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  useEffect(async () => {
    const response = await UserAPI.getAllData();
    setUsers(response.data);
  }, [props.role]);

  useEffect(async () => {
    const products = await ProductAPI.getAPI();
    setProduct(products.data.products);
  }, [props.role]);

  useEffect(async () => {
    const response = await HistoryAPI.getAll();
    setOrder(response.data);
  }, [props.role]);
  const total = () => {
    let avg = 0;
    order.map((item) => {
      avg += item.total;
    });
    return avg/date.getMonth();
  };
  const avg = total();

  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center">
            <h3 className="page-title text-truncate text-dark font-weight-medium mb-1">
              Good Morning Jason!
            </h3>
            <div className="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb m-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">Dashboard</a>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="card-group">
          <div className="card border-right">
            <div className="card-body">
              <div className="d-flex d-lg-flex d-md-block align-items-center">
                <div>
                  <div className="d-inline-flex align-items-center">
                    <h2 className="text-dark mb-1 font-weight-medium">
                      {users.length}
                    </h2>
                    <span className="badge bg-primary font-12 text-white font-weight-medium badge-pill ml-2 d-lg-block d-md-none">
                      +18.33%
                    </span>
                  </div>
                  <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                    New Clients
                  </h6>
                </div>
                <div className="ml-auto mt-md-3 mt-lg-0">
                  <span className="opacity-7 text-muted">
                    <i data-feather="user-plus"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="card border-right">
            <div className="card-body">
              <div className="d-flex d-lg-flex d-md-block align-items-center">
                <div>
                  <h2 className="text-dark mb-1 w-100 text-truncate font-weight-medium">
                    <sup className="set-doller">$</sup>
                    {formatCurrency(avg)}
                  </h2>
                  <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                    Earnings of Month
                  </h6>
                </div>
                <div className="ml-auto mt-md-3 mt-lg-0">
                  <span className="opacity-7 text-muted">
                    <i data-feather="dollar-sign"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="card border-right">
            <div className="card-body">
              <div className="d-flex d-lg-flex d-md-block align-items-center">
                <div>
                  <div className="d-inline-flex align-items-center">
                    <h2 className="text-dark mb-1 font-weight-medium">3</h2>
                    <span className="badge bg-danger font-12 text-white font-weight-medium badge-pill ml-2 d-md-none d-lg-block">
                      -18.33%
                    </span>
                  </div>
                  <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                    New Projects
                  </h6>
                </div>
                <div className="ml-auto mt-md-3 mt-lg-0">
                  <span className="opacity-7 text-muted">
                    <i data-feather="file-plus"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="d-flex d-lg-flex d-md-block align-items-center">
                <div>
                  <h2 className="text-dark mb-1 font-weight-medium">
                    {product.length}
                  </h2>
                  <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                    Projects
                  </h6>
                </div>
                <div className="ml-auto mt-md-3 mt-lg-0">
                  <span className="opacity-7 text-muted">
                    <i data-feather="globe"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">History</h4>
                <br />
                <div className="table-responsive">
                  <table className="table table-striped table-bordered no-wrap">
                    <thead>
                      <tr>
                        <th>ID User</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Total</th>
                        <th>Delivery</th>
                        <th>Status</th>
                        <th>Detail</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order &&
                        order.map((value) => (
                          <tr key={value._id}>
                            <td>{value.user._id}</td>
                            <td>{value.user.fullName}</td>
                            <td>{value.phone}</td>
                            <td>{value.address}</td>
                            <td>{value.total}</td>
                            <td>
                              {value.delivery
                                ? "Đã Vận Chuyển"
                                : "Chưa Vận Chuyển"}
                            </td>
                            <td>
                              {value.status
                                ? "Đã Thanh Toán"
                                : "Chưa Thanh Toán"}
                            </td>
                            <td>
                              <a
                                style={{
                                  cursor: "pointer",
                                  color: "white",
                                }}
                                className="btn btn-success"
                                href={`http://localhost:3001/history/${value._id}`}
                              >
                                View
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <footer className="footer text-center text-muted">
        All Rights Reserved by Adminmart. Designed and Developed by{" "}
        <a href="#">Nguyễn Thanh Tú</a>.
      </footer>
    </div>
  );
}

export default Home;
