<template>
    <div class="upload border border-dashed border-purple-mid bg-blackish !p-[24px] rounded-[5px] cursor-pointer"
        @dragover.prevent="onDragOver"
        @dragenter.prevent="onDragEnter"
        @dragleave.prevent="onDragLeave"
        @drop.prevent="onDrop"
        :class="{
            'border-red-500': fileError.message
        }"
    >
        <div class="upload__container relative w-full flex flex-col items-center justify-center gap-[10px]">
            <img :src="previewUrl" alt="Вывод картинки" class="absolute w-full h-full rounded-[5px] opacity-[0.5]" v-if="previewUrl">
            <input type="file" id="file" class="upload__input absolute w-full h-full cursor-pointer z-[99]" @change="onFileChange" />
            <span class="upload__icon !mt-[10px] relative z-[2]">
                <UploadInputIcon />
            </span>
            <h3 class="upload__title title !text-[20px] relative z-[2]">Нажмите для выбора изображения, либо перетащите его</h3>
            <p class="upload__text text-[14px] !mt-[30px] text-purple-mid text-center relative z-[2]"
                :class="{
                    'text-red-500': fileError.message
                }"
            >
                Формат jpeg, jpg, png, весом не более 1 MB и размером не более 2000 × 200
            </p>
        </div>
    </div>
    <p class="message text-red-500 text-[14px]" v-if="fileError.message">{{ fileError.message }}</p>
</template>

<script setup>

    import { computed, reactive, ref } from 'vue';

    import UploadInputIcon from '@/shared/icons/ui/UploadInputIcon.vue';

    const file = ref({});
    const fileError = ref({});
    const previewUrl = ref(null);
    const isDragging = ref(false);
    const fileInput = ref(null);

    const onFileChange = (event) => {
        const fileUpload = event.target.files[0];

        if (!fileUpload.type.startsWith("image/")) {
            fileError.value = {
                message: 'Неверный формат файла. Пожалуйста, выберите изображение.',
                type: 'error'
            }

            return;
        }
        
        file.value = fileUpload;
        previewUrl.value = URL.createObjectURL(fileUpload);
    }

    const onDragEnter = () => { isDragging.value = true }
    const onDragOver = () => { isDragging.value = true }
    const onDragLeave = () => { isDragging.value = false }

    const onDrop = (event) => {
        isDragging.value = false;
        const files = event.dataTransfer && event.dataTransfer.files;

        if (!files || !files.length) {
            return;
        }

        onFileChange({ target: { files } });
    }

</script>