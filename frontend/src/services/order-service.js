import { myAxios } from './helper';

/**
 * Sends a POST request to create a new order with the provided form data and authentication token.
 *
 * @param {Object} orderData - The order details.
 * @param {string} orderData.name - Customer's name.
 * @param {string} orderData.email - Customer's email address.
 * @param {string} orderData.phone - Customer's phone number.
 * @param {string} orderData.course - Selected course.
 * @param {string} orderData.amount - Payment amount.
 * @param {string} orderData.currency - Currency type (e.g., 'INR').
 * @returns {Promise<Object>} The response from the server.
 */
export const createOrder = async (orderData) => {

    const token = localStorage.getItem('accessToken');

 
    if (!token) {
        console.error('No token found in localStorage');
        throw new Error('Authentication token is required');
    }

    try {
       
        const response = await myAxios.post('/create-order', orderData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
    
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};


export const getAllOrders = async () => {
    const token = localStorage.getItem('accessToken');

    try {
        const response = await myAxios.get('api/orders', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all orders:', error);
        throw error;
    }
};

export const getOrderById = async (orderId) => {
    const token =localStorage.getItem('accessToken');

    try {
        const response = await myAxios.get(`api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching order with ID ${orderId}:`, error);
        throw error;
    }
};


export const getOrdersByEmail = async (email) => {
    const token = localStorage.getItem('accessToken');

    if (!email) {
        throw new Error('Email is required to fetch orders');
    }

    try {
        const response = await myAxios.get(`/api/orders/user/${email}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching orders by email:', error);
        throw new Error('Unable to fetch orders for the provided email');
    }
};
