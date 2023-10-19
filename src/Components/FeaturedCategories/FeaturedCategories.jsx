import React  from 'react';
import styles from './FeaturedCategories.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export default function FeaturedCategories() {

  function getFeaturedCategories(){ 
      return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let {isLoading , isError , data , isFetching , refetch} = useQuery('featuredcategories' , getFeaturedCategories , {
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
        {data?.data.data.map((data)=> <div key={data._id} className='col-md-4 g-4'>

          <div className='broderCategories border cursor-pointer'>
            <Link to={`/Categoriesdetails/${data._id}`}> 
              <img className='w-100' height={350} src={data.image} alt={data.name} />

              <h3 className='h6 text-main font-sm fw-bolder text-center pt-4'>{data.name.split(" ").slice(0.2).join(' ')}</h3>
            </Link>
          </div>

        </div>)}
      </div>
  </div> } 
</>
}
