<template>
    <section class="news">
        <div class="news__container">
            <Button text="Создать Новость" color="purple" link="https://xn----dtbbbhdau6cfpgt1e.xn--p1ai/panel/news/create" type="link" />
        </div>
        <div class="news__content flex flex-wrap gap-[30px] !mt-[30px]">
            <div class="news__item w-full md:w-[45%]" v-for="news in newsList" :key="news.id">
                <RouterLink :to="`/news/update/${news.id}`">
                    <img :src="`${imageUrl}/${news.previewPath}`" alt="картинка" class="news__img md:h-[400px] w-[400px] rounded-[10px]" :class="`h-[${innerWidth}]`">
                    <h2 class="news__title text-white text-[32px]">{{ news.title }}</h2>
                </RouterLink>
            </div>
        </div>
    </section>
</template>

<script setup>

    import { computed, onMounted, ref } from 'vue';
    import { useNewsStore } from '@/entities/news/model/store';

    import Button from '@/shared/ui/Button.vue';

    const imageUrl = import.meta.env.VITE_APP_IMAGE_URL;

    const newsStore = useNewsStore();
    const newsList = computed(() => newsStore.news.rows);

    const innerWidth = ref(0);
    
    onMounted(async () => {
        await newsStore.fetchNews();

        innerWidth.value = window.innerWidth;
    });

</script>