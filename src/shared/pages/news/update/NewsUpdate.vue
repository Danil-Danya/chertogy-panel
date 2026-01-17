<template>
    <section class="news">
        <div class="news__content" v-if="currentNews">
            <div class="news__top flex justify-center items-center gap-[30px] md:flex-nowrap flex-wrap !mb-[10px]">
                <h1 class="title">Редактировать новость</h1>
                <Button class="md:max-w-[100px] max-w-full" color="purple" text="Назад" @click="goToBack" />
            </div>
            <div class="news__form-content flex flex-col items-center justify-center">
                <NewsForm 
                    :news-data="currentNews" 
                    @update="onFormUpdate"
                    ref="newsFormRef"
                />
                <div class="news__button-container md:w-[75%] w-full !mt-[30px]">
                    <Button text="Обновить" color="purple" type="button" @click="handleSubmit" />
                    <Button text="Удалить" color="red" type="button" class="!mt-[15px]" @click="toggleDeleteModal" />
                </div>
            </div>
        </div>
    </section>
    <Transition name="modal">
        <DeleteModal v-if="isActiveDeleteModal"
            :title='`Удалить новость: "${currentNews?.title}"`'
            text="Вы уверены, что хотите удалить эту новость? Это действие необратимо."
            @closeModal="toggleDeleteModal"
            @deleteModal="handleDeleteNews"
        />
    </Transition>
</template>

<script setup>

    import { computed, onMounted, ref, nextTick } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    import { useNewsStore } from '@/entities/news/model/store';
    import { updateNews, deleteNews } from '@/entities/news/lib/api';

    import NewsForm from '@/features/forms/NewsForm.vue';
    import Button from '@/shared/ui/Button.vue';

    import DeleteModal from '@/features/modals/DeleteModal.vue';

    const isActiveDeleteModal = ref(false);

    const goToBack = () => {
        router.go(-1)
    }

    const newsStore = useNewsStore();
    const router = useRouter();
    const route = useRoute();

    const newsId = route.params.id;
    const currentNews = computed(() => newsStore.currentNews);

    const toggleDeleteModal = () => {
        isActiveDeleteModal.value = !isActiveDeleteModal.value;
    };

    const handleDeleteNews = async () => {
        try {
            const deletedNews = await deleteNews(newsId);
            
            if (deletedNews) {
                router.push({ path: '/news' });
            }
        }
        catch (error) {
            console.error('ошибка удаления новости', error);
        }
    }

    const formPayload = ref({});

    // const newsData = ref({
    //     title: "",
    //     description: "",
    //     shortDescription: "",
    //     file: null,
    // });

    const onFormUpdate = (data) => {
        formPayload.value = data;
    };

    const newsFormRef = ref();

    const handleSubmit = async () => {
        newsFormRef.value?.submitForm?.();
        await nextTick();

        try {
            const payload = formPayload.value;
            const formData = new FormData();

            for (const [key, val] of Object.entries(payload)) {
                formData.append(key, val);
            }

            const newNews = await updateNews(newsId, formData);
            if (newNews) {
                router.replace('/news');
            }
        }
        catch (error) {
            console.error('ошибка создания новости', error);
        }
    };

    onMounted(async () => {
        await newsStore.fetchCurrentNews(newsId);
    });

</script>