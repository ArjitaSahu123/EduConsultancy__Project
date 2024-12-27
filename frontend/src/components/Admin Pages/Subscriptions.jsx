import React, { useState, useEffect } from 'react';
import { getAllOrders } from '../../services/order-service';
import Adminsidenav from '../Utilities/Adminsidenav';
import Completed from '../Labels/Completed';
import Failed from '../Labels/Failed';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Admintop from "../Utilities/Admintop";

const Subscriptions = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [filteredSubscriptions, setFilteredSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusFilter, setStatusFilter] = useState('COMPLETED');

    const fetchSubscriptions = async () => {
        setLoading(true);
        setError(null);
        try {
            const orders = await getAllOrders();
            setSubscriptions(orders);
        } catch (err) {
            setError(err.message || 'Failed to fetch subscriptions.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    useEffect(() => {

        const filtered = subscriptions.filter(
            (sub) => sub.orderStatus === statusFilter
        );
        setFilteredSubscriptions(filtered);
    }, [subscriptions, statusFilter]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='flex justify-between bg-[#F9FAFB] poppins-regular'>
            <Adminsidenav />
            <div className='w-full'>
                <Admintop />

                <div className='bg-[white] p-10 gap-5 inline-block rounded-3xl m-10 w-[90%]'>
                    <div>
                        <div className='font-semibold text-lg'>Subscriptions Management</div>
                        <div className='text-[#737791]'>Manage your subscriptions efficiently</div>
                    </div>

                    {/* Status Filter Tabs */}
                    <div className="flex gap-4 my-4">
                        {['COMPLETED', 'FAILED'].map((status) => (
                            <button
                                key={status}
                                className={`py-2 px-4 rounded-md ${statusFilter === status ? 'bg-dark text-white' : 'bg-gray-200'
                                    }`}
                                onClick={() => setStatusFilter(status)}
                            >
                                {status}
                            </button>
                        ))}
                    </div>

                    {/* Subscription Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-2 px-4 border-b text-sm text-left">Order ID</th>
                                    <th className="py-2 px-4 border-b text-sm text-left">Name</th>
                                    <th className="py-2 px-4 border-b text-sm text-left">Email</th>
                                    <th className="py-2 px-4 border-b text-sm text-left">Phone</th>
                                    <th className="py-2 px-4 border-b text-sm text-left">Course</th>
                                    <th className="py-2 px-4 border-b text-sm text-left">Amount</th>
                                    <th className="py-2 px-4 border-b text-sm text-left">Order Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    // Display skeleton rows when loading
                                    Array.from({ length: 5 }).map((_, index) => (
                                        <tr key={index} className="hover:bg-gray-100">
                                            <td className="py-2 px-4 border-b text-sm">
                                                <Skeleton width={120} />
                                            </td>
                                            <td className="py-2 px-4 border-b text-sm">
                                                <Skeleton width={150} />
                                            </td>
                                            <td className="py-2 px-4 border-b text-sm">
                                                <Skeleton width={200} />
                                            </td>
                                            <td className="py-2 px-4 border-b text-sm">
                                                <Skeleton width={100} />
                                            </td>
                                            <td className="py-2 px-4 border-b text-sm">
                                                <Skeleton width={100} />
                                            </td>
                                            <td className="py-2 px-4 border-b text-sm">
                                                <Skeleton width={80} />
                                            </td>
                                            <td className="py-2 px-4 border-b">
                                                <Skeleton width={100} />
                                            </td>
                                        </tr>
                                    ))
                                ) : filteredSubscriptions.length > 0 ? (
                                    filteredSubscriptions.map((sub) => (
                                        <tr key={sub.orderId} className="hover:bg-gray-100">
                                            <td className="py-2 px-4 text-sm border-b">{sub.orderId}</td>
                                            <td className="py-2 px-4 text-sm border-b">{sub.name}</td>
                                            <td className="py-2 px-4 text-sm border-b">{sub.email}</td>
                                            <td className="py-2 px-4 text-sm border-b">{sub.phone}</td>
                                            <td className="py-2 px-4 text-sm border-b">{sub.course}</td>
                                            <td className="py-2 px-4 text-sm border-b">₹{sub.amount}</td>
                                            <td className="py-2 px-4 text-sm border-b">
                                                {sub.orderStatus === 'COMPLETED' ? <Completed /> : <Failed />}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center py-4">
                                            No subscriptions match your criteria.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscriptions;
