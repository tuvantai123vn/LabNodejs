import React from "react";


function Add_product(){
    return(
        <div>
            <form className="product-form" action="/admin/add-product" method="POST">
                <div className="form-control">
                    <label for="title">Title</label>
                    <input type="text" name="title" id="title"/>
                </div>
                <button className="btn" type="submit">Add Product</button>
            </form>
        </div>
    );
}
export default Add_product;