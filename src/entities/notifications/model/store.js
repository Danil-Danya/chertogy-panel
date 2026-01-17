import { defineStore } from "pinia";
import { getNotificationById, getNotifications } from "../lib/api";

export const useNotificationsStore = defineStore('notifications', {
    state: () => ({
        notifications: [],
        notification: null
    }),

    actions: {
        async fetchNotifications () {
            this.notifications = await getNotifications();
        },

        async fetchOneNotification (id) {
            this.notification = await getNotificationById(id);
        }
    }
})