import axios from "axios";

// export const BASE_URL = 'http://localhost:8080';
export const BASE_URL = 'http://localhost:5171';

export const myAxios = axios.create({
    baseURL: BASE_URL
});

export const signUp = (user) => {
    console.log(user);
    return myAxios.post('api/auth/register', user).then((response) => response.data);
};


// // SignIn Method
// export const signin = async (data) => {
//     try {
//         // Make the login request
//         const response = await myAxios.post('api/auth/login', data);

//         // Save tokens to localStorage
//         localStorage.setItem('accessToken', response.data.accessToken);
//         localStorage.setItem('refreshToken', response.data.refreshToken);

//         // Get user details after login
//         const userResponse = await myAxios.get('/api/auth/me', {
//             headers: {
//                 Authorization: `Bearer ${response.data.accessToken}`
//             }
//         });

//         // Return both token and user details
//         return { ...response.data, user: userResponse.data };
//     } catch (error) {
//         // Handle errors from the API
//         throw error.response ? error.response.data : { message: "Server error" };
//     }
// };
export const signin = async (data) => {
    try {
        const response = await myAxios.post('api/auth/login', data);
        const { accessToken, refreshToken } = response.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        const userResponse = await myAxios.get('/api/auth/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return { accessToken, refreshToken, user: userResponse.data };
    } catch (error) {
        throw error.response ? error.response.data : { message: "Server error" };
    }
};

export const sendOtp = async (email) => {
    try {
        const response = await myAxios.post(`${BASE_URL}/forgotPassword/verifyMail/${email}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to request OTP");
    }
};

export const verifyOtp = async (otp, email) => {
    try {
        const response = await myAxios.post(`${BASE_URL}/forgotPassword/verifyOtp/${otp}/${email}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "OTP verification failed");
    }
};

export const changePassword = async (email, password, repeatPassword) => {
    try {
        const payload = { password, repeatPassword };

        const response = await myAxios.post(`${BASE_URL}/forgotPassword/changePassword/${email}`, payload);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Password change failed");
    }
};


export const getUserDetails = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        throw new Error('No access token found');
    }

    try {
        const response = await myAxios.get('/api/auth/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getUserById = async (userId) => {
    try {
        const token = localStorage.getItem('accessToken');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await myAxios.get(`/api/users/${userId}`, { headers });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch user details');
    }
};

export const getAllUsers = async () => {
    try {
        const token = localStorage.getItem('accessToken');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await myAxios.get('/api/users', { headers });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch users');
    }
};

export const deleteUser = async (userId) => {
    try {
        const token = localStorage.getItem('accessToken');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await myAxios.delete(`/api/users/${userId}`, { headers });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to delete user');
    }
};
