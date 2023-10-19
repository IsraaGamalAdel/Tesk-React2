import React from 'react';
import styles from './Categories.module.css';
import { Helmet } from 'react-helmet';
import FeaturedCategories from '../FeaturedCategories/FeaturedCategories';

export default function Categories() {
  return <>

      <Helmet>
          <meta name='description' content='' />
          <title>Categories Component</title>
          {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>

      <FeaturedCategories/>
  </>
}
