<template>
    <div class="select__container w-full">
        <label 
            :for="id" 
            class="text-label text-white xl:text-[22px] block !mb-[10px]" 
            v-if="label"
        >
        {{ label }}
        </label>

        <v-select
            :id="id"
            v-model="internalValue"
            :options="options"
            :multiple="multiple"
            label="label"
            :searchable="true"
            :clearable="true"
            :reduce="option => option.value"
            :close-on-select="!multiple"
            placeholder="Выберите вариант"
            class="v-select--dark"
            @search:blur="onBlur"
            @blur="onBlur"

            :class="{
                'v-select--error': message?.type === 'error',
                'v-select--success': message?.type === 'success'
            }"
        />

        <p
            v-if="message"
            class="message mt-1"
            :class="{
                'text-red-500': message.type === 'error',
                'text-green-500': message.type === 'success',
                'text-gray-mid': message.type === 'warning',
            }"
        >
            {{ message.text }}
        </p>
    </div>
</template>

<script setup>

    import { ref, watch } from 'vue';
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';

    const props = defineProps({
        label: { type: String, required: true },
        id: { type: String, required: true },
        modelValue: { type: [String, Number, Array], default: '' },
        multiple: { type: Boolean, default: false },
        options: {
            type: Array,
            required: true,
            validator: arr => arr.every(opt => 'label' in opt && 'value' in opt)
        },
        message: {
            type: Object,
            validator: (val) =>
                ['error', 'success', 'warning'].includes(val?.type)
        }
    });


    const emit = defineEmits(['update:modelValue', 'blur']);

    const internalValue = ref(props.modelValue);

    const onBlur = (e) => emit('blur', e);

    watch(() => props.modelValue, val => internalValue.value = val);
    watch(internalValue, val => emit('update:modelValue', val));

</script>
