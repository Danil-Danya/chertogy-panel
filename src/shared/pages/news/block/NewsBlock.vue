<template>
    <section class="news">
        <div class="news__container">
            <Button text="Создать Новость" color="purple" link="/news/create" type="link" />
        </div>
        <div class="news__content flex flex-wrap gap-[30px] !mt-[30px]">
            <div class="news__item w-[45%]" v-for="news in newsList" :key="news.id">
                <RouterLink :to="`/news/update/${news.id}`">
                    <img :src="`${imageUrl}/${news.previewPath}`" alt="картинка" class="news__img h-[200px] w-full">
                    <h2 class="news__title text-white text-[32px]">{{ news.title }}</h2>
                </RouterLink>
            </div>
        </div>
    </section>
</template>

<script setup>

    import { computed, onMounted } from 'vue';
    import { useNewsStore } from '@/entities/news/model/store';

    import Button from '@/shared/ui/Button.vue';

    const imageUrl = import.meta.env.VITE_APP_IMAGE_URL;

    const newsStore = useNewsStore();
    const newsList = computed(() => newsStore.news.rows);
    
    onMounted(async () => {
        await newsStore.fetchNews();
    });

</script>