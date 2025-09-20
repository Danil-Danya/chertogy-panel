<template>
    <div class="masters__card !p-[20px] md:w-[calc(50%-20px)] w-full rounded-[8px] border-l-[10px] border-purple-dark !mb-[20px]"
        :style="{
            background: 'linear-gradient(114deg, rgba(54,38,38,0.3) -3.5%, rgba(34,27,36,0.3) 47.08%, rgba(54,38,38,0.3) 97.65%)'
        }"
    >
        <div class="masters__card-content flex gap-[15px] flex-wrap items-center">
            <div class="masters__card-avatar">
                <img :src="avatar" alt="Аватарка" class="h-[50px] w-[50px] rounded-[100%] border-[2px] border-blue-dark">
            </div>
            <div class="masters__card-info">
                <p class="masters__card-name text">{{ name }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>

    const props = defineProps({
        avatar: {
            type: String,
            required: true
        },
        
        name: {
            type: String,
            required: true
        }
    })

</script>
