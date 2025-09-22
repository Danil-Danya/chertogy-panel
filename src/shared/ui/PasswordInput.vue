<template>
    <div class="input__container w-full">
        <label :for="id" class="text-label text-white xl:text-[22px] block !mb-[10px]" v-if="label">{{ label }}</label>

        <div class="input__wrapper relative">
            <input 
                :id="id" 
                :type="currentType" 
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
            <Component :is="currentIcon" @click="visibleInput" class="absolute top-[35%] right-[15px] cursor-pointer" />
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

    import { ref } from 'vue';

    import PasswordEyeClose from '@/shared/icons/ui/PasswordEyeClose.vue';
    import PasswordEyeOpen from '@/shared/icons/ui/PasswordEyeOpen.vue';

    const props = defineProps({
        label: {
            type: String,
            required: true
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
        },

        modelValue: {  
            type: String
        },
    })

    const emit = defineEmits(['update:modelValue', 'blur']);
    
    const onInput = (e) => emit('update:modelValue', e.target.value);
    const onBlur = (e) => emit('blur', e);

    const currentIcon = ref(PasswordEyeOpen);
    const currentType = ref('password');

    const isVisible = ref(false);

    const visibleInput = () => {
        isVisible.value = !isVisible.value;

        if (isVisible.value) {
            currentIcon.value = PasswordEyeClose;
            currentType.value = 'text';
        }
        else {
            currentIcon.value = PasswordEyeOpen;
            currentType.value = 'password';
        }
    }

</script>