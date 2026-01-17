import api from "@/api/axios.init";

const getTagsCategories = async (params) => {
    try {
        const response = await api.get(`/tags-categories`, {
            params
        });
        return response.data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

const getTagsCategoryById = async (id) => {
    try {
        const response = await api.get(`/tags-categories/${id}`);
        return response.data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

const getTagsCategoryByName = async (name) => {
    try {
        const response = await api.get(`/tags-categories/name/${name}`);
        return response.data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

const getTags = async (params) => {
    try {
        const response = await api.get(`/tags`, {
            params
        });
        return response.data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

const getTagById = async (id) => {
    try {
        const response = await api.get(`/tags/${id}`);
        return response.data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

const createTag = async (data) => {
    try {
        const response = await api.post(`/tags`, data);
        return response.data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

const updateTag = async (id, data) => {
    try {
        const response = await api.put(`/tags/${id}`, data);
        return response.data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

const deleteTag = async (id) => {
    try {
        const response = await api.delete(`/tags/${id}`);
        return response.data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export {
    getTagsCategoryByName,
    getTagsCategoryById,
    getTagsCategories,
    getTagById,
    createTag,
    updateTag,
    deleteTag,
    getTags,
}