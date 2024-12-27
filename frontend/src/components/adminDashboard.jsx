import React, { useEffect, useState } from "react";
import { getAllProducts } from "../services/product-service";
import { getAllUsers } from "../services/user-service";
import { getAllBlogs } from "../services/blog-service";
import { getAllOrders } from "../services/order-service";
import { getContacts } from "../services/contact-service";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import Adminsidenav from "./Utilities/Adminsidenav";
import sales from "../assets/sales.png";
import order from "../assets/order.png";
import product from "../assets/product.png";
import customer from "../assets/cutomer.png";
import Admintop from "./Utilities/Admintop";
import contacts from "../assets/contacts.png";

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalSales: 0,
        totalUsers: 0,
        totalBlogs: 0,
        totalProducts: 0,
        totalContacts: 0
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [
                    ordersResponse,
                    usersResponse,
                    blogsResponse,
                    productsResponse,
                    contactsResponse
                ] = await Promise.all([
                    getAllOrders(),
                    getAllUsers(),
                    getAllBlogs(),
                    getAllProducts(),
                    getContacts()
                ]);

                // Filter orders to get only those with status 'COMPLETED' and sum their amounts
                const completedOrders = ordersResponse.filter(order => order.orderStatus === "COMPLETED");
                const totalSales = completedOrders.reduce((total, order) => total + order.amount, 0);

                setStats({
                    totalSales: totalSales,
                    totalUsers: usersResponse.length,
                    totalBlogs: blogsResponse.length,
                    totalProducts: productsResponse.length,
                    totalContacts: contactsResponse.length
                });

                setIsLoading(false); // Stop loading after data is fetched
            } catch (error) {
                console.error("Error fetching stats:", error);
                setIsLoading(false); // Stop loading even on error
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="flex justify-between bg-[#F9FAFB] poppins-regular h-screen">
            <Adminsidenav />
            <div className="w-full">
                <Admintop />

                <div className="bg-[white] p-10 gap-5 inline-block rounded-3xl m-10">
                    <div>
                        <div className="font-semibold text-lg">Today's Sales</div>
                        <div className="text-[#737791]">Sales Summary</div>
                    </div>
                    <div className="flex gap-5 mt-10">
                        <div className="bg-[#FFE2E5] w-44 h-44 p-5 flex flex-col justify-evenly rounded-3xl gap-2">
                            <div>
                                {isLoading ? (
                                    <Skeleton circle width={40} height={40} />
                                ) : (
                                    <img src={sales} alt="sales" className="w-10" />
                                )}
                            </div>
                            <div className="poppins-bold text-3xl">
                                {isLoading ? <Skeleton width={80} /> : `₹${stats.totalSales}`}
                            </div>
                            <div className="text-[#425166]">Total Sales</div>
                        </div>
                        <div className="bg-[#FFF4DE] w-44 h-44 p-5 flex flex-col justify-evenly rounded-3xl gap-2">
                            <div>
                                {isLoading ? (
                                    <Skeleton circle width={40} height={40} />
                                ) : (
                                    <img src={order} alt="blogs" className="w-10" />
                                )}
                            </div>
                            <div className="poppins-bold text-3xl">
                                {isLoading ? <Skeleton width={80} /> : stats.totalBlogs}
                            </div>
                            <div className="text-[#425166]">Total Blogs</div>
                        </div>
                        <div className="bg-[#DCFCE7] w-44 h-44 p-5 flex flex-col justify-evenly rounded-3xl gap-2">
                            <div>
                                {isLoading ? (
                                    <Skeleton circle width={40} height={40} />
                                ) : (
                                    <img src={product} alt="products" className="w-10" />
                                )}
                            </div>
                            <div className="poppins-bold text-3xl">
                                {isLoading ? <Skeleton width={80} /> : stats.totalProducts}
                            </div>
                            <div className="text-[#425166]">Total Products</div>
                        </div>
                        <div className="bg-[#F3E8FF] w-44 h-44 p-5 flex flex-col justify-evenly rounded-3xl gap-2">
                            <div>
                                {isLoading ? (
                                    <Skeleton circle width={40} height={40} />
                                ) : (
                                    <img src={customer} alt="customers" className="w-10" />
                                )}
                            </div>
                            <div className="poppins-bold text-3xl">
                                {isLoading ? <Skeleton width={80} /> : stats.totalUsers}
                            </div>
                            <div className="text-[#425166]">Total Customers</div>
                        </div>
                        <div className="bg-[#E2E9FF] w-44 h-44 p-5 flex flex-col justify-evenly rounded-3xl gap-2">
                            <div>
                                {isLoading ? (
                                    <Skeleton circle width={40} height={40} />
                                ) : (
                                    <img src={contacts} alt="contacts" className="w-10" />
                                )}
                            </div>
                            <div className="poppins-bold text-3xl">
                                {isLoading ? <Skeleton width={80} /> : stats.totalContacts}
                            </div>
                            <div className="text-[#425166]">Total Contacts</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
