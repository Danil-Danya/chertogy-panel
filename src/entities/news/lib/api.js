import api from "@/api/axios.init";

const getNews = async (params) => {
    try {
        const response = await api.get('/news', {
            params
        });
        return response.data;
    }
    catch (error) {
        console.error("Ошибка при получении новостей:", error);
        throw error;
    }
}

const getNewsById = async (id) => {
    try {
        const response = await api.get(`/news/${id}`);
        return response.data;
    }
    catch (error) {
        console.log(`Ошибка при получении новости с ID ${id}:`, error);
        throw error;
    }
}

const createNews = async (newsData) => {
    try {
        const response = await api.post('/news', newsData);
        return response.data;
    }
    catch (error) {
        console.log(`Ошибка при создании новости:`, error);
        throw error;
    }
}

const updateNews = async (id, newsData) => {
    try {
        const response = await api.put(`/news/${id}`, newsData);
        return response.data;
    }
    catch (error) {
        console.log(`Ошибка при обновлении новости с ID ${id}:`, error);
        throw error;
    }
}

const deleteNews = async (id) => {
    try {
        const response = await api.delete(`/news/${id}`);
        return response.data;
    }
    catch (error) {
        console.log(`Ошибка при удалении новости с ID ${id}:`, error);
        throw error;
    }
}

export {
    getNews,
    getNewsById,
    createNews,
    updateNews,
    deleteNews
}