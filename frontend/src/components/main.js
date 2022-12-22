import React, { useState } from "react";
import {Route, Routes } from 'react-router-dom';
import RenderShop from "./products";
import Header from "./navBar";
import Add_product from "./Add-product";
import axios from 'axios';
import { useEffect } from "react";

function Main(){
    const [products, setProducts] = useState([]);
    useEffect(() => {
        async function getdata(){
            const res = axios.get('http://localhost:4000/products');
            return res;
        }
        getdata().then((res) => setProducts(res));
        getdata().catch((err) => console.log(err));
    }, []);
    console.log(products);
    return(
        <div>
            <Header />
            <Routes>
                <Route path='/' element={<RenderShop products={products}/>}/>
                <Route exact path='/add-product' element={<Add_product/>} />
            </Routes>
        </div>
    );
}
export default Main;