import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../../components/loadingbox/loadingbox';
import MessageBox from '../../components/messagebox/messagebox';
import { deleteOrder, listOrders } from '../../redux/actions/orderActions';
import { ORDER_DELETE_RESET } from '../../redux/constants/orderConstants';

export default function OrderListScreen(props) {

    const orderList = useSelector((state) => state.orderList);
    const {
        loading,
        error,
        orders
    } = orderList;

    const orderDelete = useSelector((state) => state.orderDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = orderDelete;

    const dispatch = useDispatch();
    
   useEffect(() => {
       dispatch({
          type: ORDER_DELETE_RESET
       });
       dispatch(listOrders());
   }, [dispatch, successDelete]);

   const deleteHandler = (order) => {
      if(window.confirm('Are you sure you want to delete?')) {
          dispatch(deleteOrder(order._id));
      }
   };

    return (
            <div className="screen">
             <div>
            <h1>Orders</h1> 
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {
                loading? (
                    <LoadingBox></LoadingBox>
                )
                :
                error? (
                    <MessageBox variant="danger">{error}</MessageBox>
                )
                :
                (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>USER</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user.name}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice}</td>
                                        <td>{order.isPaid? order.paidAt.substring(0, 10): "No"}</td>
                                        <td>{order.isDelivered? order.deliveredAt.substring(0, 10): "No"}</td>
                                        <td>
                                            <button 
                                            type="button" 
                                            className="small invert"
                                            onClick={() => {props.history.push(`/order/${order._id}`)}}
                                            >
                                              Details
                                            </button>
                                            <button
                                            className="small invert"
                                            type="button"
                                            onClick={() => deleteHandler(order)}
                                            >
                                               <i className="fas fa-window-close"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
            }       
        </div>
        </div>
    )
}
