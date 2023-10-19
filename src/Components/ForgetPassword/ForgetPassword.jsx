import React, { useContext, useState } from 'react';
import styles from './ForgetPassword.module.css';
import {  Formik, useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Bars } from  'react-loader-spinner';
import { UserContext } from '../../Context/UserContext';
import { Helmet } from 'react-helmet';

export default function ForgetPassword() {
  let {serUserToken , serUserData} = useContext(UserContext); 
  let navigate = useNavigate();
  const [error , seterror]= useState(null);
  const [isLoading , setisLoading] = useState(false);
    async function getForgetPassword(values){
      setisLoading(true);
      let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` , values)
      .catch (
        (err)=> {
          setisLoading(false);
          seterror(err.response.data.message);
        }
      )
      
      navigate('/ForgetPasswordDetalis');
    }

    let validateScheme =yup.object({
      email: yup.string().email('Email is invalid').required('Email is required'),
    })

    let formik = useFormik({
      initialValues :{
        email:'',
      }, validationSchema:validateScheme,  
      onSubmit:getForgetPassword 
    })

  return <>
        <Helmet>
            <meta name='description' content='' />
            <title>ForgetPassword</title>
        </Helmet>
    <div className=" container w-100 mx-auto py-5">
      <div className="row">
        <div className="col-md-12">
          <div>
            {error!==null? <div className="alert alert-danger">{error}</div>:''}

            <form onSubmit={formik.handleSubmit}>

                        <h1 className=' fw-bolder'>please enter your verification code</h1>
                        <input type='email' placeholder="Email" id='email' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.email} name='email'/>
                        {formik.errors.email && formik.touched.email? <div className="alert alert-danger mt-2 p-2">{formik.errors.email}</div>:''}

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
