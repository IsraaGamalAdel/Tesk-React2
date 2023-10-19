import React, { useContext, useState } from 'react';
import styles from './ResetPassword.module.css';
import {  Formik, useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Bars } from  'react-loader-spinner';
import { UserContext } from '../../Context/UserContext';
import { Helmet } from 'react-helmet';


export default function ResetPassword() {
  let {serUserToken , serUserData} = useContext(UserContext); 
  let navigate = useNavigate();
  const [error , seterror]= useState(null);
  const [isLoading , setisLoading] = useState(false);

    async function getResetPassword(values){
        setisLoading(true);
        let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword` , values)
        .catch (
          (err)=> {
            setisLoading(false);
            seterror(err.response.data.message);
          }
        )
        
        navigate('/login');
    }


    let validateScheme =yup.object({
      email: yup.string().email('Email is invalid').required('Email is required'),
      newPassword: yup.string().matches(/^[a-z][a-z0-9]{5,10}$/ , 'Password start with uppercase').required('Password is required')
    })

    let formik = useFormik({
      initialValues :{
        email:'',
        newPassword:'',
      }, validationSchema:validateScheme,  
      onSubmit:getResetPassword 
    })

  return <>
        <Helmet>
            <meta name='description' content='' />
            <title>ResetPassword</title>
        </Helmet>
    <div className=" container w-100 mx-auto py-5">
      <div className="row">
        <div className="col-md-12">
          <div>
            {error!==null? <div className="alert alert-danger">{error}</div>:''}

            <form onSubmit={formik.handleSubmit}>

              <label htmlFor="email" className=' my-3'>Email :</label>
              <input type='email' id='email' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.email} name='email'/>
              {formik.errors.email && formik.touched.email? <div className="alert alert-danger mt-2 p-2">{formik.errors.email}</div>:''}
        
              <label htmlFor="newPassword" className=' my-3'>newPassword :</label>
              <input type='password' id='newPassword' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.password} name='newPassword'/>
              {formik.errors.password && formik.touched.password?<div className="alert alert-danger mt-2 p-2 ">{formik.errors.password}</div>:''}

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
                                            <button type='submit' className='btn border-success btnFP mt-3 px-3 py-3'>Get Password</button>
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
