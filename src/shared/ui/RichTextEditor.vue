<template>
    <div class="input__container w-full">
        <label
            v-if="label"
            class="text-label text-white xl:text-[22px] block !mb-[10px]"
        >
            {{ label }}
        </label>

        <div
            class="input__container w-full"
            @focusout="emit('blur')"
        >
            <QuillEditor
                v-model:content="content"
                content-type="html"
                theme="snow"
                @blur="emit('blur')"
                class="bg-deep-dark text-white rounded qa-editor"
                :class="{
                    'border !border-red-500': message?.type === 'error',
                    'border !border-green-500': message?.type === 'success'
                }"
            />
        </div>

        <div class="message__container justify-between flex mt-2">
            <p
                v-if="message"
                class="message"
                :class="{
                    'text-red-500': message.type === 'error',
                    'text-green-500': message.type === 'success',
                    'text-gray-mid': message.type === 'warning',
                }"
            >
                {{ message.text }}
            </p>
            <p
                class="counter"
                :class="{
                    'text-red-500': message?.type === 'error',
                    'text-green-500': message?.type === 'success',
                    'text-gray-mid': message?.type === 'warning',
                }"
            >
                {{ counter }}
            </p>
        </div>
    </div>
</template>

<script setup>

    import { computed } from 'vue'
    import { QuillEditor } from '@vueup/vue-quill'
    import '@vueup/vue-quill/dist/vue-quill.snow.css'

    const props = defineProps({
        label: String,
        icon: Object,
        message: Object,
        id: String,
        placeholder: String,
        counter: {
            type: String,
            required: true
        },
        modelValue: String
    })

    const emit = defineEmits(['update:modelValue', 'blur'])

    const onBlur = () => {
        emit('blur')
    }


    const content = computed({
        get: () => props.modelValue,
        set: (val) => emit('update:modelValue', val)
    })

</script>

<style>
.qa-editor{
    min-height: 200px;
    color: white;
    border: 1px solid white !important;
}

.ql-toolbar {
    margin-bottom: 10px;
}
</style>
