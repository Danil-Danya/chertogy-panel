import { defineStore } from "pinia";
import { getAllUsers, getOneUserById, getProfile } from "../lib/api";

export const useUserStore = defineStore('users', {
    state: () => ({
        profile: null,
        users: null,
        user: null,
    }),

    actions: {
        async fetchProfile () {
            const profile = await getProfile();
            this.profile = { ...profile.data };
        },

        async fetchUser (id) {
            this.user = await getOneUserById(id);
        },

        async fetchUsers (params) {
            this.users = await getAllUsers(params);
        }
    }
})