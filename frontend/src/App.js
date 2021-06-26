import React, { useEffect, useState } from "react";
import './index.css';

import {BrowserRouter, Link, Route} from "react-router-dom";
import ProductScreen from "./pages/ProductScreen/productscreen.component.jsx";
import HomeScreen from "./pages/HomeScreen/homescreen.component";
import CartScreen from "./pages/CartScreen/cartscreen";
import { useDispatch, useSelector } from "react-redux";
import SignInScreen from "./pages/SignInScreen/SignInScreen";
import { signout } from "./redux/actions/userActions";
import RegisterScreen from "./pages/RegisterScreen/RegisterScreen";
import ShippingAddressScreen from "./pages/ShippingAddressScreen/ShippingAddressScreen";
import PaymentMethodScreen from "./pages/PaymentMethodScreen/PaymentMethodScreen";
import PlaceOrderScreen from "./pages/PlaceOrderScreen/PlaceOrderScreen";
import OrderScreen from "./pages/OrderScreen/OrderScreen";
import OrderHistoryScreen from "./pages/OrderHistoryScreen/OrderHistoryScreen";
import ProfileScreen from "./pages/ProfileScreen/ProfileScreen";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import ProductListScreen from "./pages/ProductListScreen/ProductListScreen";
import ProductEditScreen from "./pages/ProductEditScreen/ProductEditScreen";
import OrderListScreen from "./pages/OrderListScreen/OrderListScreen";
import UserListScreen from "./pages/UserListScreen/UserListScreen";
import UserEditScreen from "./pages/UserEditScreen/UserEditScreen";
import AboutScreen from "./pages/AboutScreen/AboutScreen";
import SearchBox from "./components/SearchBox/SearchBox";
import SearchScreen from "./pages/SearchScreen/SearchScreen";
import { listProductsCategories, listProductsSizes } from "./redux/actions/productActions";
import MessageBox from "./components/messagebox/messagebox";
import LoadingBox from "./components/loadingbox/loadingbox";
import ContactUsScreen from "./pages/ContactUsScreen/ContactUsScreen";
import DashboardScreen from "./pages/DashboardScreen/DashboardScreen";
import Logo from "./assets/Shape-3-white.svg";

import Media from "react-media";


function App() {

  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const {cartItems} = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
      loading: loadingCategory, 
      error: errorCategory, 
      categories
  } = productCategoryList;

  const signoutHandler = () => {
     dispatch(signout());
  };

  useEffect(() => {
    dispatch(listProductsCategories());
    dispatch(listProductsSizes());
  }, [dispatch]);

  const currentYear= new Date().getFullYear();

  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="row">
        <div className="row">
        <button
        type="button hamburger"
        className="open-sidebar"
        onClick={() => setSidebarIsOpen(true)}
        >
          <i className="fa fa-bars"></i>
        </button>
          <div className="logo-container">
            <Link className="brand" to="/" alt="home"><img className="logo" src={Logo} alt="logo"></img></Link>
          </div>
        </div>
        <div>
          <Route 
          render={({history}) => <SearchBox className="search-box" history={history}></SearchBox>} 
          >
          </Route>
        </div>

<Media query="(min-width: 700px)">
  {
    (matches) => {
      return matches ? (
        <div>
          <Link to="/cart"><i class="fas fa-shopping-cart"></i>
          {
            cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )
          }
          </Link>
          <Link to="/about">
             About
          </Link>
          {
            userInfo ? (
              <div className="dropdown">
              <Link to="#"><i class="far fa-user"></i> <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content">
               <li>
                 <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
               </li>
               <li>
                 <Link to="/profile">User</Link>
               </li>
               <li>
                 <Link to="/orderhistory">OrderHistory</Link>
               </li>
              </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )
          }
          <Link to="/contact">
          <i class="far fa-envelope"></i>
          </Link>
          {
            userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">Admin {' '} <i className="fa fa-caret-down"></i></Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )
          }
        </div>
      ) : ""
    }
  }
</Media>

        
      </header>
      <aside className={sidebarIsOpen? 'open' : ''}>
          <ul className="categories">
            <li>
            <Link className="aside-link" to="/cart"><strong>Cart</strong>
          {
            cartItems.length > 0 && (
              <span className="badge inverted">{cartItems.length}</span>
            )
          }
          </Link>
          <button
               onClick={() => setSidebarIsOpen(false)}
               className="close-sidebar"
               type="button"
               >
                 <i className="fas fa-window-close"></i>
               </button>
            </li>
            <li >
            <Link className="aside-link link-uline" to="/about">
             About
          </Link>
            </li>
            
          
            {
            userInfo ? (
              <li>
              <div className="dropdown"> 
              <Link className="aside-link"  to="#"><i class="far fa-user"></i> <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content invert">
               <li>
                 <Link className="invert-aside-link" to="#signout" onClick={signoutHandler}>Sign Out</Link>
               </li>
               <li>
                 <Link className="invert-aside-link" to="/profile">User</Link>
               </li>
               <li>
                 <Link className="invert-aside-link" to="/orderhistory">Order History</Link>
               </li>
              </ul>
              </div>
              </li>
            ) : (
              <li>
              <Link className="aside-link"  to="/signin">Sign In</Link>
              </li>
            )
          }
          <li>
          <Link className="aside-link"  to="/contact">
          <i class="far fa-envelope"></i>
          </Link>
          </li>
          
          {
            userInfo && userInfo.isAdmin && (
              <li>
              <div className="dropdown">
                <Link className="aside-link"  to="#admin">Admin {' '} <i className="fa fa-caret-down"></i></Link>
                <ul className="dropdown-content invert">
                  <li>
                    <Link className="invert-aside-link" to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link className="invert-aside-link" to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link className="invert-aside-link" to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link className="invert-aside-link" to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
              </li>
            ) 
          }
          




             <li>
               <strong>Categories</strong>
             </li>
             {    loadingCategory? (<LoadingBox></LoadingBox>)
                  :
                  errorCategory? (<MessageBox variant="danger">{errorCategory}</MessageBox>)
                  :
                  (
                    categories.map((c) => (
                      <li key={c}>
                         <Link 
                         className="aside-li"
                         to={`/search/category/${c}`}
                         onClick={() => setSidebarIsOpen(false)}>
                            {c}
                         </Link>
                      </li>
                    ))
                  )}
          </ul>
      </aside>
      <main className="main">
      <Route path="/cart/:id?" component={CartScreen} exact></Route>
      <Route path="/about" component={AboutScreen}></Route>
      <Route path="/product/:id" component={ProductScreen} exact></Route>
      <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
      <Route path="/signin" component={SignInScreen}></Route>
      <Route path="/contact" component={ContactUsScreen}></Route>
      <Route path="/register" component={RegisterScreen}></Route>
      <Route path="/shipping" component={ShippingAddressScreen}></Route>
      <Route path="/payment" component={PaymentMethodScreen}></Route>
      <Route path="/placeorder" component={PlaceOrderScreen}></Route>
      <Route path="/order/:id" component={OrderScreen}></Route>
      <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
      <Route path="/search/name/:name?" component={SearchScreen} exact></Route>
      <Route path="/search/category/:category" component={SearchScreen} exact></Route>
      <Route path="/search/size/:size" component={SearchScreen} exact></Route>
      <Route path="/search/category/:category/size/:size/name/:name/pageNumber/:pageNumber" component={SearchScreen} exact></Route>

      <PrivateRoute 
      path="/profile"
      component={ProfileScreen}>
       </PrivateRoute>

       <AdminRoute
       path="/productlist"
       component={ProductListScreen}
       exact>
      
       </AdminRoute>
       <AdminRoute
       path="/productlist/pageNumber/:pageNumber"
       component={ProductListScreen}
       exact>
       </AdminRoute>

       <AdminRoute
       path="/orderlist"
       component={OrderListScreen}>
       </AdminRoute>
       <AdminRoute
       path="/userlist"
       component={UserListScreen}>
       </AdminRoute>
       <AdminRoute
       path="/user/:id/edit"
       component={UserEditScreen}>
       </AdminRoute>
       <AdminRoute
       path="/dashboard"
       component={DashboardScreen}>
       </AdminRoute>
      <Route path="/" component={HomeScreen} exact></Route>
      <Route path="/pageNumber/:pageNumber" component={HomeScreen} exact></Route>
      </main>
      <footer className="row center column">
         <div className="icons">
           <Link className="f-icon">
             <i className="fa-2x social-icon fab fa-twitter"></i>
           </Link>
           <Link className="f-icon">
             <i className=" fa-2x social-icon fab fa-facebook"></i>
           </Link>
           <Link className="f-icon">
             <i className="fa-2x social-icon fab fa-instagram"></i>
           </Link>
           <Link className="f-icon">
             <i className="fa-2x social-icon fas fa-envelope"></i>
           </Link>
         </div>
         <p className="copyright">© copyright {currentYear} Emsi's Fluid Acrylics</p>
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
