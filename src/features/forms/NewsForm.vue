<template>
    <form class="news__form md:w-[75%] w-full" @submit.prevent="submitForm">
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
                :counter="`${payloadNews.shortDescription?.length || 0} / 300`"
                class="!mb-[30px]"
                :message="vNews$?.shortDescription ? fieldMessage(vNews$.shortDescription) || { type: 'warning', text: 'Желательное количество 115-130 символов' } : { type: 'warning', text: 'Желательное количество 115-130 символов' }"
                @blur="vNews$?.shortDescription?.$touch()"
            />

            <RichTextEditor
                v-model="payloadNews.description"
                label="Полное описание"
                @blur="vNews$?.description?.$touch()"
                class="!mb-[30px]"
                :counter="`${descriptionTextLength} / 1500`"
                :message="vNews$?.description
                    ? fieldMessage(vNews$.description) || { type: 'warning', text: 'Не более 1500 символов' }
                    : { type: 'warning', text: 'Не более 1500 символов' }"
            />

            <FileUpload 
                class="!mb-[30px] h-[700px]"
                :file="payloadNews.file"
                @update:file="onFileSelected"
            />
        </div>
    </form>
</template>

<script setup>
    
    import { reactive, watch, ref, computed } from "vue";
    import { useValidation } from "@/composables/useValidation";
    import { newsRules } from "@/entities/news/model/form";

    import Input from '@/shared/ui/Input.vue';
    import RichTextEditor from "@/shared/ui/RichTextEditor.vue";
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
        file: props.newsData.previewPath ?? null
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

    const descriptionTextLength = computed(() => {
        if (!payloadNews.description) {
            return 0;
        }

        const el = document.createElement('div');
        el.innerHTML = payloadNews.description;

        return el.textContent?.length || 0;
    });


    const submitForm = () => {
        vNews$.value.$touch();
        if (vNews$.value.$invalid) {
            return;
        }

        emit("update", { ...payloadNews, file: file.value });
    };

    watch(
        () => payloadNews.description,
        () => {
            vNews$?.description?.$touch();
        }
    );


    defineExpose({ submitForm });

</script>