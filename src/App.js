import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home';
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Categories from './Components/Categories/Categories'
import Layout from './Components/Layout/Layout'
import CounterContextProvider from './Context/CounterContext';
import UserContextProvider, { UserContext } from './Context/UserContext';
import { useContext, useEffect } from 'react';
import ProtectadRou from './Components/ProtectadRou/ProtectadRou';
import NotFound from './Components/NotFound/NotFound';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContextt';
import { Toaster } from 'react-hot-toast';
import Profile from './Components/Profile/Profile';
import CategoriesDetails from './Components/CategoriesDetails/CategoriesDetails';
import BrandsDetails from './Components/BrandsDetails/BrandsDetails';
import WishList from './Components/WishList/WishList';
import Address from './Components/Address/Address';
import Orders from './Components/Orders/Orders';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ForgetPasswordDetalis from './Components/ForgetPasswordDetalis/ForgetPasswordDetalis';
import UserPassword from './Components/UserPassword/UserPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';


let routes = createBrowserRouter([
{ path: '/', element: <Layout/>, children: [
      {index: true , element:<ProtectadRou> <Home/> </ProtectadRou>},
      {path:'Products' , element:<ProtectadRou> <Products/> </ProtectadRou> },
      {path:'Cart' , element:<ProtectadRou> <Cart/> </ProtectadRou> },
      {path:'Categories' , element:<ProtectadRou> <Categories/> </ProtectadRou> },
      {path:'Brands' , element:<ProtectadRou> <Brands/> </ProtectadRou> },
      {path:'Productdetails/:id' , element:<ProtectadRou> <ProductDetails/> </ProtectadRou> },
      {path:'Categoriesdetails/:id' , element:<ProtectadRou> <CategoriesDetails/> </ProtectadRou> },
      {path:'Brandsdetails/:id' , element:<ProtectadRou> <BrandsDetails/> </ProtectadRou> },
      {path:'Profile' , element:<ProtectadRou> <Profile/> </ProtectadRou> },
      {path:'WishList' , element:<ProtectadRou> <WishList/> </ProtectadRou> },
      {path:'address' , element:<ProtectadRou> <Address/> </ProtectadRou> },
      {path:'allorders' , element:<ProtectadRou> <Orders/> </ProtectadRou> },
      {path:'ForgetPassword' , element:<ForgetPassword/>},
      {path:'ForgetPasswordDetalis' , element:<ForgetPasswordDetalis/>},
      {path:'UserPassword' , element:<UserPassword/>},
      {path:'ResetPassword' , element:<ResetPassword/>},
      {path:'login' , element:<Login/>},
      {path:'Register' , element:<Register/>},
      {path:'*' , element:<NotFound/>},
      ]}
])

function App() { 

  // let {serUserToken} = useContext(UserContext);
  // useEffect(()=>{
  //   if (localStorage.getItem('userToken') !==null){
  //     serUserToken(localStorage.getItem('userToken'))
  //   }
  // } , []);

return  <CartContextProvider> 
                  <UserContextProvider>
                       {/* <CounterContextProvider> */}
                              <RouterProvider router={routes}></RouterProvider>
                        {/* </CounterContextProvider>  */}
                  </UserContextProvider>
                  <Toaster/>
            </CartContextProvider> 
      
}

export default App;