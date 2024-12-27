import { myAxios } from './helper';

export const getUserId = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await myAxios.get('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.userId;
  } catch (error) {
    console.error('Error fetching user ID:', error);
    throw new Error('Unable to fetch user information');
  }
};

export const sendFeedbackMessage = async (feedbackData) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found');
    }

    await myAxios.post('/api/feedbacks', feedbackData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error sending feedback:', error);
    throw new Error('Failed to send feedback');
  }
};

// export const getFeedbacks = async () => {
//   try {
//     const token = localStorage.getItem('accessToken');
//     if (!token) {
//       throw new Error('No access token found');
//     }

//     const response = await myAxios.get('/api/feedbacks', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error('Error fetching feedbacks:', error);
//     throw new Error('Unable to fetch feedbacks');
//   }
// };
export const getFeedbacks = async () => {
  try {
    const response = await myAxios.get('/api/feedbacks');

    return response.data;
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    throw new Error('Unable to fetch feedbacks');
  }
};

export const deleteFeedback = async (feedbackId) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found');
    }

    await myAxios.delete(`/api/feedbacks/${feedbackId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    throw new Error('Failed to delete feedback');
  }
};

export const getFeedbackById = async (feedbackId) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await myAxios.get(`/api/feedbacks/${feedbackId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching feedback details:', error);
    throw new Error('Unable to fetch feedback details');
  }
};


export const getFeedbacksByUserId = async (userId) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await myAxios.get(`/api/feedbacks/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching feedbacks by user ID:', error);
    throw new Error('Unable to fetch feedbacks by user ID');
  }
};
