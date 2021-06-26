import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Rating from "../../components/ratings/ratings.component";
import {Link} from "react-router-dom";
import { detailsProduct } from "../../redux/actions/productActions.js";
import MessageBox from '../../components/messagebox/messagebox';
import LoadingBox from '../../components/loadingbox/loadingbox';


export default function ProductScreen(props) {

  const dispatch = useDispatch(); 
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1)
  const productDetails = useSelector( state => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId))
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  }

    return (
        <div className="product-screen">
        {loading? (<LoadingBox></LoadingBox>)
        :
        error?(<MessageBox variant="danger">{error}</MessageBox>)
        :
        (
            <div>
        <Link to="/">Back to Result</Link>
           <div className="row top">
            <div className="product-screen-spacing col-2">
             <img className="large" src={product.image} alt={product.name}/>
            </div>
            <div className="product-screen-spacing col-1">
              <ul>
                  <li>
                      <h1>{product.name}</h1>
                  </li>
                  <li>
                      Price : ${product.price}
                  </li>
                  <li>
                     Description:
                      <p>{product.description}</p>
                  </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="cart-panel card card-body">
               <ul>
                   <li>
                       <div className="row">
                         <div>Price</div>
                         <div>${product.price}</div>
                       </div>
                   </li>
                   <li>
                       <div className="row">
                         <div>Status</div>
                         <div>
                         {product.countInStock>0? <span className="success">In Stock</span> :
                         <span className="danger">Unavailable</span>
                         }
                         </div>
                       </div>
                   </li>
                   { product.countInStock > 0 && (
                       <> 
                       <li>
                         <div className="row">
                            <div>Qty</div>
                            <div>
                              <select value={qty} onChange={(e)=> setQty(e.target.value)}>
                                {[...Array(product.countInStock).keys()].map(
                                  (x) => (
                                    <option 
                                    key={ x + 1 } 
                                    value={ x + 1 }>
                                    { x + 1 }
                                    </option>
                                  ))
                                }
                              </select>
                            </div>
                         </div>
                       </li>
                       <li>
                       <button 
                       onClick={addToCartHandler}
                       className="primary block">
                       Add to Cart
                       </button>
                      </li>
                       </>      
                     )
                   }  
               </ul>
              </div>
            </div>
           </div>
        </div>
        )
        }    
          </div>

       
    )
}
