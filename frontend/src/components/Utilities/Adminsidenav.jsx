import React from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
// import { getUserDetails } from '../services/user-service';  

// ==== IMAGES ====
// import lineGraph from "../../assets/Vector.png";
import pieChart from "../../assets/Graph 2.png";
import cart from "../../assets/Icon.png";
// import setting from "../../assets/mdi_cog-outline.png";
import message from "../../assets/mdi_message-processing-outline.png";
import bag from "../../assets/mdi_shopping-outline.png";
import signout from "../../assets/Sign Out Icon.png";
// import chartLine from "../../assets/Chart_Line.png";
import usersgrp from "../../assets/usersgrp.png"
import chat from "../../assets/chat.png"
import gradcap from "../../assets/gradcap.png"
import blogicon from "../../assets/blogicon.png"
// =================

const Adminsidenav = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    // const [user, setUser] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    const handleLogout = () => {
        const toastId = toast.loading("Logging out...");

        setTimeout(() => {
            logout();
            toast.update(toastId, {
                render: "Logged out successfully!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });

            navigate("/", { replace: true });
        }, 2000);
    };


    return (
        <div className="p-10 poppins-regular bg-[white] h-screen sticky top-0 z-10">
            <ul className="flex flex-col gap-5 items-start">
                <div className="flex justify-center items-center gap-2">
                    <div className="bg-orange py-3 px-2 rounded-lg flex justify-center items-center">
                        <img src={gradcap} alt="Pie Chart" className="w-10 h-8" />
                    </div>
                    <div className="text-xl font-semibold  whitespace-nowrap">Edu Consultancy</div>
                </div>
                <div className="line w-full"></div>
                <NavLink
                    to="/admin/dashboard"
                    className="flex items-center justify-start py-4 w-60 gap-2 rounded-xl cursor-pointer navbtn bg-orange text-white"
                >
                    <img src={pieChart} alt="Pie Chart" className="w-7 h-7 ml-4" />
                    <div>Dashboard</div>
                </NavLink>
                <NavLink
                    to="/admin/users"
                    className="flex items-center justify-start py-4 w-60 gap-2 rounded-xl cursor-pointer navbtn"
                >
                    <img src={usersgrp} alt="Line Graph" className="w-8 h-6 ml-4" />
                    <div className="ml-2">Users</div>
                </NavLink>
                <NavLink
                    to="/admin/subscriptions"
                    className="flex items-center justify-start py-4 w-60 gap-2 rounded-xl cursor-pointer navbtn"
                >
                    <img src={cart} alt="Cart" className="w-6 h-6 ml-4" />
                    <div className="ml-2">Subscriptions</div>
                </NavLink>
                <NavLink
                    to="/admin/blogs"
                    className="flex items-center justify-start py-4 w-60 gap-2 rounded-xl cursor-pointer navbtn"
                >
                    <img src={blogicon} alt="Settings" className="w-6 h-6 ml-4" />
                    <div className="ml-2">Blogs</div>
                </NavLink>
                <NavLink
                    to="/admin/contacts"
                    className="flex items-center justify-start py-4 w-60 gap-2 rounded-xl cursor-pointer navbtn"
                >
                    <img src={message} alt="Messages" className="w-6 h-6 ml-4" />
                    <div className="ml-2">Contacts</div>
                </NavLink>
                <NavLink
                    to="/admin/products"
                    className="flex items-center justify-start py-4 w-60 gap-2 rounded-xl cursor-pointer navbtn"
                >
                    <img src={bag} alt="Bag" className="w-6 h-6 ml-4" />
                    <div className="ml-2">Products</div>
                </NavLink>
                <NavLink
                    to="/admin/feedbacks"
                    className="flex items-center justify-start py-4 w-60 gap-2 rounded-xl cursor-pointer navbtn"
                >
                    <img src={chat} alt="Sign Out" className="w-7 h-6 ml-4" />
                    <div className="ml-2">Feedback</div>
                </NavLink>
                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center navbtn"
                >
                    <img src={signout} alt="Chart Line" className="w-8 h-8 ml-4" />
                    <div className="ml-4">Log out</div>
                </button>
            </ul>
        </div>
    );
};

export default Adminsidenav;
