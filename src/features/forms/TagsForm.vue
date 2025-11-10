<template>
    <form class="tags__form">
        <div class="tags__form-container flex flex-col gap-[30px]">
            <Input
                v-model="payloadTags.fullName"
                label="Название тега"
                placeholder="Тришот (3 сессии по 4–5 часов)"
                :message="vTags$?.fullName ? fieldMessage(vTags$.fullName) : null"
                @blur="vTags$?.fullName?.$touch()"
            />

            <Input
                v-model="payloadTags.shortName"
                label="Краткое название тега"
                placeholder="Тришот"
                :message="vTags$?.shortName ? fieldMessage(vTags$.shortName) : null"
                @blur="vTags$?.shortName?.$touch()"
            />
        </div>
    </form>
</template>

<script setup>

    import { reactive, watch } from 'vue';
    import { tagsRules } from '@/entities/tags/model/form';
    import { useValidation } from '@/composables/useValidation';

    import Input from '@/shared/ui/Input.vue';

    const emit = defineEmits(['update']);

    const props = defineProps({
        tagsForm: {
            type: Object,
            default: () => ({
                fullName: '',
                shortName: ''
            })
        }
    })

    const payloadTags = reactive({
        fullName: props.tagsForm.fullName,
        shortName: props.tagsForm.shortName
    })

    const validateTags = useValidation(() => tagsRules(payloadTags), payloadTags);
    const vTags$ = validateTags.v$;
    const fieldMessage = validateTags.fieldMessage;

    watch(
        [payloadTags],
        () => {
            emit("update", { ...payloadTags });
        },
        { deep: true }
    );

    const submitForm = () => {
        vTags$.value.$touch();
        if (vTags$.value.$invalid) {
            return;
        }

        emit("update", { ...payloadTags });
    };

    defineExpose({ submitForm });

</script>