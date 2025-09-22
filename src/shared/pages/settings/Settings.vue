<template>
    <div class="settings w-full md:!p-[30px] !p-[15px] rounded-[10px] border border-blackish"
        :style="{
            background: 'radial-gradient(103.75% 60.01% at 51.36% 54.36%, rgba(44, 38, 47, 0.30) 0%, rgba(21, 21, 22, 0.30) 100%)'
        }"
    >
        <SettingsForm />
    </div>
</template>

<script setup>
    import SettingsForm from '@/features/forms/SettingsForm.vue';
</script>