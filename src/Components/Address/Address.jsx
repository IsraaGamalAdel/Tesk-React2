import React, { useContext } from 'react';
import styles from './Address.module.css';
import { useFormik } from 'formik';
import { CartContext } from '../../Context/CartContextt';
import * as yup from 'yup';

export default function Address() {
  let {onLinePayment , cartId} =useContext(CartContext);

  async function handlAddressSubmit( values){
    let response = await onLinePayment( cartId  , values );
    // console.log(response?.data.session.url);
    window.location.href = response?.data.session.url;
  }

  let phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/ 
    let validateScheme =yup.object({
      detalis: yup.string().min(20 , 'Detalis minlength is 20').max(40, 'Detalis maxlength is 40').required('Detalis is required'),
      phone: yup.string().matches(phoneRegExp , 'Phone is invalid').required('Phone is required'),
      city: yup.string().min(5 , 'City minlength is 3').max(10, 'City maxlength is 10').required('City is required'),
    })

  let formik = useFormik({
      initialValues:{
        detalis: '',
        phone: '',
        city: '',
      }, validationSchema:validateScheme, 
      onSubmit:handlAddressSubmit
  })

  return <> 
      <div className=' conttainer'>
        <div className="row m-5">
          <div className="col-md-12">
            <div>
              <form onSubmit={formik.handleSubmit}>

              <label htmlFor="detalis" className=' m-2'>Detalis :</label>
              <input type='text' id='name' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.detalis} name='detalis'/>
              {formik.errors.detalis && formik.touched.detalis?<div className="alert alert-danger mt-2 p-2 ">{formik.errors.detalis}</div>:''}
        
              <label htmlFor="phone" className=' m-2'>Phone :</label>
              <input type='tel' id='phone' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.phone} name='phone'/>
              {formik.errors.phone && formik.touched.phone? <div className="alert alert-danger mt-2 p-2">{formik.errors.phone}</div>:''}
        
              <label htmlFor="city" className=' m-2'>City :</label>
              <input type='text' id='city' onBlur={formik.handleBlur} onChange={formik.handleChange} className=' form-control' value={formik.values.city} name='city'/>
              {formik.errors.city && formik.touched.city?<div className="alert alert-danger mt-2 p-2 ">{formik.errors.city}</div>:''}
        
              <button type='submit' className='btn bg w-100 mt-3 border-success'>Pay Nom</button>
              </form>
            </div>
          </div>
        </div>
      </div>
  </>
}
