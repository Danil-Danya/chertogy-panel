import api from "@/api/axios.init"

const followOnMaster = async (masterId) => {
    try {
        const response = await api.post(`/follow/${masterId}`);
        return response.data;
    }
    catch (error) {
        throw error
    }
}

const unFollowOnMaster = async (masterId) => {
    try {
        const response = await api.post(`/unfollow/${masterId}`);
        return response.data;
    }
    catch (error) {
        throw error
    }
}

export {
    followOnMaster,
    unFollowOnMaster
}