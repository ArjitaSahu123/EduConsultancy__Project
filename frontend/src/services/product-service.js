import { myAxios } from "./helper";

export const getAllProducts = async () => {
    try {
        const token = localStorage.getItem('accessToken');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await myAxios.get('/api/product/all', { headers });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to fetch products");
    }
};

export const getUserId = async () => {
    try {
        const token = localStorage.getItem('accessToken');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await myAxios.get('/api/auth/me', { headers });
        return response.data.userId;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to fetch user info");
    }
};

export const addProduct = async (formData) => {
    try {
        const token = localStorage.getItem('accessToken');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await myAxios.post('/api/product/add-product', formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to add the product");
    }
};

export const deleteProduct = async (productId) => {
    try {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No access token found');
        }

        const response = await myAxios.delete(`/api/product/delete/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to delete the product';
        throw new Error(errorMessage);
    }
};

export const updateProduct = async (productId, formData) => {
    try {
        const token = localStorage.getItem('accessToken');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await myAxios.put(`/api/product/update/${productId}`, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to update the product");
    }
};

export const getProductById = async (productId) => {
    try {
        const token = localStorage.getItem('accessToken');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await myAxios.get(`/api/product/${productId}`, { headers });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to fetch the product");
    }
};
