import React from 'react';
import styles from './Brands.module.css';
import { Helmet } from 'react-helmet';
import FeaturedBrands from '../FeaturedBrands/FeaturedBrands';

export default function Brands() {
  return <>

      <Helmet>
          <meta name='description' content='' />
          <title>Brands Component</title>
          {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
      <FeaturedBrands/>
  </>
}
