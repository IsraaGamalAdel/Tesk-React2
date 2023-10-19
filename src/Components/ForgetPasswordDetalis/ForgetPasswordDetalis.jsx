import React, { useContext, useState } from 'react';
import styles from './ForgetPasswordDetalis.module.css';
import {  Formik, useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Bars } from  'react-loader-spinner';
import { UserContext } from '../../Context/UserContext';
import { Helmet } from 'react-helmet';


export default function ForgetPasswordDetalis() {

  let {serUserToken , serUserData} = useContext(UserContext);
  
  let navigate = useNavigate();
  const [error , seterror]= useState(null);
  const [isLoading , setisLoading] = useState(false);
  const [data , setdata]= useState(null);

    async function verifyResetCode(values){
      setisLoading(true);
      let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode` , values)
      .catch (
        (err)=> {
          setisLoading(false);
          console.log(err);
          seterror(err.response.data.message);
        }
      )
        
      navigate('/ResetPassword');
    }

  let validateScheme =yup.object({
    // number: yup.string().matches(/^[0-6]{5,10}$/ , 'number start with uppercase').required('number is required'),
  })

  let formik = useFormik({
    initialValues :{
      resetCode:'',
    }, validationSchema:validateScheme,  
    onSubmit:verifyResetCode 
  })

  return <>
        <Helmet>
            <meta name='description' content='' />
            <title>verifyResetCode</title>
        </Helmet>
    <div className=" container w-100 mx-auto py-5">
      <div className="row">
        <div className="col-md-12">
          <div>
            {error!==null? <div className="alert alert-danger">{error}</div>:''}

            <form onSubmit={formik.handleSubmit}>

                        <input type='string' placeholder="Number of Code" id='resetCode' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control mt-4' value={formik.values.string} name='resetCode'/>
                        {formik.errors.string && formik.touched.string?<div className="alert alert-danger mt-2 p-2 ">{formik.errors.string}</div>:''}
                        
                {isLoading? <button  type=' buttom' className='btn bg-main text-white mt-2'>
                                <Bars
                                      height="20"
                                      width="80"
                                      color="white"
                                      ariaLabel="bars-loading"
                                      wrapperStyle={{}}
                                      wrapperClass=""
                                      visible={true}
                                />
                          </button> : <> 
                                        <div className=' d-flex align-items-center'>
                                        <button type='submit' className='btn border-success btnFP mt-3 px-3 py-3'>Verify</button>
                                        </div>
                                      </>
                }
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
}

