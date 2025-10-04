<template>
    <div class="profile__card !p-[16px] rounded-[10px]"
        :style="{ background: color }"
    >
        <div class="profile__card-container">
            <h3 class="profile__card-title text !text-purple-light">{{ title }}</h3>
            <p class="profile__card-value md:text-[32px] text-[24px] text-white">{{ value }}</p>
        </div>
    </div>
</template>

<script setup>

    const props = defineProps({
        title: String,
        value: String,
        color: {
            type: String,
            default: 'linear-gradient(257deg, rgba(134,72,156,0.20) -4.79%, rgba(58,58,58,0.20) 86.4%)'
        }
    })

</script>