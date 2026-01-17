import { defineStore } from "pinia";
import { getApproveEvents, getMasterEvents, getOneEvent, getSubscribeEvents } from "../lib/api";

export const useEventsStore = defineStore('events', {
    state: () => ({
        events: [],
        event: null
    }),

    actions: {
        async fetchMasterEvents (params) {
            this.events = await getMasterEvents(params);
        },

        async fetchSubscribeEvents (params) {
            this.events = await getSubscribeEvents(params);
        },

        async fetchApproveEvent (params) {
            this.events = await getApproveEvents(params);
        },

        async fetchEvent (id) {
            this.event = await getOneEvent(id);
        }
    }
})