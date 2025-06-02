import { useEffect, useState } from 'react';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/order`);
        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.response?.data?.message || "Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p>Loading orders...</p></div>;
  }

  if (error) {
    return <div className="p-4 text-red-600 bg-red-100 border border-red-400 rounded-md">Error: {error}</div>;
  }

  return (
    <>
    <br />
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-slate-800 dark:text-white">Customer Orders</h1>
      {orders.length === 0 ? (
        <p className="text-slate-600 dark:text-slate-300">No orders found.</p>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-slate-800 shadow-md rounded-lg">
          <table className="min-w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Order ID</th>
                <th scope="col" className="px-6 py-3">Customer Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Total Amount</th>
                <th scope="col" className="px-6 py-3">Order Date</th>
                <th scope="col" className="px-6 py-3">Payment Status</th>
                <th scope="col" className="px-6 py-3">Order Status</th>
                {/* <th scope="col" className="px-6 py-3">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{order._id}</td>
                  <td className="px-6 py-4">{order.customerDetails.name}</td>
                  <td className="px-6 py-4">{order.customerDetails.email}</td>
                  <td className="px-6 py-4">${order.totalAmount.toFixed(2)}</td>
                  <td className="px-6 py-4">{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.paymentInfo?.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      order.paymentInfo?.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.paymentInfo?.status || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100' :
                      order.status === 'Processing' ? 'bg-purple-100 text-purple-800 dark:bg-purple-700 dark:text-purple-100' :
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100' :
                      order.status === 'Cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-100'
                    }`}>
                      {order.status || 'N/A'}
                    </span>
                  </td>
                  {/* <td className="px-6 py-4">
                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View Details</button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </>
  );
};

export default OrderList;