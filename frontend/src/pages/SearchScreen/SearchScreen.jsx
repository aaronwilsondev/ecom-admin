import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import LoadingBox from '../../components/loadingbox/loadingbox';
import MessageBox from '../../components/messagebox/messagebox';
import Product from '../../components/product/product.component';
import { listProducts } from '../../redux/actions/productActions';

export default function SearchScreen(props) {

    const [categoryDrop, setCategoryDrop] = useState(false);
    const [sizeDrop, setSizeDrop] = useState(false);

    const dispatch = useDispatch();

    const {
        name = "all", 
        category = 'all',
        pageNumber = 1,
        size = "all",
    } = useParams();

    const productList = useSelector((state) => state.productList);
    const {loading, error, products, page, pages} = productList;

    const productCategoryList = useSelector((state) => state.productCategoryList);
    const {
        loading: loadingCategory, 
        error: errorCategory, 
        categories
    } = productCategoryList;

    const productSizeList = useSelector((state) => state.productSizeList);
    const {
        loading: loadingSizes, 
        error: errorSizes, 
        sizes
    } = productSizeList;

useEffect(() => {
    dispatch(listProducts({
        pageNumber,
        name: name !== "all" ? name: "",
        size: size !== "all" ? size: "",
        category: category !== "all" ? category: "",
        
    }));
    
}, [dispatch, name, category, pageNumber, size]);

const handleCategoryDrop = () => {
    setCategoryDrop(!categoryDrop);
};

const handleSizeDrop = () => {
    setSizeDrop(!sizeDrop)
}

const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterCategory = filter.category || category;
    const filterSize = filter.size || size;
    const filterName = filter.name || name;
    return `/search/category/${filterCategory}/size/${filterSize}/name/${filterName}/pageNumber/${filterPage}`;
   
}
    
    return (
      <div className="search-page">
        <div className="row">
            {loading? (<LoadingBox></LoadingBox>)
            :
            error? (<MessageBox variant="danger">{error}</MessageBox>)
            :
            (
                <div>
                    {products.length} Results
                </div>
            )}
        </div>
        <div className="row top">
            <div className="col-1">
             <div>
              <h3
              className="filter-title"
              onClick={handleCategoryDrop}
              >Categories 
              <i className={ categoryDrop?"fas fa-angle-up" : "fas fa-angle-down"}></i>
              </h3>
            
               {loadingCategory? (<LoadingBox></LoadingBox>)
                  :
                  errorCategory? (<MessageBox variant="danger">{errorCategory}</MessageBox>)
                  :
                  categoryDrop?
                  (
                    <ul>
                       {categories.map((c) => (
                           <li className="filter-links" key={c}>
                                <Link 
                                to={getFilterUrl({
                                    category: category === c ? "all" : c
                                    })}
                                className={c === category? 'active' : ''}
                                >
                                    {c}
                                </Link>
                           </li>
                           
                       ))}
                    </ul>
                 )
                 :
                 null}    
             </div>
             <div>
                 <h3
                 className="filter-title"
                 onClick={handleSizeDrop}
                 >Size
                 <i className={ sizeDrop?"fas fa-angle-up" : "fas fa-angle-down"}></i>
                 </h3>
                 {loadingSizes? (<LoadingBox></LoadingBox>)
                  :
                  errorSizes? (<MessageBox variant="danger">{errorSizes}</MessageBox>)
                  :
                  sizeDrop?
                  (
                    <ul>
                       {sizes.map((s) => (
                           <li className="filter-links" key={s}>
                                <Link 
                                to={getFilterUrl({
                                    size: size === s? "all" : s
                                    })}
                                className={s === size? 'active' : ''}
                                >
                                    {s}
                                </Link>
                           </li>
                       ))}
                    </ul>
                 )
                 :
                 null} 

             </div>
          </div>
        </div>
        <div className="col-3">
           {loading? (<LoadingBox></LoadingBox>)
            :
            error? (<MessageBox variant="danger">{error}</MessageBox>)
            :
            (
                <>
        {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
        <div className="shop-page row center bottom">
        {
          products.map(product => (
            <Product key={product._id} product={product}></Product>
          ))}         
        </div>
        <div className="pagination row center">
            {
                [...Array(pages).keys()].map((x) => (
                   <Link 
                   className={
                       x+1 === page? 'active':''
                   }
                   key={x+1} 
                   to={getFilterUrl({
                       page: x + 1
                   })}>
                      {x + 1}
                   </Link>
                ))
            }
        </div>
       </>
            )}
        </div>
      </div>
    )
}
