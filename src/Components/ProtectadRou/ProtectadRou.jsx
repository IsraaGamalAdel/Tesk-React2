import React from 'react';
import styles from './ProtectadRou.module.css';
import { Navigate } from 'react-router-dom';


export default function ProtectadRou(props) {
  if (localStorage.getItem('userToken')  !==null){
      return props.children
  }
  else{
      return <Navigate to={'/login'}/>
  }
}
