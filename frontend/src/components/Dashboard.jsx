import React, { useEffect, useState } from "react";
import { getOrdersByEmail } from "../services/order-service";
import { getContactsByUserId } from "../services/contact-service";
import { getFeedbacksByUserId } from "../services/feedback-service";
import { getUserDetails } from "../services/user-service";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import sales from "../assets/sales.png";
import order from "../assets/order.png";
import customer from "../assets/cutomer.png";
import Admintop from "./Utilities/Admintop";
import contactsImg from "../assets/contacts.png";
import Usersidenav from "./Utilities/Usersidenav";
import FeedbackList from "./User components/Feedbacklist";
import Contactlist from "./User components/Contactlist";
import Orderlist from "./User components/Orderlist";

const Dashboard = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            const userDetails = await getUserDetails();
            const { userId, email } = userDetails || {}; // Extract only `userId`

            if (!userId) {
                throw new Error("User details are incomplete");
            }

            // Fetch contacts
            const fetchedContacts = await getContactsByUserId(userId);
            setContacts(fetchedContacts);

            // Fetch feedbacks
            const fetchedFeedbacks = await getFeedbacksByUserId(userId);
            setFeedbacks(fetchedFeedbacks);

            const fetchedOrders = await getOrdersByEmail(email);
            setOrders(fetchedOrders);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const totalSales = orders.reduce((sum, order) => {
        // Only add the amount if the order status is 'completed'
        return order.orderStatus === 'COMPLETED' ? sum + (order.amount || 0) : sum;
    }, 0);

    const totalOrders = orders.filter(order => order.orderStatus === 'COMPLETED').length;

    const totalFeedbacks = feedbacks.length;
    const totalContacts = contacts.length;

    return (
        <div className="flex justify-between bg-[#F9FAFB] poppins-regular h-screen">
            <Usersidenav />
            <div className="w-full overflow-auto">
                <Admintop />
                <div className="flex">
                    <div className="bg-[white] p-10 gap-5 inline-block rounded-3xl m-10 w-[70%]">
                        <div>
                            <div className="font-semibold text-lg">
                                {`Welcome back !`}
                            </div>

                            <div className="text-[#737791]">Here's a quick look at your activity</div>
                        </div>
                        <div className="flex gap-5 mt-10">
                            <div className="flex gap-5">
                                <div className="bg-[#FFE2E5] w-44 h-44 p-5 flex flex-col justify-evenly rounded-3xl gap-2">
                                    <div>
                                        {isLoading ? (
                                            <Skeleton circle width={40} height={40} />
                                        ) : (
                                            <img src={sales} alt="sales" className="w-10" />
                                        )}
                                    </div>
                                    <div className="poppins-bold text-3xl">
                                        {isLoading ? <Skeleton width={80} /> : `₹${totalSales}`}
                                    </div>
                                    <div className="text-[#425166]">Total Purchase</div>
                                </div>
                                <div className="bg-[#FFF4DE] w-44 h-44 p-5 flex flex-col justify-evenly rounded-3xl gap-2">
                                    <div>
                                        {isLoading ? (
                                            <Skeleton circle width={40} height={40} />
                                        ) : (
                                            <img src={order} alt="orders" className="w-10" />
                                        )}
                                    </div>
                                    <div className="poppins-bold text-3xl">
                                        {isLoading ? <Skeleton width={80} /> : totalOrders}
                                    </div>
                                    <div className="text-[#425166]">Total Orders</div>
                                </div>
                            </div>
                            <div className="flex gap-5">
                                <div className="bg-[#F3E8FF] w-44 h-44 p-5 flex flex-col justify-evenly rounded-3xl gap-2">
                                    <div>
                                        {isLoading ? (
                                            <Skeleton circle width={40} height={40} />
                                        ) : (
                                            <img src={customer} alt="customers" className="w-10" />
                                        )}
                                    </div>
                                    <div className="poppins-bold text-3xl">
                                        {isLoading ? <Skeleton width={80} /> : totalFeedbacks}
                                    </div>
                                    <div className="text-[#425166]">Total Feedbacks</div>
                                </div>
                                <div className="bg-[#E2E9FF] w-44 h-44 p-5 flex flex-col justify-evenly rounded-3xl gap-2">
                                    <div>
                                        {isLoading ? (
                                            <Skeleton circle width={40} height={40} />
                                        ) : (
                                            <img src={contactsImg} alt="contacts" className="w-10" />
                                        )}
                                    </div>
                                    <div className="poppins-bold text-3xl">
                                        {isLoading ? <Skeleton width={80} /> : totalContacts}
                                    </div>
                                    <div className="text-[#425166]">Total Contacts</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Orderlist />
                <FeedbackList />
                <Contactlist />
            </div>
        </div>
    );
};

export default Dashboard;
