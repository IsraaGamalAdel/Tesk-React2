// import { createContext } from "react";
// import axios from "axios";



// export let cartContext = createContext();

// let userToken = localStorage.getItem('userToken');
// let headers = {
//     token:userToken
// }

// function addToCart(id){
//     return axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , {
//             productId:id
//         } ,
//         {
//             headers:headers
//         }).then((response)=> response) 
//         .catch((error)=> error)
// } 

// export default function CartContextProvider(props){

//     return <cartContext.Provider value={addToCart}>
//         {props.children}
//     </cartContext.Provider>
// }