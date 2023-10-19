import React, { useContext, useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { Helmet } from 'react-helmet';
import { CartContext } from '../../Context/CartContextt';
import { BallTriangle } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export default function Cart() {

  let {getLoggedUserCart , removeCartItem , updateProductQuantity , clearUserCart} = useContext(CartContext);
  const [cartDetails ,setCartDetails] = useState(null);

  async function updateCount(id , count){
    let {data} = await updateProductQuantity(id, count);
    setCartDetails(data);
  }

  async function removeItem(productId){
    let {data} = await removeCartItem(productId);
    setCartDetails(data);
}

  async function getCart(){
      let {data} = await getLoggedUserCart();
      // console.log(data);
      setCartDetails(data);
  }

  async function getClear(){
    let {} = await clearUserCart();
    setCartDetails();
    // window.location.reload(true);
}
  
    useEffect(()=>{
      getCart();
    } , []);

  // let {isLoading , isError , data , isFetching , refetch} = useQuery('Cart' , getCart , {
  //   cacheTime:10000,
  //   // refetchOnMount:false,
  //   // staleTime:3000,
  //   refetchInterval:3000,
  //   // enabled:false,
  //   enabled:true
  // });

  return <>
      <Helmet>
          <meta name='description' content='' />
          <title>Cart Component</title>
      </Helmet>

      {cartDetails? <div className=' container'>
      <div className="row">
        <div className="col-md-12">
          <div className='w-100 mx-auto p-5 bg-main-light my-3'>
            <div className=' d-flex justify-content-between align-items-center'>
                <h3>Shopping Cart</h3>
                <Link to={'/address'} className='btn bg-main text-white' >Check Out</Link>
            </div>
          
            <h4 className='h6 text-main fw-bolder'>Cart Items :{cartDetails.numOfCartItems}</h4>
            <h4 className='h6 text-main fw-bolder mb-4 '>Total Cart Price : {cartDetails.data.totalCartPrice} EGP</h4>

          {cartDetails.data.products.map((product)=> <div key={product.product._id} className='row border-bottom py-2 px-2'>
              <div className="col-md-2">
                  <img className='w-100' src={product.product.imageCover} alt={product.product.title} />
              </div>
              <div className="col-md-10">
                  <div className=' d-flex justify-content-between align-items-center'>
                    <div>
                      <h3 className="h6">{product.product.title.split(' ').slice(0,3).join(' ')}</h3>
                      <h6 className=' text-main'>Price : {product.price}</h6>
                    </div>

                    <div>
                      <button onClick={()=> updateCount(product.product.id , product.count + 1)} className='btn broder-main p-1 px-2'>+</button>
                      <span className='mx-2'>{product.count}</span>
                      <button onClick={()=> updateCount(product.product.id , product.count - 1)} className='btn broder-main p-1 px-2'>-</button>
                    </div>
                  </div>

                  <button onClick={()=> removeItem(product.product.id)} className='btn p-0'> <i className=' text-danger font-sm fas fa-trash-can'></i> Remove </button>

              </div>
          </div>)}
            
            <div className="row">
              <div className='col-md-12 pt-5 text-center'>
                  <button onClick={()=> getClear()} className='btn broder-main'> Clear User Cart </button>
              </div>
            </div> 

          </div> 
        </div>
      </div> 
    </div> : <div className=' container'>
              <div className="row">
                  <div className="col-md-12">
                      <div className=' w-100 mx-auto p-5 bg-main-light m-5 align-items-center'>
                          <h4 className=' fw-bolder pb-4 ps-5'>Cart Shop</h4>
                          <h4 className=' fw-bolder ps-5'>your cart is empty</h4>
                      </div> 
                  </div>
              </div>
        </div>
      }

            {/* <div className=' bg-main-light d-flex justify-content-center align-items-center'>
                                  <BallTriangle
                                      height={650}
                                      width={100}
                                      radius={5}
                                      color="#4fa94d"
                                      ariaLabel="ball-triangle-loading"
                                      wrapperClass={{}}
                                      wrapperStyle=""
                                      visible={true}
                                  />
          </div>  */}
  </>
}


