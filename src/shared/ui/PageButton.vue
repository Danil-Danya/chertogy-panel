<template>
    <button
        class="w-[40px] h-[40px]
               flex justify-center items-center
               rounded-[10px] text-[16px]
             bg-[#18171E] hover:bg-[#31303a]
               transition-colors cursor-pointer"
            :class="active ? 'bg-purple-mid text-white' : 'text-[#545560]'"
    >
        {{ page < 10 ? `0${page}` : page }}
    </button>
</template>

<script setup>

    defineProps({
        page: Number,
        active: Boolean
    });

</script>
