import { defineStore } from 'pinia';

import { getNews, getNewsById } from '../lib/api';

export const useNewsStore = defineStore('news', {
    state: () => ({
        news: [],
        currentNews: null,
    }),

    actions: {
        async fetchNews (params) {
            this.news = await getNews(params);
        },

        async fetchCurrentNews (id) {
            this.currentNews = await getNewsById(id);
        }
    }
})