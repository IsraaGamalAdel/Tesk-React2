import { createContext, useEffect, useState } from "react";
import axios from "axios"; 


export let CartContext = createContext();
let userToken = localStorage.getItem('userToken');

let headers = {
    token:userToken
}
// function addToCart(ProductId){
//     return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
//     {
//         productId:ProductId 
//     },
//     {
//         headers:headers
//     }).then((response)=>response)
//     .catch((error)=> error);
// }

// function getLoggedUserCart(){
//     return axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , {
//         headers:headers
//     }).then((response)=>{
//         setNumOfCartItems(response.data.numOfCartItems??0)
//         return response
//     })
//     .catch((err)=> err);
// }

// function removeCartItem(productId){
//     return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
//         headers:headers
//     }).then((response)=>response)
//     .catch((errr)=> errr);
// }

function updateProductQuantity(productId , count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , 
    {count} , {headers:headers})
        .then((response)=>response)
        .catch((errror)=> errror);
}

// function clearUserCart(){
//     return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` , {
//         headers:headers})
//         .then((response)=>response)
//         .catch((errrorr)=> errrorr);
// }

// function addToWishList(ProductId){
//     return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
//     {
//         productId:ProductId 
//     },
//     {
//         headers:headers
//     }).then((response)=>{
//         getLoggedUserWishList()
//         return response
//     })
//     .catch((error)=> error);
// }

// function getLoggedUserWishList(){
//     return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` , {
//         headers:headers
//     }).then((response)=>response)
//     .catch((err)=> err);
// }

// function removeWishListItem(productId){
//     return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}` , {
//         headers
//     }).then((response)=>response)
//     .catch((errr)=> errr);
// }

function onLinePayment(cartId  , values){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`,
    {
        shippingAddress: values
    },
    {
        headers:headers
    }).then((response)=>response)
    .catch((error)=> error);
}

export default function CartContextProvider(props){
    const [cartId, setCartId] = useState(null);
    let [numOfCartItems , setNumOfCartItems] = useState(0)
    let [wishList , setWishList] = useState([])
    // const [cartUrl, setCartUrl] = useState(null);
    const [orders, setOrders] = useState(null);

    function getLoggedUserCart(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , {
            headers:headers
        }).then((response)=>{
            setNumOfCartItems(response.data?.numOfCartItems??0)
            return response
        })
        .catch((err)=> err);
    }

    function addToCart(ProductId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
        {
            productId:ProductId 
        },
        {
            headers:headers
        }).then((response)=>{
            setNumOfCartItems(response.data?.numOfCartItems??0);
            setCartId(response?.data?.data._id);
            localStorage.setItem("cartOwner", response?.data?.data.cartOwner);        
            return response
        })
        .catch((error)=> error);
    }

    function removeCartItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
            headers:headers
        }).then((response)=>{
            setNumOfCartItems(response.data?.numOfCartItems??0);
            setCartId(response?.data?.data._id);
            return response
        })
        .catch((errr)=> errr);
    }

    function clearUserCart(){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` , {
            headers:headers})
            .then((response)=>{
                setNumOfCartItems(response.data?.numOfCartItems??0)
                return response;
            })
            .catch((errrorr)=> errrorr);
    }

    function addToWishList(ProductId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
            productId:ProductId 
        },
        {
            headers:headers
        }).then((response)=>{
            getLoggedUserWishList()
            return response
        })
        .catch((error)=> error);
    }

    function removeWishListItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}` , {
            headers
        }).then((response)=>{
            getLoggedUserWishList();
            return response ;
        })
        .catch((errr)=> errr);
    }

    function getLoggedUserWishList(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` , {
            headers:headers
        }).then((response)=>{
            setWishList(response.data?.data);
            return response ;
        })
        .catch((err)=> err);
    }

    function getUserOrders(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${localStorage.getItem("cartOwner")}` , {
            headers:headers
        }).then((response)=>{
            setOrders(response.data);
            console.log(response);
            return response;
        })
        .catch((err)=> err);
    }

    async function getCart(){
        let {data} = await getLoggedUserCart();
        setCartId(data?.data._id);
        // setCartUrl(data?.data.cancel_url)
    }
    useEffect(()=>{
        getCart();
    } , []);

    return <CartContext.Provider value={{orders, wishList, numOfCartItems, cartId 
    ,getUserOrders , addToCart , getLoggedUserCart , removeCartItem , updateProductQuantity , clearUserCart , addToWishList , getLoggedUserWishList , removeWishListItem , onLinePayment}}>
            {props.children}
    </CartContext.Provider>
}