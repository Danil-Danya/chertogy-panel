import { defineStore } from "pinia";
import { getTagById, getTags, getTagsCategories, getTagsCategoryById } from "../lib/api";

export const useTagsStore = defineStore('tags', {
    state: () => ({
        tagsCategories: null,
        tagsCategory: null,
        tags: null,
        tag: null
    }),

    actions: {
        async fetchCategories (params) {
            this.tagsCategories = await getTagsCategories(params);
        },

        async fetchCategory (id) {
            this.tagsCategory = await getTagsCategoryById(id);
        },

        async fetchTags (params) {
            this.tags = await getTags(params);
        },

        async fetchTag (id) {
            this.tag = await getTagById(id);
        }
    }
})