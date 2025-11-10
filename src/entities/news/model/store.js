import { defineStore } from 'pinia';

import { getNews, getNewsById } from '../lib/api';

export const useNewsStore = defineStore('news', {
    state: () => ({
        news: [],
        currentNews: null,
    }),

    actions: {
        async fetchNews () {
            this.news = await getNews();
        },

        async fetchCurrentNews (id) {
            this.currentNews = await getNewsById(id);
        }
    }
})