import React, { useContext, useEffect, useState } from 'react';
import styles from './WishList.module.css';
import { Helmet } from 'react-helmet';
import { CartContext } from '../../Context/CartContextt';
import { BallTriangle } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';

export default function WishList() { 

  let { getLoggedUserWishList , removeWishListItem} = useContext(CartContext);
  const [wishListDetails ,setwishListDetails] = useState(null);
  
  let {addToCart} = useContext(CartContext);


  async function addWishAddToCart(productId){
    let response = await addToCart(productId); 
    if(response.data.status === 'success')
    {
        toast.success('Product successfully added' , {
          duration: 3000,
          position: 'top-right',
          className: 'bg-main text-white w-100 ',
        }) 
    }
    else
    {
      toast.error('Error added product' , {
        duration: 3000,
        position: 'top-right',
        className: 'bg-main text-white w-100 ',
      }) 
    }
}

  async function removeItem(productId){
    await removeWishListItem(productId);
    let {data} = await getLoggedUserWishList();
    setwishListDetails(data);
}

async function getWishList(){
  let {data} = await getLoggedUserWishList();
  setwishListDetails(data);
}
  
  // useEffect(()=>{
  //     getWishList();
  // } , []);

  let {isLoading , isError , data , isFetching , refetch} = useQuery('Cart' , getWishList , {
    cacheTime:10000,
    // refetchOnMount:false,
    // staleTime:3000,
    refetchInterval:3000,
    // enabled:false,
    enabled:true
  });

  return <>
      <Helmet>
          <meta name='description' content='' />
          <title>Cart Component</title>
      </Helmet>

      {wishListDetails? <div className=' container'>
      <div className="row">
        <div className="col-md-12">
          <div className='w-100 mx-auto p-5 bg-main-light my-2'>
            <h3>My wish List</h3>
            {wishListDetails.data.map((data)=> <div key={data.id} className='row border-bottom py-2 px-2'>
              <div className="col-md-1">
                  <img className='w-100' src={data.imageCover} alt={data.title} />
              </div>
              <div className="col-md-11">
                  <div className=' d-flex justify-content-between align-items-center'>
                    <div>
                      <h3 className="h6">{data.title.split(' ').slice(0,3).join(' ')}</h3>
                      <h6 className=' text-main'>Price : {data.price}</h6>
                    </div>

                    <button onClick={()=> [removeItem(data.id) , addWishAddToCart(data.id)]} className='btn broder-main'> Add To Cart </button>
                  </div>

                  <button onClick={()=> removeItem(data.id)} className='btn p-0'> <i className=' text-danger font-sm fas fa-trash-can'></i> Remove </button>
              </div>
            </div>)}
          </div>
        </div>
      </div>
      </div>:isLoading? <div className='bg-main-light d-flex justify-content-center align-items-center'>
                                  <BallTriangle
                                      height={630}
                                      width={100}
                                      radius={5}
                                      color="#4fa94d"
                                      ariaLabel="ball-triangle-loading"
                                      wrapperClass={{}}
                                      wrapperStyle=""
                                      visible={true}
                                  />
      </div> : <div className=' container'>
                <div className='row '> 
                    <div className='col-md-12'>
                        <div className=' w-100 mx-auto p-5 bg-main-light m-5 align-items-center'>
                            <h4 className=' fw-bolder pb-4 ps-5'>My wish List</h4>
                        </div>
                    </div>
                </div>
                </div>}
  </>
}

