import React from "react";
import {Route, Routes } from 'react-router-dom';
import RenderShop from "./products";
import Header from "./navBar";
import Add_product from "./Add-product";

function Main(){
    
    return(
        <div>
            <Header />
            <Routes>
                <Route path='/' element={<RenderShop/>}/>
                <Route path='/add-product' element={<Add_product/>} />
            </Routes>
        </div>
    );
}
export default Main;