<template>
    <div class="login-block">
        <div class="login__container">
            <h1 class="title registration__title">Соскучились по приключениям?</h1>
        </div>
        <div class="login__content">
            <LoginForm />
        </div>
    </div>
</template>

<script setup>
    import LoginForm from '@/features/forms/LoginForm.vue';
</script>