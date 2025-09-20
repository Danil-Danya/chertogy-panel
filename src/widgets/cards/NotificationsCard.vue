<template>
    <div class="notifications__card !p-[30px] 
                w-full rounded-[8px] border-l-[10px] 
                border-gray-mid !mb-[20px]
        "
        :style="{
            background: 'linear-gradient(114deg, rgba(54,38,38,0.3) -3.5%, rgba(34,27,36,0.3) 47.08%, rgba(54,38,38,0.3) 97.65%)'
        }"
        :class="{
            'border-red-bright': color === 'red',
            'border-green-dark': color === 'green',
            'border-yellow-700': color === 'yellow'
        }"
    >
        <div class="notifications__card-content flex gap-[5px] flex-wrap">
            <p class="text !text-blue-mid !font-[700]">{{ subject }}</p>
            <p class="text !font-[700]">{{ action }}</p>
            <p class="text !text-red-bright !font-[700]">{{ target }}</p>
        </div>
    </div>
</template>

<script setup>

    const props = defineProps({
        subject: {
            type: String,
            required: true
        },

        action: {
            type: String,
            required: true
        },

        target: {
            type: String,
            required: true
        },

        color: {
            type: String,
        }
    })

</script>