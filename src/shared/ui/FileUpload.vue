<template>
    <div class="upload border border-dashed border-purple-mid bg-blackish !p-[24px] rounded-[5px] cursor-pointer"
        @dragover.prevent="onDragOver"
        @dragenter.prevent="onDragEnter"
        @dragleave.prevent="onDragLeave"
        @drop.prevent="onDrop"
        :class="{
            'border-red-500': fileError
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
                    'text-red-500': fileError
                }"
            >
                Формат jpeg, jpg, png, весом не более 10 MB и размером не более 3000 × 3000
            </p>
        </div>
    </div>
    <p class="message text-red-500 text-[14px]" v-if="fileError">{{ fileError }}</p>
</template>

<script setup>

    import { ref, watch } from 'vue';
    import UploadInputIcon from '@/shared/icons/ui/UploadInputIcon.vue';

    const file = ref({});
    const fileError = ref(null);
    const previewUrl = ref(null);
    const isDragging = ref(false);
    
    const emit = defineEmits(['update:file']);

    const validateFileInput = async (fileUpload) => {
        if (!fileUpload.type.startsWith("image/")) {
            fileError.value = 'Неверный формат файла. Пожалуйста, выберите изображение.';
        }

        if (!["image/jpeg", "image/png", "image/jpg"].includes(fileUpload.type)) {
            fileError.value = "Разрешены только JPEG и PNG";
        }

        if (fileUpload.size > 10 * 1024 * 1024) {
            fileError.value = "Файл должен быть меньше 10 MB";
        }

        const isValid = await checkSizeImage(fileUpload);

        if (!isValid) {
            fileError.value = "Изображение слишком большое";
        }
    }

    const checkSizeImage = async (fileUpload) => {
        return new Promise((resolve) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const img = new Image();

                img.onload = () => {
                    resolve(img.width <= 3000 && img.height <= 3000);
                };

                img.onerror = () => resolve(false);
                img.src = e.target.result;
            };

            reader.onerror = () => resolve(false);
            reader.readAsDataURL(fileUpload);
        });
    }

    const onFileChange = async (event) => {
        const fileUpload = event.target.files[0];

        fileError.value = null;

        if (!fileUpload) return;
        
        await validateFileInput(fileUpload);

        if (!fileError.value) {
            file.value = fileUpload;
            previewUrl.value = URL.createObjectURL(fileUpload);

            emit('update:file', fileUpload)
        }
    }

    const onDragEnter = () => { isDragging.value = true }
    const onDragOver = () => { isDragging.value = true }
    const onDragLeave = () => { isDragging.value = false }

    const onDrop = (event) => {
        isDragging.value = false;
        const files = event.dataTransfer && event.dataTransfer.files;

        if (files && files.length) {
            onFileChange({ target: { files } });
        }
    }

    const props = defineProps({
        submitAttempted: Boolean,
        file: [File, String, null],
    });

    watch(
        () => props.submitAttempted,
        (attempted) => {
            if (attempted && !props.file) {
                fileError.value = 'Пожалуйста, загрузите изображение';
            }
        }
    );

    watch(
        () => props.file,
        (value) => {
            if (!value) {
                previewUrl.value = null;
                return;
            }

            if (value instanceof File) {
                previewUrl.value = URL.createObjectURL(value);
                return;
            }

            if (typeof value === 'string') {
                if (value.startsWith('http')) {
                    previewUrl.value = value;
                } 
                else {
                    previewUrl.value = `${import.meta.env.VITE_APP_IMAGE_URL}/${value}`;
                }
            }
        },
        { immediate: true }
    );



</script>