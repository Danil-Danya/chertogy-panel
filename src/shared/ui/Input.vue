<template>
    <div class="input__container w-full">
        <label :for="id" class="text-label text-white xl:text-[22px] block !mb-[10px]" v-if="label">{{ label }}</label>

        <div class="input__wrapper">
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
            <Component :is="icon" v-if="icon" />
        </div>

        <div class="message__container justify-between flex mt-2">
            <p
                v-if="message"
                class="message"
                :class="{
                    'text-red-500': message.type === 'error',
                    'text-green-500': message.type === 'success',
                    'text-gray-mid': message.type === 'warning',
                }"
            >
                {{ message.text }}
            </p>
            <p
                class="counter"
                :class="{
                    'text-red-500': message?.type === 'error',
                    'text-green-500': message?.type === 'success',
                    'text-gray-mid': message?.type === 'warning',
                }"
            >
                {{ counter }}
            </p>
        </div>
    </div>
</template>

<script setup>

    import IMask from "imask";

    import { defineEmits } from 'vue';
    import { ref, onMounted } from 'vue';

    const props = defineProps({
        label: {
            type: String,
            required: true
        },

        counter: {
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
    const onBlur = (e) => emit('blur', e);

    const inputRef = ref(null);
    let mask;

    onMounted(() => {
        if (props.type === "tel") {
            mask = IMask(inputRef.value, {
                mask: "+{7} (000) 000-00-00",
            });

            mask.on("accept", () => {
                emit("update:modelValue", mask.value);
            });
        }
    });

    const onInput = (e) => {
        if (!mask) {
            emit("update:modelValue", e.target.value);
        }
    };

</script>