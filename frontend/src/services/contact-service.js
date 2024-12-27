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

export const sendContactMessage = async (messageData) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found');
    }

    await myAxios.post('/api/contacts', messageData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error('Failed to send message');
  }
};

export const getContacts = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await myAxios.get('/api/contacts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw new Error('Unable to fetch contacts');
  }
};

export const deleteContact = async (contactId) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found');
    }

    await myAxios.delete(`/api/contacts/${contactId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  } catch (error) {
    console.error('Error deleting contact:', error);
    throw new Error('Failed to delete contact');
  }
};


export const getContactById = async (contactId) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await myAxios.get(`/api/contacts/${contactId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching contact details:', error);
    throw new Error('Unable to fetch contact details');
  }
};


export const getContactsByUserId = async (userId) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await myAxios.get(`/api/contacts/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching contacts by user ID:', error);
    throw new Error('Unable to fetch contacts by user ID');
  }
};
