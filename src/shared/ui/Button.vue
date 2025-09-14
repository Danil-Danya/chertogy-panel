<template>
    <Component
        :is="type === 'link' ? 'a' : 'button'"
        class="button block text-white 
               text-[22px] w-full !p-[15px] 
               rounded-[10px] cursor-pointer 
               duration-300 flex items-center 
               justify-center gap-[20px]
            "
        :href="type === 'link' ? link : null"
        :class="{
            'bg-purple-mid hover:bg-purple-light': color === 'purple',
            'bg-blue-mid hover:bg-blue-dark': color === 'blue',
            'bg-yellow-600': color === 'yellow',
            'bg-green-500': color === 'green'
        }"
    >
        <span class="button__icon block w-[24px] h-[24px]" v-if="icon">
            <Component :is="icon" />
        </span>
        <p class="button__text">{{ text }}</p>
    </Component>
</template>

<script setup>

    import { defineProps } from 'vue';

    const props = defineProps({
        text: {
            type: String,
            required: true
        },

        color: {
            type: Object,
            required: true
        },

        icon: {
            type: Object,
        },

        type: {
            type: String,
            default: 'button',
            validator: (value) => ['link', 'button'].includes(value)
        },

        link: {
            type: String,
            default: '#'
        }
    })

</script>