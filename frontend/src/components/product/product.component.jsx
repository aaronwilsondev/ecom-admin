import React from "react";
import { Link } from "react-router-dom";

export default function Product(props){

const {product} = props

    return(
       
            <div key={product._id} className="card">
            <Link to={`/product/${product._id}`}>
               <img className="medium shadow" 
               src={product.image}
               alt={product.name}/>
            </Link>
            <div className="card-body">
              <Link className="product-title" to={`/product/${product._id}`}>
                <h2>{product.name}</h2>
              </Link>
              <h2>{product.size}</h2>
              <div className="price">
                ${product.price}
              </div>
            </div>
          </div>
        
    )
}