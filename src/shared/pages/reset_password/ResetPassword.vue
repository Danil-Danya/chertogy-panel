<template>
    <div class="reset">
        <div class="reset__container !mt-[300px]">
            <h1 class="title rest__title">Восстановление пароля</h1>
        </div>
        <div class="reset__content">
            <ResetPasswordForm />
        </div>
    </div>
</template>

<script setup>
    import ResetPasswordForm from '@/features/forms/ResetPasswordForm.vue';
</script>