<template>
    <div class="tags__card bg-dark !p-[15px] rounded-[10px]">
        <div class="tags__card-content">
            <h2 class="tags__card-name text-[24px] text-purple-light">{{ category.name }}</h2>
            <div class="tags__card-container h-[300px] overflow-y-scroll !mt-[20px]">
                <div class="tags__item flex justify-between !mb-[10px]" v-for="(tag) in tags" :key="tag">
                    <div class="tags__item-left">
                        <p class="text !text-[14px]">{{ tag.fullName }}</p>
                        <p class="text !text-[14px] !text-gray-mid">{{ tag.shortName }}</p>
                    </div>
                    <div class="tags__item-right flex justify-between gap-[10px]">
                        <RouterLink :to="`/tags/${category?.id}/update/${tag.id}`">
                            <EditIcon />
                        </RouterLink>
                        <span class="tags__icon cursor-pointer" @click="toggleDeleteModal(tag.shortName, tag.id)">
                            <DeleteIcon />
                        </span>
                    </div>
                </div>
            </div>
            <div class="tags__create">
                <RouterLink :to="`/tags/create/${category.id}`" class="flex gap-[10px] items-center !mt-[20px]">
                    <span class="tags__icon">
                        <CreateIcon />
                    </span>
                    <p class="tags__create-text text-green-mid !text-[24px]">Добавить </p>
                </RouterLink>
            </div>
        </div>
        <Transition name="modal">
            <DeleteModal v-if="isActiveDeleteModal"
                :title='`Удалить тег: "${shortName}?"`'
                text="Вы уверены, что хотите удалить этот тег? Это действие необратимо."
                @closeModal="toggleDeleteModal"
                @deleteModal="handleDeleteTag(tagId)"
            />
        </Transition>
    </div>
</template>

<script setup>

    import { ref } from 'vue';
    import { deleteTag } from '@/entities/tags/lib/api';

    import DeleteIcon from '@/shared/icons/tags/Delete.vue';
    import CreateIcon from '@/shared/icons/tags/Create.vue';
    import EditIcon from '@/shared/icons/tags/Edit.vue';

    import DeleteModal from '@/features/modals/DeleteModal.vue';

    const shortName = ref('');
    const tagId = ref(null);

    const isActiveDeleteModal = ref(false);

    const toggleDeleteModal = (shortNameIndex, tagIdIndex) => {
        shortName.value = shortNameIndex;
        tagId.value = tagIdIndex;

        isActiveDeleteModal.value = !isActiveDeleteModal.value;
    };

    const handleDeleteTag = async (id) => {
        try {
            const deletedTag = await deleteTag(id);
            if (deletedTag) {
                location.reload();
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const props = defineProps({
        category: Object,
        tags: Array
    })
    

</script>