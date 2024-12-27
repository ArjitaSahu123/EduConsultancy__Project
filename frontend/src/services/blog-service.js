import { myAxios } from "./helper";

export const getAllBlogs = async () => {
    try {
        const token = localStorage.getItem('accessToken');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await myAxios.get('/api/blog/all', { headers });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to fetch blogs");
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

export const publishBlog = async (formData) => {
    try {
        const token = localStorage.getItem('accessToken');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await myAxios.post('/api/blog/add-blog', formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to publish the blog");
    }
};


export const deleteBlog = async (blogId) => {
    try {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No access token found');
        }

        const response = await myAxios.delete(`/api/blog/delete/${blogId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to delete the blog';
        throw new Error(errorMessage);
    }
};

export const updateBlog = async (blogId, formData) => {
    try {
        const token = localStorage.getItem('accessToken');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await myAxios.put(`/api/blog/update/${blogId}`, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to update the blog");
    }
};


export const getBlogById = async (blogId) => {
    try {
        const token = localStorage.getItem('accessToken');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await myAxios.get(`/api/blog/${blogId}`, { headers });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to fetch the blog");
    }
};