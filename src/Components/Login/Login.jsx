import React, { useContext, useState } from 'react';
import styles from './Login.module.css';
import {  Formik, useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Bars } from  'react-loader-spinner';
import { UserContext } from '../../Context/UserContext';
import { Helmet } from 'react-helmet';

export default function Login() {
  let {serUserToken , serUserData} = useContext(UserContext); 
  let navigate = useNavigate();
  const [error , seterror]= useState(null);
  const [isLoading , setisLoading] = useState(false);
    async function loginSubmit(values){
        setisLoading(true);
        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , values)
        .catch (
          (err)=> {
            setisLoading(false);
            seterror(err.response.data.message);
            // seterror(err)
          }
        )
          
        localStorage.setItem('userToken' , data.token);
        serUserToken(data.token);
        serUserData(data.user);
        navigate('/');

        // if (data.message ==='Success'){
        //   console.log(data.token); 
        //   setisLoading(false);
        //   localStorage.setItem('userToken' , data.token);
        //   serUserToken(data.token);
        //   navigate('/')
        // }
    }


    let validateScheme =yup.object({
      email: yup.string().email('Email is invalid').required('Email is required'),
      password: yup.string().matches(/^[a-z][a-z0-9]{5,10}$/ , 'Password start with uppercase').required('Password is required')
    })

    let formik = useFormik({
      initialValues :{
        email:'',
        password:'',

      }, validationSchema:validateScheme,  
      onSubmit:loginSubmit 
    })

  return <>
    <Helmet>
            <meta name='description' content='' />
            <title>Login</title>
    </Helmet>
    <div className=" container w-100 mx-auto py-5">
      <div className="row">
        <div className="col-md-12">
          <div>
            {error!==null? <div className="alert alert-danger">{error}</div>:''}
      
            <h3>Login Now</h3>
            <form onSubmit={formik.handleSubmit}>

              <label htmlFor="email">Email :</label>
              <input type='email' id='email' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.email} name='email'/>
              {formik.errors.email && formik.touched.email? <div className="alert alert-danger mt-2 p-2">{formik.errors.email}</div>:''}
        
              <label htmlFor="password">Password :</label>
              <input type='password' id='password' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.password} name='password'/>
              {formik.errors.password && formik.touched.password?<div className="alert alert-danger mt-2 p-2 ">{formik.errors.password}</div>:''}
        
              <div className=' d-flex justify-content-between align-items-center pt-3'>

                <Link to={'/ForgetPassword'} className='texth3 fw-bold fs-5 h5'>Forget Your Password ?</Link>

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
                                          <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-2 mx-2'>Login</button>
                                          <Link className='btn bg-main text-white mt-2' to={'/register'}>Register Now</Link>
                                        </div>
                                      </>
                }
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
}
