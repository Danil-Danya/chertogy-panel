<template>
    <div class="input__container w-full">
        <label :for="id" class="text-label text-white xl:text-[22px] block !mb-[10px]" v-if="label">{{ label }}</label>

        <div class="input__wrapper">
            <input 
                :id="id" 
                :type="type" 
                :value="value" 
                :placeholder="placeholder"
                @input="$emit('update:value', $event.target.value)"
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
            <Component :is="icon" v-if="icon" />
        </div>

        <p class="message" v-if="message"
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

    const props = defineProps({
        label: {
            type: String,
            required: true
        },

        type: {
            type: String,
            required: true,
            default: 'text'
        },

        icon: {
            type: Object
        },

        value: {
            type: String
        },

        message: {
            type: Object,
            validator: (val) => ['error', 'success', 'warning'].includes(val.type)
        },

        id: {
            type: String,
            required: true
        },

        placeholder: {
            type: String
        }
    })

</script>