import React, { useContext, useEffect } from 'react';
import styles from './Profile.module.css';
import jwtDecode from 'jwt-decode';
import { UserContext } from '../../Context/UserContext';
import { Helmet } from 'react-helmet';

export default function Profile() {
    let {userData} = useContext(UserContext);
    useEffect(()=>{
        let encodedToken = (localStorage.getItem('userToken'));
        let decodedToken = jwtDecode(encodedToken);
    } ,[])
    
    return <>
        <Helmet>
            <meta name='description' content='' />
            <title>{userData?.role}</title>
        </Helmet>
        <h1>Hello :{userData?.name}</h1>
        <h1>Hello :{userData?.email}</h1>
    </>
}