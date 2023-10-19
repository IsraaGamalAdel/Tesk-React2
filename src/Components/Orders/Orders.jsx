import React, { useContext, useEffect }  from 'react';
import styles from './Orders.module.css';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContextt';

export default function Orders() {

  let { getUserOrders, orders } = useContext(CartContext);
  
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  console.log(orders);
  useEffect(()=>{
    getUserOrders();
  } , []);
  return <>
      <Helmet>
          <meta name='description' content='' />
          <title>All Orders Component</title>
      </Helmet>

      <section className="container">
      <div className={`${styles.cart} d-flex flex-column`}>
        {orders?.map((order) => (
          <div key={order._id}>
            <div
              className={`${styles.order} bg-success-subtle border border-2 border-success-subtle rounded-2 p-2`}
              key={order._id}
            >
              <ul className={`row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-2`}>
                {order.cartItems.map((cartItem) => (
                  <li className="col-md-12" key={cartItem._id}>
                    <Link
                      className="d-flex gap-1 gap-md-2 border rounded-2 bg-white overflow-hidden h-100"
                      to={`/Productdetails/${cartItem.product._id}`}
                    >
                      <div className={`${styles.img}  rounded-0 border-end h-100`}>
                        <img src={cartItem.product.imageCover} alt="" style={{ scale: "1.1" }} />
                      </div>
                      <div className="d-flex flex-column p-2">
                        <h5 className="h6">
                          {cartItem.product.title.split(" ").length > 4
                            ? `${cartItem.product.title.split(" ").slice(0, 4).join(" ")}...`
                            : cartItem.product.title}
                        </h5>
                        <p>
                          <span className="fw-semibold">Price:</span> {cartItem.price} EGP
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
                
              </ul>
              <div className="table-responsive">
                <table className="table table-sm table-striped border border-1 border-black-subtle mb-0 rounded-2 overflow-hidden">
                  <tbody>
                    <tr>
                      <td>Order ID</td>
                      <td>{order.id}</td>
                    </tr>
                    <tr>
                      <td>Deliver to</td>
                      <td>{order.user.name}</td>
                    </tr>
                    <tr>
                      <td>Phone</td>
                      <td>{order.shippingAddress?.phone}</td>
                    </tr>
                    <tr>
                      <td>Delivery address</td>
                      <td>{order.shippingAddress?.details ? order.shippingAddress?.details : "Not provided"}</td>
                    </tr>
                    <tr>
                      <td>Paid</td>
                      <td>{order.isPaid ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                      <td>Payment method</td>
                      <td>{order.paymentMethodType}</td>
                    </tr>
                    <tr>
                      <td>Shipping price</td>
                      <td>{order.shippingPrice} EGP</td>
                    </tr>
                    <tr>
                      <td>Taxes</td>
                      <td>{order.taxPrice} EGP</td>
                    </tr>
                    <tr className="table-success fw-semibold">
                      <td>Total price</td>
                      <td>{order.totalOrderPrice} EGP</td>
                    </tr>
                    <tr>
                      <td>Made at</td>
                      <td>{new Date(order.createdAt).toLocaleDateString("en-US", options)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </section>

    {/* <div className=' container'>
      <div className="row">
        <div className="col-md-12">
          <div className='w-100 mx-auto p-5 bg-main-light my-3'>
              <h1>Payment Done Success </h1>
              <div className=' d-flex align-items-center'>
                    <Link to={'/'} type='submit' className='btn border-success btnFP mt-3 px-3 py-3'>To Home</Link>
              </div>
          </div> 
        </div>
      </div> 
    </div>  */}
  </>
}


