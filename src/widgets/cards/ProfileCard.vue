<template>
    <div class="profile__card bg-[linear-gradient(257deg,rgba(134,72,156,0.20)_-4.79%,rgba(58,58,58,0.20)_86.4%)] !p-[16px] rounded-[10px]">
        <div class="profile__card-container">
            <h3 class="profile__card-title text !text-purple-light">{{ title }}</h3>
            <p class="profile__card-value text-[32px] text-white">{{ value }}</p>
        </div>
    </div>
</template>

<script setup>

    const props = defineProps({
        title: String,
        value: String
    })

</script>