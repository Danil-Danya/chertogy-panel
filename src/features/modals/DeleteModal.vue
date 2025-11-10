<template>
    <div class="modal w-full h-full fixed top-0 left-0 z-[999999]"
        style="
            background: #0000005b;
            backdrop-filter: blur(3px);
        "
    >
        <div class="modal__window h-full ">
            <div class="container h-full">
                <div class="modal__content h-full flex justify-center items-center grow-1">
                    <div class="modal__delete w-[50%] bg-dark rounded-[8px] !p-[30px]">
                        <h3 class="modal__delete-title title !text-left !text-[32px]">{{ title }}</h3>
                        <p class="modal__delete-text text !m-[20px_0]">{{ text }}</p>
                        <div class="modal__delete-buttons flex gap-[20px]">
                            <Button color="red" class="!w-[140px]" text="Удалить" @click="onDelete"/>
                            <Button color="blue" class="!w-[140px]" text="закрыть" @click="onCloseModal" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

    import Button from '@/shared/ui/Button.vue';

    import { defineEmits } from 'vue';
    
    const emits = defineEmits(['closeModal','deleteModal']);

    const props = defineProps({
        title: {
            type: String,
            required: true
        },

        text: {
            type: String,
            required: true
        },
    })

    const onDelete = () => {
        emits('deleteModal');
    };

    const onCloseModal = () => {
        emits('closeModal');
    };

</script>