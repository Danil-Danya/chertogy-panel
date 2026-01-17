<template>
    <div class="notifications__card !p-[15px] 
                w-full rounded-[8px] border-l-[10px] 
                border-gray-mid !mb-[20px]
        "
        :style="{
            background: 'linear-gradient(114deg, rgba(54,38,38,0.3) -3.5%, rgba(34,27,36,0.3) 47.08%, rgba(54,38,38,0.3) 97.65%)'
        }"
        :class="{
            'border-red-bright': color === 'red',
            'border-green-mid': color === 'success',
            '!border-brown-mid': color === 'info'
        }"
    >
        <div class="notifications__card-content flex gap-[5px] flex-wrap" v-if="color">
            <p class="text !text-blue-mid !font-[700]" v-html="subject"></p>
            <p class="text !font-[700]"  v-html="action"
                :class="{
                    '!text-red-bright': color === 'red',
                    '!text-green-mid': color === 'success',
                    '!text-brown-mid': color === 'info'
                }"
            >
            </p>
            <p class="text !text-blue-mid !font-[700]" v-html="target" ></p>
        </div>

        <div class="notifications__card-content flex gap-[5px] flex-wrap" v-else>
            <p class="text !text-gray-mid !font-[700]" v-html="subject"></p>
            <p class="text !text-gray-mid !font-[700]" v-html="action"></p>
            <p class="text !text-gray-mid !font-[700]" v-html="target"></p>
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