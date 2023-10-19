import React, { useContext } from 'react';
import styles from './BrandsDetails.module.css';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';
import { BallTriangle } from 'react-loader-spinner';

export default function BrandsDetails() {

    let Params = useParams(); 
    function getBrandDetails(id){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
    }
    let {isLoading , isError , data} = useQuery('BrandDetails' , ()=> getBrandDetails(Params.id));

return <>
        <Helmet>
            <meta name='description' content='' />
            <title>{data?.data.data.title}</title>
        </Helmet>
    {data?.data.data? <div className=' container'> 
    <div className='row py-5 align-items-center justify-content-center'>
        <div className="col-md-4">
            <img className='w-100 product border' src={data?.data.data.image} alt={data?.data.data.name} />
        </div>

        <div className="col-md-8">
            <h6 className=' text-main fw-bolder '>brand Name : {data?.data.data.name}</h6>
        </div>
    </div>
    </div>: isLoading? <div className='bg-main-light d-flex justify-content-center align-items-center'>
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

