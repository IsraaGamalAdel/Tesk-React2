import React, {useEffect, useState } from 'react';
import styles from './FeaturedProducts.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContextt';
import { useContext } from 'react';
import toast from 'react-hot-toast';

export default function FeaturedProducts() {

  let {addToCart} = useContext(CartContext);
  let {addToWishList , wishList , getLoggedUserWishList , removeWishListItem} = useContext(CartContext);
  
  async function addProduct(productId){
      let response = await addToCart(productId); 
      if(response.data.status === 'success')
      {
          toast.success('Product successfully added' , {
            duration: 3000,
            position: 'top-right',
            className: 'bg-main text-white w-100 ',
          }) 
          // window.location.reload(true);
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

  async function addWishList(productId){
    let response = await addToWishList(productId); 
    if(response.data.status === 'success')
    {
        toast.success('Product added successfully to your wishlist' ,{
          duration: 3000,
          position: 'top-right',
          className: 'bg-main text-white w-100 ',
        }) 
    }
    else
    {
      toast.error('Error added wishlist' , {
        duration: 3000,
        position: 'top-right',
        className: 'bg-main text-white w-100 ',
      }) 
    }
}

async function removeWishL(productId){
  let response = await removeWishListItem(productId); 
  if(response.data.status === 'success')
  {
      toast.success('Product remove successfully to your wishlist' ,{
        duration: 3000,
        position: 'top-right',
        className: 'bg-main text-white w-100 ',
      }) 
  }
  else
  {
    toast.error('Error remove wishlist' , {
      duration: 3000,
      position: 'top-right',
      className: 'bg-main text-white w-100 ',
    }) 
  }
}

async function  handleClick(productId){
  wishList.find((el)=> el._id===productId)? removeWishL(productId) : addWishList(productId) 
}

  function getFeaturedProducts(){ 
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  useEffect(()=>{
    getLoggedUserWishList();
  },[])

  let {isLoading , isError , data , isFetching , refetch} = useQuery('featuredproducts' , getFeaturedProducts , {
    cacheTime:10000,
    // refetchOnMount:false,
    // staleTime:3000,
    refetchInterval:3000,
    // enabled:false,
    enabled:true
  });
  
//   const[Products , setProducts]=useState([]);
//   const[isLoading , setIsLoading]=useState(false);

//   async function getFeaturedProducts(){
//     setIsLoading(true);
//     let {data} =await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
//     setProducts(data.data);
//     setIsLoading(false);
// }

//   useEffect(()=>{
//     getFeaturedProducts();
//   },[])

  return <>
    {isLoading? <div className='bg-main-light d-flex justify-content-center align-items-center'>
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
    </div>: <div className=" container ">
      {/* <button onClick={()=>refetch()}  className='btn bg-main text-white w-100'>GET PRODUCTS</button> */}
      {/* <h2>Featured Products</h2> */}
      <div className="row my-4">
        {/* {Products.map((product)=> <div key={product.id} className='col-md-2'> */}
          <div className=' d-flex justify-content-center align-items-center my-4'>
            <input className=' form-control w-75 ' placeholder="searching"/>
          </div>

        {data?.data.data.map((product)=> <div key={product._id} className='col-md-3'>

          <div className='product py-3 px-2 cursor-pointer'>
            <Link to={`/Productdetails/${product._id}`}> 
              <img className='w-100' src={product.imageCover} alt={product.title} />
              <span className='text-main font-sm fw-bolder'>{product.category.name}</span>

              <h3 className='h6'>{product.title.split(" ").slice(0.2).join(' ')}</h3>
            
              <div className=' d-flex justify-content-between mt-2'>
                <span>{product.price} EGP</span>
                <span><i className='fas fa-star rating-color'></i> {product.ratingsAverage}</span>
              </div>
              
            </Link>
            <div>
                <span onClick={()=> handleClick(product._id)} ><i className={
                  `fas fa-heart cursor-pointer fs-3 d-flex justify-content-end ${wishList.find((el)=> el._id===product._id)?'text-danger' :''}`
                }></i></span>
            </div>
            <button onClick={()=> addProduct(product._id)} className='btn bg-main text-white w-100 btn-sm mt-2'>Add to cart</button>
          </div>

        </div>)}
      </div>
  </div>} 
</>
}
