<template>
    <section class="news">
        <div class="news__content">
            <h1 class="title">Создать новость</h1>
            <div class="news__form-content flex flex-col items-center justify-center">
                <NewsForm 
                    :newsData="newsData"
                    @update="onFormUpdate"
                    ref="newsFormRef"
                />
                <div class="news__button-container md:w-[75%] w-full !mt-[30px]">
                    <Button text="Сохранить" color="purple" type="button" @click="handleSubmit" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>

    import { useRouter } from 'vue-router';
    import { useUserStore } from '@/entities/users/model/store';
    import { ref, computed, nextTick } from 'vue';
    import { createNews } from '@/entities/news/lib/api';

    import NewsForm from '@/features/forms/NewsForm.vue';
    import Button from '@/shared/ui/Button.vue';

    const userStore = useUserStore();
    const router = useRouter();

    const profile = computed(() => userStore.profile);

    const formPayload = ref({});

    const newsData = ref({
        title: "",
        description: "",
        shortDescription: "",
        file: null,
    });

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

            payload.authorId = profile.value.id;

            for (const [key, val] of Object.entries(payload)) {
                formData.append(key, val);
            }

            const newNews = await createNews(formData);
            if (newNews) {
                router.replace({ path: '/news' });
            }
        }
        catch (error) {
            console.error('ошибка создания новости', error);
        }
    };

</script>