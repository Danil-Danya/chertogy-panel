<template>
    <sections class="tags">
        <div class="tags__container flex flex-wrap justify-between !p-[30px] gap-[20px] rounded-[10px]" v-if="tagsStore.tagsCategories"
            style="background: radial-gradient(103.75% 60.01% at 51.36% 54.36%, rgba(44, 38, 47, 0.30) 0%, rgba(21, 21, 22, 0.30) 100%);"
        >
            <TagsCard class="md:w-[260px] w-full"
                v-for="category in tagsStore.tagsCategories.rows" 
                :key="category"
                :category="category"
                :tags="category.tags"
            />
        </div>
    </sections>
</template>

<script setup>

    import { onMounted } from 'vue';
    import { useTagsStore } from '@/entities/tags/model/store';

    import TagsCard from '@/widgets/cards/TagsCard.vue';

    const tagsStore = useTagsStore();

    onMounted(async () => {
        await tagsStore.fetchCategories({ include: true });
    })

</script>