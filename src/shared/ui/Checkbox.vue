<template>
    <div 
        class="checkbox__wrapper flex items-center gap-[10px] cursor-pointer select-none"
        @click="toggle"
    >
        <div 
            class="checkbox w-[22px] h-[22px] rounded-[4px] border border-gray-mid flex items-center justify-center transition-all duration-200"
            :class="{ 'active': modelValue }"
        >
            <svg v-if="modelValue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                 fill="white" class="w-[14px] h-[14px]">
                <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8.192 8.192a1 1 0 01-1.414 0L3.293 10.68a1 1 0 111.414-1.414l3.1 3.1 7.485-7.485a1 1 0 011.415 0z"
                      clip-rule="evenodd" />
            </svg>
        </div>

        <span v-if="label" class="text-white text-[18px] leading-[1]">{{ label }}</span>
    </div>
</template>

<script setup>
    const props = defineProps({
        modelValue: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: ""
        }
    });

    const emit = defineEmits(["update:modelValue"]);

    const toggle = () => {
        emit("update:modelValue", !props.modelValue);
    };
</script>

