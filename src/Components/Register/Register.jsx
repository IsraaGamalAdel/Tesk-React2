import React, { useState } from 'react';
import styles from './Register.module.css';
import {  Formik, useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Audio } from  'react-loader-spinner';

export default function Register() {
  let navigate = useNavigate();
  const [error , seterror]= useState(null);
  const [isLoading , setisLoading] = useState(false);
    async function RegisterSubmit(values){
        setisLoading(true);
        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , values).catch(
          (err)=> {
            setisLoading(false);
            seterror(err.response.data.message);
            // seterror(err)
          }
        )
        navigate('/login');

        // if (data.message ==='Success'){
        //   setisLoading(false);
        //   navigate('/login');
        // }
    }

    // function validate(values){
    //   let emailRegex =   /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    //   let phoneRegex =/^(\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/;
    //   let errors ={}; 
    //     if(!values.name){
    //       errors.name = " Name is required";
    //     }
    //     else if (values.name.length < 3){
    //       errors.name = " Name minlength is 3";
    //     }
    //     else if (values.name.length > 10){
    //       errors.name = " Name maxlength is 10";
    //     }

    //     if(!values.email){
    //       errors.email = " Email is required";
    //     }
    //     else if(!emailRegex.test(values.email)){
    //         errors.email =" Email Number Invalid "
    //     }

    //     if(!values.phone){
    //       errors.phone = " Phone is required";
    //     }
    //     else if(!phoneRegex.test(values.phone)){
    //         errors.phone ="Phone Number Invalid "
    //     }

    //     return errors;
    // }
    
    let phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/ 
    let validateScheme =yup.object({
      name: yup.string().min(3 , 'Name minlength is 3').max(10 , 'Name maxlength is 10').required('Name is required'),
      email: yup.string().email('Email is invalid').required('Email is required'),
      phone: yup.string().matches(phoneRegExp , 'Phone is invalid').required('Phone is required'),
      password: yup.string().matches(/^[a-z][a-z0-9]{5,10}$/ , 'Password start with uppercase').required('Password is required'),
      rePassword: yup.string().oneOf([yup.ref("password")] , 'Password and repassword').required('RePassword is required')
    })

  let formik = useFormik({
    initialValues :{
        name:'',
        phone:'',
        email:'',
        password:'',
        rePassword:''
    }, validationSchema:validateScheme,  
    onSubmit:RegisterSubmit
  })

  return <>
    <div className="w-75 mx-auto py-5">
      {error!==null? <div className="alert alert-danger">{error}</div>:''}
      
      <h3>Register Now</h3>
      <form onSubmit={formik.handleSubmit}>

        <label htmlFor="name">Name :</label>
        <input type='text' id='name' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.name} name='name'/>
        {formik.errors.name && formik.touched.name?<div className="alert alert-danger mt-2 p-2 ">{formik.errors.name}</div>:''}
        
        <label htmlFor="email">Email :</label>
        <input type='email' id='email' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.email} name='email'/>
        {formik.errors.email && formik.touched.email? <div className="alert alert-danger mt-2 p-2">{formik.errors.email}</div>:''}
        

        <label htmlFor="phone">Phone :</label>
        <input type='tel' id='phone' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.phone} name='phone'/>
        {formik.errors.phone && formik.touched.phone? <div className="alert alert-danger mt-2 p-2">{formik.errors.phone}</div>:''}
        
        <label htmlFor="password">Password :</label>
        <input type='password' id='password' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.password} name='password'/>
        {formik.errors.password && formik.touched.password?<div className="alert alert-danger mt-2 p-2 ">{formik.errors.password}</div>:''}
        

        <label htmlFor="rePassword">RePassword :</label>
        <input type='Password' id='rePassword' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.rePassword} name='rePassword'/>
        {formik.errors.rePassword && formik.touched.rePassword?<div className="alert alert-danger mt-2 p-2 ">{formik.errors.rePassword}</div>:''}
        

        {isLoading? <button  type=' buttom' className='btn bg-main text-white mt-2'>
          {/* <i className='fas fa-spinner fa-spin'></i> */}
          <Audio
            height="20"
            width="80"
            color="white"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
          />
        </button> :<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-2'>Register</button>
        }
        {/* <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-2'>Register</button>
        <button  type=' buttom' className='btn bg-main text-white mt-2'>
          <i className='fas fa-spinner fa-spin'></i>
        </button> */}
      </form>
    </div>
  </>
}
