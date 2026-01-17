<template>
    <section class="tags__create">
        <div class="container">
            <div class="tags__create-content" v-if="tagsStore.tagsCategory && tagsStore.tag">
                <div class="tags__top flex justify-center items-center gap-[30px] md:flex-nowrap flex-wrap !mb-[10px]">
                    <h2 class="title !mb-[30px]">Обновление тега для категории: {{ tagsStore.tagsCategory.name.toLowerCase() }}</h2>
                    <Button class="md:max-w-[100px] max-w-full" color="purple" text="Назад" @click="goToBack" />
                </div>
                <TagsForm 
                    @update="onFormUpdate"
                    :tagsForm="tagsStore.tag"
                />
                <Button text="Обновить тег" color="green" class="!mt-[30px]" @click="updateTags" />
            </div>
        </div>
    </section>
</template>

<script setup>

    import { computed, onBeforeMount, onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useTagsStore } from '@/entities/tags/model/store';

    import { updateTag } from '@/entities/tags/lib/api';

    import TagsForm from '@/features/forms/TagsForm.vue';
    import Button from '@/shared/ui/Button.vue';

    const route = useRoute();
    const router = useRouter();
    const tagsStore = useTagsStore();

    const categoryId = route.params.category_id;
    const tagId = route.params.id;

    const tagsPayload = ref({});

    const onFormUpdate = (data) => {
        tagsPayload.value = data;
    };

    const goToBack = () => {
        router.go(-1)
    }

    const updateTags = async () => {
        try {
            const updatedTag = await updateTag(tagId, tagsPayload.value);
            if (updatedTag) {
                router.replace({ path: '/tags' });
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    onMounted(async () => {
        await tagsStore.fetchCategory(categoryId);
        await tagsStore.fetchTag(tagId);
    })

    onBeforeMount(async () => {
        tagsStore.tagsCategory = null;
        tagsStore.tag = null;
    })

</script>