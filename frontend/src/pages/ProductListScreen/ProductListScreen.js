import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom';
import LoadingBox from '../../components/loadingbox/loadingbox';
import MessageBox from '../../components/messagebox/messagebox';
import { createProduct, deleteProduct, listProducts } from '../../redux/actions/productActions';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../../redux/constants/productConstants';

export default function ProductListScreen(props) {

    const {
        pageNumber = 1
    } = useParams();

const productList = useSelector((state) => state.productList);
const { loading, error, products, page, pages } = productList;
const dispatch = useDispatch();

const productCreate = useSelector((state) => state.productCreate);
const { 
    loading: loadingCreate, 
    error: errorCreate, 
    success: successCreate, 
    product: createdProduct 
} = productCreate

const productDelete = useSelector((state) => state.productDelete);
const { 
    loading: loadingDelete, 
    error: errorDelete, 
    success: successDelete 
} = productDelete;

useEffect(() => {
    if(successCreate) {
        dispatch({
            type: PRODUCT_CREATE_RESET
        });
        props.history.push(`/product/${createdProduct._id}/edit`);
    }
    if(successDelete) {
        dispatch({
            type: PRODUCT_DELETE_RESET
        })
    }
    dispatch(listProducts({
        pageNumber
    }));
}, [dispatch, createdProduct, props.history, successCreate, successDelete, pageNumber]);


const deleteHandler = (product) => {
    if(window.confirm('are you sure you want to delete?')){
        dispatch(deleteProduct(product._id));
    }
}

const createHandler = () => {
    dispatch(createProduct());
}

    return (
        <div className="screen">
           <div className="row">
            <h1>Products</h1>
            <button
            type="button"
            className="primary"
            onClick={createHandler}
            >Create Product</button>
           </div>

             { loadingDelete && <LoadingBox></LoadingBox> }
             { errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox> }

             { loadingCreate && <LoadingBox></LoadingBox> }
             { errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox> }

             {
                 loading? (<LoadingBox></LoadingBox>)
                 :
                 error? (<MessageBox variant="danger">{error}</MessageBox>)
                 :
                 ( <>
                 
                     <table className="table" >
                     <thead>
                         <tr>
                             <th>ID</th>
                             <th>NAME</th>
                             <th>PRICE</th>
                             <th>CATEGORY</th>
                             <th>SIZE</th>
                             <th>ACTIONS</th>
                         </tr>
                     </thead>
                     <tbody>
                         {
                             products.map((product) => (
                                 <tr key={product._id}>
                                     <td>{product._id}</td>
                                     <td>{product.name}</td>
                                     <td>{product.price}</td>
                                     <td>{product.category}</td>
                                     <td>{product.size}</td>
                                     <td>
                                         <button 
                                         type="button" 
                                         className="small invert"
                                         onClick={() => props.history.push(`/product/${product._id}/edit`)}
                                         >
                                          Edit
                                         </button>
                                         <button
                                         type="button" 
                                         className="small invert"
                                         onClick={() => deleteHandler(product)}
                                         >
                                          <i className="fas fa-window-close"></i>
                                         </button>
                                     </td>
                                 </tr>
                             ))}
                     </tbody>
                 </table>
                 <div className="pagination row center">
                   {[...Array(pages).keys()].map((x) => (
                    <Link 
                     className={ x+1 === page? 'active':'' }
                     key={x+1} 
                     to={`/productlist/pageNumber/${x+1}`}
                     >
                      {x + 1}
                    </Link>
                ))}
             </div>
            </>
                 )}
        </div>
    );
}
