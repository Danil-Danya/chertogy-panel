<template>
    <div class="registration">
        <div class="registration__container flex flex-col items-center">
            <h1 class="title registration__title">Регистрация</h1>
            <h2 class="title text-xl xl:!text-[32px] !mt-[12px] max-w-[780px] w-full">Создайте профиль и погрузитесь в мир приключений вместе с нами!</h2>
        </div>
        <div class="registration__content flex justify-center items-center">
            <RegistrationForm />
        </div>
    </div>
</template>

<script setup>
    import RegistrationForm from '@/features/forms/RegistrationForm.vue';
</script>