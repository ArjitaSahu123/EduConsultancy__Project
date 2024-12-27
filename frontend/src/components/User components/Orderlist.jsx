import React, { useEffect, useState } from "react";
import { getUserDetails } from "../../services/user-service";
import { getOrdersByEmail } from "../../services/order-service";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Completed from "../Labels/Completed";
import Failed from "../Labels/Failed";

const Orderlist = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const userDetails = await getUserDetails();
            const email = userDetails.email;

            if (!email) {
                throw new Error("User email is not available");
            }

            const fetchedOrders = await getOrdersByEmail(email);
            const filteredOrders = fetchedOrders.filter(order =>
                ["COMPLETED", "FAILED"].includes(order.orderStatus)
            );
            setOrders(filteredOrders);
        } catch (error) {
            toast.error("Failed to fetch orders");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="bg-[white] p-10 gap-5 inline-block rounded-3xl ml-10 mr-0 w-[70%]">
            <div>
                <div className="font-semibold text-lg">Your Orders</div>
                <div className="text-[#737791]">Find all your orders here</div>
            </div>
            <div className="overflow-x-auto overflow-y-auto mt-10 ">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left text-sm">
                            <th className="py-2 px-4 border-b">#</th>
                            <th className="py-2 px-4 border-b">Course</th>
                            <th className="py-2 px-4 border-b">Amount</th>
                            <th className="py-2 px-4 border-b">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading
                            ? Array(5)
                                .fill()
                                .map((_, index) => (
                                    <tr key={index}>
                                        <td className="py-2 px-4 border-b">
                                            <Skeleton width={40} />
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <Skeleton width={100} />
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <Skeleton width={150} />
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <Skeleton width={100} />
                                        </td>
                                    </tr>
                                ))
                            : orders.length > 0
                                ? orders.map((order) => (
                                    <tr
                                        key={order.orderId}
                                        className="hover:bg-gray-200 text-sm"
                                    >
                                        <td className="py-2 px-4 border-b">{order.razorpayOrderId}</td>
                                        <td className="py-2 px-4 border-b">{order.course}</td>
                                        <td className="py-2 px-4 border-b">${order.amount.toFixed(2)}</td>
                                        <td className="py-2 px-4 border-b">
                                            {order.orderStatus === "COMPLETED" ? (
                                                <Completed />
                                            ) : (
                                                <Failed />
                                            )}
                                        </td>
                                    </tr>
                                ))
                                : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-4">
                                            No completed or failed orders found.
                                        </td>
                                    </tr>
                                )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orderlist;
