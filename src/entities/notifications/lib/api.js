import api from "@/api/axios.init";

const getNotifications = async () => {
    try {
        const response = await api.get('/notification/user', {
            params: {
                include: false,
                page: 1,
                limit: 100000
            }
        });
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

const getNotificationById = async (id) => {
    try {
        const response = await api.get(`/notification/${id}`);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

export {
    getNotifications,
    getNotificationById
}