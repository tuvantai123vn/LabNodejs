import React from "react";
import { useLocation, Link } from "react-router-dom";

function Header({ isAuthenticated }) {
  const location = useLocation();

  return (
    <header className="main-header">
      <nav className="main-header__nav">
        <ul className="main-header__item-list">
          <li className="main-header__item">
            <Link
              className={location.pathname === "/" ? "active" : ""}
              to="/"
            >
              Shop
            </Link>
          </li>
          <li className="main-header__item">
            <Link
              className={location.pathname === "/add-product" ? "active" : ""}
              to="/add-product"
            >
              Add Product
            </Link>
          </li>
          <li className="main-header__item">
            <Link
              className={location.pathname === "/cart" ? "active" : ""}
              to="/cart"
            >
              Cart
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li className="main-header__item">
                <Link
                  className={location.pathname === "/admin" ? "active" : ""}
                  to="/admin"
                >
                  Admin
                </Link>
              </li>
              <li className="main-header__item">
                <Link
                  className={location.pathname === "/order" ? "active" : ""}
                  to="/order"
                >
                  Order
                </Link>
              </li>
              <li className="main-header__item">
                <form action="/logout" method="post">
                  <button type="submit">Logout</button>
                </form>
              </li>
            </>
          ) : (
            <>
              <li className="main-header__item">
                <Link
                  className={location.pathname === "/login" ? "active" : ""}
                  to="/login"
                >
                  Login
                </Link>
              </li>
              <li className="main-header__item">
                <Link
                  className={location.pathname === "/signup" ? "active" : ""}
                  to="/signup"
                >
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
