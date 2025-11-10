<template>
    <form action="" class="news__form md:w-[75%] w-full" @submit.prevent="submitForm">
        <div class="news__form-container">
            <Input
                v-model="payloadNews.title"
                label="Заголовок новости"
                placeholder="Был открыт новый дандж..."
                class="!mb-[30px]"
                :message="vNews$?.title ? fieldMessage(vNews$.title) : null"
                @blur="vNews$?.title?.$touch()"
            />

            <Input
                v-model="payloadNews.shortDescription"
                label="Краткое описание"
                placeholder="Открытие новой точки в серверной столице позволило нам..."
                class="!mb-[30px]"
                :message="vNews$?.shortDescription ? fieldMessage(vNews$.shortDescription) : null"
                @blur="vNews$?.shortDescription?.$touch()"
            />

            <TextArea
                v-model="payloadNews.description"
                class="!mb-[30px]"
                label="Полное описание"
                placeholder="Сегодня в 12:00 по МСК была открыта новая точка.."
                @blur="vNews$?.description?.$touch()"
                :message="vNews$?.description
                    ? fieldMessage(vNews$.description) || { type: 'warning', text: 'Не более 1500 символов' }
                    : { type: 'warning', text: 'Не более 1500 символов' }"
            />
            <FileUpload 
                :file="payloadNews.file"
                @update:file="onFileSelected"
                class="!mb-[30px]"
            />
        </div>
    </form>
</template>

<script setup>
    
    import { reactive, watch, ref } from "vue";
    import { useValidation } from "@/composables/useValidation";
    import { newsRules } from "@/entities/news/model/form";

    import Input from '@/shared/ui/Input.vue';
    import TextArea from '@/shared/ui/TextArea.vue';
    import FileUpload from '@/shared/ui/FileUpload.vue';

    const emit = defineEmits(["update"]);

    const props = defineProps({
        newsData: {
            type: Object,
            default: () => ({
                title: "",
                description: "",
                shortDescription: "",
                file: null,
            }),
        },
    });

    const payloadNews = reactive({
        title: props.newsData.title,
        description: props.newsData.description,
        shortDescription: props.newsData.shortDescription,
    });

    const file = ref(props.newsData.file || null);

    const validateNews = useValidation(() => newsRules(payloadNews), payloadNews);
    const vNews$ = validateNews.v$;
    const fieldMessage = validateNews.fieldMessage;

    watch(
        [payloadNews, file],
        () => {
            emit("update", { ...payloadNews, file: file.value });
        },
        { deep: true }
    );

    const onFileSelected = (uploadedFile) => {
        file.value = uploadedFile;
    };

    const submitForm = () => {
        vNews$.value.$touch();
        if (vNews$.value.$invalid) {
            return;
        }

        emit("update", { ...payloadNews, file: file.value });
    };

    defineExpose({ submitForm });

</script>