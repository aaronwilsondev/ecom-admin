import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import LoadingBox from '../../components/loadingbox/loadingbox';
import MessageBox from '../../components/messagebox/messagebox';
import { summaryOrder } from '../../redux/actions/orderActions';
import Chart from 'react-google-charts';

export default function DashboardScreen() {

   const orderSummary = useSelector((state) => state.orderSummary);
   const {loading, summary, error} = orderSummary;
   const dispatch = useDispatch();

   useEffect(() => {
          dispatch(summaryOrder());
   }, [dispatch]);

    return (
        <div className="dashboard-page">
            <div className="row">
                <h1>Dashboard</h1>
            </div>
            {
                loading ? (<LoadingBox/>) 
                    :
                    error ? (<MessageBox variant="danger">{error}</MessageBox>)
                    :
                    (
                       <>
                          <ul className="row summary">
                             <li>
                                 <div className="summary-title color1">
                                   <span>
                                       <i className="fa fa-users"/> Users
                                   </span>
                                 </div>
                                 <div className="summary-body">
                                   {summary.users[0].numUsers}
                                 </div>
                             </li>
                             <li>
                                 <div className="summary-title color2">
                                   <span>
                                       <i className="fa fa-shopping-cart"/> Orders
                                   </span>
                                 </div>
                                 <div className="summary-body">
                                   {summary.orders[0]?summary.orders[0].numOrders:0}
                                 </div>
                             </li>
                             <li>
                                 <div className="summary-title color3">
                                   <span>
                                       <i className="fas fa-money-check-alt"/> Sales
                                   </span>
                                 </div>
                                 <div className="summary-body">
                                   {summary.orders[0]
                                   ? summary.orders[0].totalSales.toFixed(2)
                                   :0}
                                 </div>
                             </li>
                          </ul>
                          <div>
                              <div>
                                  <h2>Sales</h2>
                                  {
                                      summary.dailyOrders.length === 0 ? (
                                          <MessageBox>No Sale</MessageBox>
                                      ) : (
                                          <Chart 
                                          width="90%"
                                          height="400px"
                                          chartType="AreaChart"
                                          loader={
                                              <div>Loading Chart</div>
                                          }
                                          data={[
                                              ['Date', 'Sales'],
                                              ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                                          ]}
                                          ></Chart>
                                      )}
                              </div>
                          </div>
                          <div>
                                  <h2>Categories</h2>
                                  {
                                      summary.productCategories.length === 0 ? (
                                          <MessageBox>No Category</MessageBox>
                                      ) : (
                                          <Chart 
                                          width="90%"
                                          height="400px"
                                          chartType="PieChart"
                                          loader={
                                              <div>Loading Chart</div>
                                          }
                                          data={[
                                              ['Category', 'Products'],
                                              ...summary.productCategories.map((x) => [x._id, x.count]),
                                          ]}
                                          />
                                      )}
                              </div>
                       </>
                    )}
        </div>
    )
}