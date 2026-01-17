<template>
    <section class="tags__create">
        <div class="container">
            <div class="tags__create-content" v-if="tagsStore.tagsCategory">
                <div class="tags__top flex justify-center items-center gap-[30px] md:flex-nowrap flex-wrap !mb-[10px]">
                    <h2 class="title !mb-[30px]">Создание тега для категории: {{ tagsStore.tagsCategory.name.toLowerCase() }}</h2>
                    <Button class="md:max-w-[100px] max-w-full" color="purple" text="Назад" @click="goToBack" />
                </div>
                <TagsForm 
                    @update="onFormUpdate"
                    :tagsForm="tagsData"
                />
                <Button text="Создать тег" color="green" class="!mt-[30px]" @click="createTags" />
            </div>
        </div>
    </section>
</template>

<script setup>

    import { onBeforeMount, onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useTagsStore } from '@/entities/tags/model/store';

    import { createTag } from '@/entities/tags/lib/api';

    import TagsForm from '@/features/forms/TagsForm.vue';
    import Button from '@/shared/ui/Button.vue';

    const route = useRoute();
    const router = useRouter();
    const tagsStore = useTagsStore();

    const categoryId = route.params.category_id;

    const tagsPayload = ref({});

    const tagsData = ref({
        fullName: '',
        shortName: '',
    });

    const goToBack = () => {
        router.go(-1)
    }

    const onFormUpdate = (data) => {
        tagsPayload.value = data;
    };

    const createTags = async () => {
        try {
            tagsPayload.value.categoriesId = categoryId;

            const newTag = await createTag(tagsPayload.value);
            if (newTag) {
                router.replace({ path: '/tags' });
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    onMounted(async () => {
        await tagsStore.fetchCategory(categoryId);
    })

    onBeforeMount(async () => {
        tagsStore.tagsCategory = null;
    })

</script>