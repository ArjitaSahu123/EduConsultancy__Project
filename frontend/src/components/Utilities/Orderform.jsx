import React, { useState, useEffect } from 'react';  
import { createOrder } from '../../services/order-service';
import { toast } from 'react-toastify';

/* global Razorpay */
const Orderform = ({ prefilledData, onClose }) => {
    useEffect(() => {
        // Dynamically load the Razorpay script
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => {
            console.log("Razorpay script loaded successfully");
        };
        script.onerror = () => {
            console.error("Failed to load Razorpay script");
        };
        document.body.appendChild(script);

        return () => {
      
            document.body.removeChild(script);
        };
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        course: prefilledData?.course || '',
        amount: prefilledData?.amount || '',
        currency: 'INR',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Create the order by sending the form data
            const order = await createOrder(formData);

            const options = {
                key:process.env.RAZORPAY_KEY, 
                amount: order.amount, 
                currency: 'INR', 
                name: "Edu Consultancy", 
                description: 'Course Payment', 
                order_id: order.razorpayOrderId, 
                receipt: order.email, 
                "callback_url":"http://localhost:5171/handle-payment-callback",     //changed 8080 to 5171
                "prefill": {
                    "name": order.name,
                    "email": order.email,
                    "contact": order.phone
                  },
                "theme":{
                    "color":"#3399cc"
                }
            };

        
            const rzp1 = new Razorpay(options);
            rzp1.open();

            if (onClose) onClose();

            // toast.success('Order created successfully!');
        } catch (error) {
            toast.error('Failed to create order. Please try again.');
            console.error('Error submitting order:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-[30%] ">
            <h2 className="text-xl font-bold mb-4">Place Order</h2>

            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border  rounded-lg p-2"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border  rounded-lg p-2"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 font-medium">Phone</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border  rounded-lg p-2"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="course" className="block text-gray-700 font-medium">Course</label>
                <input
                    type="text"
                    id="course"
                    name="course"
                    value={formData.course}
                    readOnly
                    className="w-full border  rounded-lg p-2 bg-gray-100"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="amount" className="block text-gray-700 font-medium">Amount</label>
                <input
                    type="text"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    readOnly
                    className="w-full border  rounded-lg p-2 bg-gray-100"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="currency" className="block text-gray-700 font-medium">Currency</label>
                <input
                    type="text"
                    id="currency"
                    name="currency"
                    value={formData.currency}
                    readOnly
                    className="w-full border  rounded-lg p-2 bg-gray-100"
                />
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 btn"
            >
                Submit
            </button>

            <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg ml-2  btn"
            >
                Cancel
            </button>
        </form>
    );
};

export default Orderform;
