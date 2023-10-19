import React, { useContext, useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/images/freshcart-logo.svg'
// import { CounterContext } from '../../Context/CounterContext'; 
import { UserContext } from '../../Context/UserContext';
import Profile from './../Profile/Profile';
import { CartContext } from '../../Context/CartContextt';
import { date } from 'yup';

export default function Navbar() {
  // let {counter} = useContext(CounterContext);
  let {userToken , serUserToken} = useContext(UserContext);
  let navigate = useNavigate();

  let {getLoggedUserCart , numOfCartItems} =useContext(CartContext);
  

  async function cart(){
    await getLoggedUserCart()
    // console.log(data);
    // setNumOfCartItems(data?.numOfCartItems??0)
  }
  useEffect(()=>{
    cart();
} , []);

  function logOut(){
    // localStorage.setItem('userToken' , null);
    localStorage.removeItem('userToken');
    serUserToken(null);
    navigate('/login')
}

  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to={'/'}>
          <img src={logo} alt="fresh cart logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
            {userToken !==null?  <>
                <li className="nav-item">
                  {/* <Link className="nav-link" to="/">Home {counter}</Link> */}
                  <Link className="nav-link" to={'/'}>Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/products'}>Products</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/categories'}>Categories</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/brands'}>Brands</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/cart'}>Cart</Link>
                </li>
                <li className="nav-item"> 
                  <Link className="nav-link" to={'/WishList'}>Wish list</Link>
                </li>
                <li className="nav-item"> 
                  <Link className="nav-link" to={'/allorders'}>Orders</Link>
                </li>
                {/* <li className="nav-item"> 
                  <Link className="nav-link" to={'/Profile'}>Profile</Link>
                </li> */}
                </>:''}
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* <li className="nav-item d-flex align-items-center">
              <i className='fab mx-2 fa-facebook'></i>
              <i className='fab mx-2 fa-twitter'></i>
              <i className='fab mx-2 fa-instagram'></i>
              <i className='fab mx-2 fa-youtube'></i>
              <i className='fab mx-2 fa-tiktok'></i>
            </li> */}
            {userToken !==null? <>
              <Link to={'./Cart'} > <div className=' px-3'> 
                  <div className='text-main brodercart text-white text-center'>{numOfCartItems}</div>
                  <i className=' fa-solid fa-cart-shopping fs-3 text-black'></i> 
                  </div>
              </Link>
              <li className="nav-item">
                <span onClick={()=>logOut()} className="nav-link cursor-pointer"  >Logout</span>
              </li>
            </>:<> 
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link> 
            </li>
            </>}
          </ul>
        </div>
      </div>
    </nav>
  </>
}
