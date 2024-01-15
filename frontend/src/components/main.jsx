import React from "react";
import { Route, Routes } from "react-router-dom";
import RenderShop from "./products";
import Header from "./navBar";
import AddProduct from "./Add-product";
import EditProduct from "./edit";
import Cart from "./cart";
import DetailProduct from "./DetailProduct";
import Admin from "./admin";
import Orders from "./order";

function Main() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<RenderShop />} />
        <Route path="/product-detail/:id" element={<DetailProduct />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Orders />} />
      </Routes>
    </div>
  );
}
export default Main;
