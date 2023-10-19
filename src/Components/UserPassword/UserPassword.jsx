import React, { useContext, useState } from 'react';
import styles from './UserPassword.module.css';
import {  Formik, useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Bars } from  'react-loader-spinner';
import { UserContext } from '../../Context/UserContext';
import { Helmet } from 'react-helmet';

export default function UserPassword() {

  let {serUserToken , serUserData} = useContext(UserContext); 
  let navigate = useNavigate();
  const [error , seterror]= useState(null);
  const [isLoading , setisLoading] = useState(false);

    async function getUserPassword(values){
      setisLoading(true);
      let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword` , values)
      .catch (
        (err)=> {
          setisLoading(false);
          seterror(err.response.data.message);
        }
      )
        
      localStorage.setItem('userToken' , data.token);
      serUserToken(data.token);
      serUserData(data.user);
      navigate('/ResetPassword');
    }

  let validateScheme =yup.object({
    password: yup.string().matches(/^[a-z][a-z0-9]{5,10}$/ , 'Password start with uppercase').required('Password is required')
  })

  let formik = useFormik({
    initialValues :{
      password:'',
    }, validationSchema:validateScheme,  
    onSubmit:getUserPassword 
  })

  return <>
      <Helmet>
          <meta name='description' content='' />
          <title>Update Logged user password</title>
      </Helmet>
  <div className=" container w-100 mx-auto py-5">
    <div className="row">
      <div className="col-md-12">
        <div>
          {error!==null? <div className="alert alert-danger">{error}</div>:''}
    
          <h3>Login Now</h3>
          <form onSubmit={formik.handleSubmit}>

            <label htmlFor="currentPassword" className=' my-2'>currentPassword :</label>
            <input type='password' id='currentPassword' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.password} name='password'/>
            {formik.errors.password && formik.touched.password?<div className="alert alert-danger mt-2 p-2 ">{formik.errors.password}</div>:''}

            <label htmlFor="password" className=' my-2'>Password :</label>
            <input type='password' id='password' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.password} name='password'/>
            {formik.errors.password && formik.touched.password?<div className="alert alert-danger mt-2 p-2 ">{formik.errors.password}</div>:''}

            <label htmlFor="rePassword" className=' my-2'>rePassword :</label>
            <input type='password' id='rePassword' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.password} name='password'/>
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
