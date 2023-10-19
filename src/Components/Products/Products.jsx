import React from 'react';
import styles from './Products.module.css';
import { Helmet } from 'react-helmet';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';

export default function Products() {
  return <>

      <Helmet>
          <meta name='description' content='' />
          <title>Products Component</title>
      </Helmet>

      <FeaturedProducts/> 
  </>
}
