import React from 'react';
import styles from './FeaturedBrands.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContextt';
import { useContext } from 'react';
import toast from 'react-hot-toast';


export default function FeaturedBrands() {

  let {addToCart} = useContext(CartContext);
  
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

  function getFeaturedBrands(){ 
      return axios.get(`https://ecommerce.routemisr.com/api/v1/Brands`);
  }

  let {isLoading , isError , data , isFetching , refetch} = useQuery('featuredbrands' , getFeaturedBrands , {
    cacheTime:10000,
    // refetchOnMount:false,
    // staleTime:3000,
    refetchInterval:3000,
    // enabled:false,
    enabled:true
  });

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
  </div>: <div className=" container py-3">
      <div className="row">
        <div className="col-md-12">
            <h1 className=' h1 text-main font-sm fw-bolder text-center pt-4'>All Brands</h1>
        </div>
        
        {data?.data.data.map((Brands)=> <div key={Brands._id} className='col-md-3 g-4'>

          <div className='broderCategories border cursor-pointer'>
            <Link to={`/Brandsdetails/${Brands._id}`}> 
              <img className='w-100' src={Brands.image} alt={Brands.name} />
              <h3 className='h6 font-sm fw-light text-center pt-4'>{Brands.name.split(" ").slice(0.2).join(' ')}</h3>
            </Link>
          </div>

        </div>)}
      </div>
  </div>} 
</>
}
