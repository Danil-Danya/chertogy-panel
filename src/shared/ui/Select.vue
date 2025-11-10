<template>
    <div class="select__container w-full">
        <label 
            :for="id" 
            class="text-label text-white xl:text-[22px] block !mb-[10px]" 
            v-if="label"
        >
            {{ label }}
        </label>

        <div class="select__wrapper relative">
            <select
                :id="id"
                :value="modelValue"
                @change="onChange"
                class="block !p-[15px] text-[20px]
                    text-white w-full border border-gray-mid
                    rounded bg-deep-dark px-3 py-2 focus:outline-none 
                    focus:border-purple-mid placeholder:text-gray-mid
                "
            >
                <option 
                    v-for="(option, index) in options" 
                    :key="index" 
                    :value="option.value"
                >
                    {{ option.label }}
                </option>
            </select>

            <Component :is="icon" v-if="icon" class="absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
    </div>
</template>

<script setup>

    import { defineProps, defineEmits } from 'vue';

    const props = defineProps({
        label: {
            type: String,
            required: true
        },

        id: {
            type: String,
            required: true
        },

        icon: {
            type: Object,
            default: null
        },

        modelValue: {
            type: [String, Number],
            default: ''
        },
        
        options: {
            type: Array,
            required: true,
            validator: (arr) => arr.every(opt => 'label' in opt && 'value' in opt)
        }
    });

    const emit = defineEmits(['update:modelValue']);

    const onChange = (e) => {
        emit('update:modelValue', e.target.value);
    };
    
</script>

