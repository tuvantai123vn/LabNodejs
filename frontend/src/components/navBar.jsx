import React from "react";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  return (
    <header className="main-header">
      <nav className="main-header__nav">
        <ul className="main-header__item-list">
          <li className="main-header__item">
            <a className={location.pathname === "/" ? "active" : ""} href="/">
              Shop
            </a>
          </li>
          <li className="main-header__item">
            <a
              className={location.pathname === "/add-product" ? "active" : ""}
              href="/add-product"
            >
              Add Product
            </a>
          </li>
          <li className="main-header__item">
            <a
              className={location.pathname === "/cart" ? "active" : ""}
              href="/cart"
            >
              Cart
            </a>
          </li>
          <li className="main-header__item">
            <a
              className={location.pathname === "/admin" ? "active" : ""}
              href="/admin"
            >
              Admin
            </a>
          </li>
          <li className="main-header__item">
            <a
              className={location.pathname === "/order" ? "active" : ""}
              href="/order"
            >
              Order
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
