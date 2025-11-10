import api from '@/api/axios.init.js';

const registration = async (data) => {
    try {
        const response = await api.post('/registration', data);
        return response.data;
    } 
    catch (error) {
        console.log(error.response.data);
        throw error;
    }
};

const login = async (data) => {
    try {
        const response = await api.post('/login', data);
        return response.data;
    } 
    catch (error) {
        console.log(error);
        throw error;
    }
};

const getProfile = async () => {
    try {
        const response = await api.get('/profile');
        return response;
    } 
    catch (error) {
        console.log(error);
        throw error;
    }
};

const resetPassword = async (payload) => {
    try {
        const response = await api.post('/recovery/password', payload);
        return response;
    } 
    catch (error) {
        throw error;
    }
};

const getAllUsers = async (params) => {
    try {
        const response = await api.get('/users', {
            params
        });
        return response.data;
    } 
    catch (error) {
        console.log(error);
    }
};

const getOneUserById = async (id) => {
    try {
        const response = await api.get(`users/${id}`);
        return response.data;
    } 
    catch (error) {
        console.log(error);
        throw error;
    }
};

const updateUserById = async (id, data) => {
    try {
        const updatedUser = await api.put(`/users/${id}`, data);
        return updatedUser.data;
    } 
    catch (error) {
        console.log(error);
        throw error;
    }
};

const updateProfileByUserId = async (id, data) => {
    try {
        const updatedProfile = await api.put(`/profile/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        return updatedProfile.data;
    } 
    catch (error) {
        console.log(error);
        throw error;
    }
};

const deleteUserById = async (id) => {
    try {
        const deletedUser = await api.delete(`/users/${id}`);
        return deletedUser;
    } 
    catch (error) {
        console.log(error);
    }
};

export {
    registration,
    login,
    getProfile,
    resetPassword,
    getAllUsers,
    getOneUserById,
    updateUserById,
    updateProfileByUserId,
    deleteUserById
};
