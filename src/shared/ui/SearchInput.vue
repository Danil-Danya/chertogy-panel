<template>
    <div class="input__container w-full">
        <div class="input__wrapper relative w-full">
            <input 
                :id="id"
                ref="inputRef"
                :type="type"
                :value="modelValue"
                :placeholder="placeholder"
                @input="onInput"
                @blur="onBlur"
                class="block !p-[15px] text-[20px]
                    text-white w-full border border-gray-mid
                    rounded bg-deep-dark px-3 py-2 focus:outline-none 
                    focus:border-purple-mid placeholder:text-gray-mid
                "
                :class="{
                    'border-red-500': message?.type === 'error',
                    'border-green-500':  message?.type === 'success'
                }"
            >
            <span class="search__icon absolute right-[15px] top-[18px]">
                <Search />
            </span>
        </div>
    </div>
</template>

<script setup>

    import { defineEmits } from 'vue';
    import Search from '../icons/filters/Search.vue';

    const props = defineProps({
        placeholder: {
            type: String
        },

        modelValue: {  
            type: String
        },
    })

    const emit = defineEmits(['update:modelValue']);

    const onInput = (event) => {
        emit('update:modelValue', event.target.value);
    };

</script>