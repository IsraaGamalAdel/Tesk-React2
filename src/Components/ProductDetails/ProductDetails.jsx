import React, { useContext, useEffect, useState } from 'react';
import styles from './ProductDetails.module.css';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';
import { CartContext } from '../../Context/CartContextt';
import toast from 'react-hot-toast';
import { BallTriangle } from 'react-loader-spinner';

export default function ProductDetails() {
  let {addToCart} = useContext(CartContext);
  let {addToWishList , wishList ,removeWishListItem} = useContext(CartContext);
  
  async function addProduct(productId){
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

  async function addWishList(productId){
    let response = await addToWishList(productId); 
    if(response.data.status === 'success')
    {
        toast.success('Product added successfully to your wishlist' , {
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

async function  handleClick(id){
  wishList.find((el)=> el._id===id)? removeWishL(id) : addWishList(id) 
}

  let Params = useParams(); 
  function getProductDetails(id){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  let {isLoading , isError , data} = useQuery('productDetails' , ()=> getProductDetails(Params.id));

  // const [productDetails,setProductDetails] = useState(null);
  // console.log(Params.id);

  // async function getProductDetails(id){
  //     let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  //     setProductDetails(data);
  // }
  // useEffect(()=>{
  //   getProductDetails(Params.id);
  // },[])



  return <>
      <Helmet>
          <meta name='description' content='' />
          <title>{data?.data.data.title}</title>
      </Helmet>
    {data?.data.data? <div className=' container'>
    <div className='row py-2 align-items-center'>
        <div className="col-md-4">
            <img className='w-100' src={data?.data.data.imageCover} alt={data?.data.data.title} />
        </div>

        <div className="col-md-8">
            <h2 className='h5'>{data?.data.data.title}</h2>
            <p>{data?.data.data.description}</p>
            <h6 className=' text-main'>{data?.data.data.category.name}</h6>
            <h6 className=' text-main'>price : {data?.data.data.price} EGP</h6>
            
            <div className=' d-flex justify-content-between'>
                <span>ratingsQuantity : {data?.data.data.ratingsQuantity}</span>
                <span> <i className='fas fa-star rating-color'></i> {data?.data.data.ratingsAverage} </span>
            </div>
            <div>
                <span onClick={()=> handleClick(data?.data.data._id)} ><i className={
                  `fas fa-heart cursor-pointer fs-3 d-flex justify-content-end ${wishList.find((el)=> el._id===data?.data.data._id)?'text-danger' :''}`
                }></i></span>
            </div>

            <button onClick={()=> addProduct(data?.data.data._id)} className=' btn bg-main text-white w-100 mt-2'>Add to cart</button>
        </div>
    </div> 
    </div> : isLoading? <div className='bg-main-light d-flex justify-content-center align-items-center'>
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
    </div> : isError? <div className='row  '>
                    <div className='col-md-12'>
                        <h6 className='text-main fw-bolder pt-5'>AxiosError : Request failed with status code 400</h6>
                    </div>
                </div> : ''}
  </>
}
