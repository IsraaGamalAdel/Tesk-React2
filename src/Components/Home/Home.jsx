import React, { useContext, useEffect } from 'react';
import styles from './Home.module.css';
import { CounterContext } from '../../Context/CounterContext';
import FeaturedProducts from './../FeaturedProducts/FeaturedProducts';
import axios from 'axios';
import CategorySlider from './../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';
import { Helmet } from 'react-helmet';
import { BallTriangle } from 'react-loader-spinner';
import { useQuery } from 'react-query';


export default function Home() {
  // let {changeCounter} = useContext(CounterContext) (never)
return <>
      <Helmet>
          <meta name='description' content='' />
          <title>Fresh Cart Home</title>
          {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
      
      <MainSlider/>
      <CategorySlider/>
      <FeaturedProducts/> 
      
    {/* <button onClick={()=>changeCounter()} className='btn bg-main text-white'>Hi</button> */}
  </>
}
