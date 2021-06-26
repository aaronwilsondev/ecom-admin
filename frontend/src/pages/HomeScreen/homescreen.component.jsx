import React, { useEffect } from 'react'
import Product from "../../components/product/product.component";
import LoadingBox from '../../components/loadingbox/loadingbox';
import MessageBox from '../../components/messagebox/messagebox';
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../redux/actions/productActions";import HeroSection from '../../components/HeroSection/HeroSection';
import { useParams, Link } from 'react-router-dom';
;

export default function HomeScreen() {

const dispatch = useDispatch();
const productList = useSelector((state) => state.productList);
const { loading, error, products, page, pages } = productList;
const { pageNumber = 1 } = useParams();

useEffect(() => {
  const fetchData = async () =>{
     dispatch(listProducts({
       pageNumber
     }));
  };
  fetchData();
}, [dispatch, pageNumber])

    return (
      <div className="homescreen">
      <HeroSection/>
      {loading? (<LoadingBox></LoadingBox>)
      :
      error?(<MessageBox variant="danger">{error}</MessageBox>)
      :
      (
        <>
        {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
        <div className="shop-page row center bottom">
        {
          products
          .filter(product => product.countInStock > 0)
          .map(product => (
            <Product key={product._id} product={product}></Product>
          ))}         
        </div>
       </>
        )} 
        <div className="pagination row center">
            {
                [...Array(pages).keys()].map((x) => (
                   <Link 
                   className={
                       x+1 === page? 'active':''
                   }
                   key={x+1} 
                   to={`/pageNumber/${x+1}`}>
                      {x + 1}
                   </Link>
                ))
            }
        </div>   
        </div>
    )
}
