import React, { useContext, useEffect } from 'react';
import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { UserContext } from '../../Context/UserContext';
import { Offline, Online } from "react-detect-offline";

export default function Layout() {
  
  let {serUserToken} = useContext(UserContext);
  useEffect(()=>{
    if (localStorage.getItem('userToken') !==null){
      serUserToken(localStorage.getItem('userToken'))
    }
  } , []);

  return <>
    <Navbar/> 
        <div className=' container-fluid'>
          <div className="row">
            <div className="col-md-12">
              <Outlet></Outlet>
            </div>
          </div>
        </div>

        <div>
            {/* <Online>Only shown when you're online</Online> */}

            <Offline>
                <div className='network'>
                <i className="fas fa-wifi"></i> you are offline (surprise!)
                </div>
            </Offline>
        </div>
    <Footer/>
  </>
}
