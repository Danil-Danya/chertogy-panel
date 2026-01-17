import api from "@/api/axios.init";

const createGameEvent = async (data) => {
    try {
        const response = await api.post('/games', data);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

const createMeetingEvent = async (data) => {
    try {
        const response = await api.post('/meetings', data);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

const createGameDraft = async (data) => {
    try {
        const response = await api.post('/drafts/games', data);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

const createMeetingDraft = async (data) => {
    try {
        const response = await api.post('/drafts/meetings', data);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

const approveEvent = async (id) => {
    try {
        const response = await api.put(`/events/approve/${id}`);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

const getAllEvents = async (data) => {
    try {
        const response = await api.post('/meetings', data);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

const getOneEvent = async (id) => {
    try {
        const response = await api.get(`/events/target/${id}`);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

const getSubscribeEvents = async (params) => {
    try {
        const response = await api.get('/event/subscriptions', {
            params
        });
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

const getApproveEvents = async (params) => {
    try {
        const response = await api.get('/approval/events', {
            params
        });
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

const deleteEvent = async (id) => {
    try {
        const response = await api.delete(`/events/${id}`);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

const getMasterEvents = async (params) => {
    try {
        const response = await api.get('/master/events', {
            params
        });
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

const updateGameEvent = async (eventId, gameId, data) => {
    try {
        const response = await api.put(`/games/${eventId}/event/${gameId}`, data);
        return response.data;
    }
    catch (error) {
        console.log(error);
        
    }
}

const updateMeetingEvent = async (id, data) => {
    try {
        const response = await api.put(`/meetings/${id}`, data);
        return response;
    }
    catch (error) {
        console.log(error);
    }
}

const unSubscribeEvents = async (userId, eventId) => {
    try {
        const response = await api.post(`/unsubscribe`, {
            userId, 
            eventId
        });
        return response;
    }
    catch (error) {
        console.log(error);
    }
}

export {
    createGameEvent,
    createMeetingEvent,
    approveEvent,
    createGameDraft,
    createMeetingDraft,
    getAllEvents,
    getOneEvent,
    getSubscribeEvents,
    deleteEvent,
    getApproveEvents,
    getMasterEvents,
    updateMeetingEvent,
    unSubscribeEvents,
    updateGameEvent
}