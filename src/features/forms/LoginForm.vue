<template>
    <form class="login__form flex flex-col justify-center items-center">
        <div class="login__form-container md:w-[50%]">
            <div class="login-wrapper flex gap-[20px] !mb-[20px] flex-wrap !mt-[50px]">
                <Input v-model="login.email" label="Ваша почта" placeholder="example@mail.ru" />
                <Input v-model="login.reactive" label="Пароль" type="password" />
            </div>
            <div class="login__button-container w-full flex flex-col gap-[20px]">
                <Button color="purple" text="Войти" class="w-full" />
                <Button color="blue" text="Войти с помощью ВКонтакте" :icon="VK" class="w-full" />
                <Button color="purple" text="Зарегистрироваться" class="w-full" />
            </div>
            <div class="login__link-container flex justify-center !mt-[30px]">
                <a href="/reset/password" class="login__link text-purple-mid text-[22px]">Забыли пароль?</a>
            </div>
        </div>
    </form>
</template>

<script setup>

    import { reactive } from 'vue';

    import Input from '@/shared/ui/Input.vue';
    import Button from '@/shared/ui/Button.vue';

    import VK from '@/shared/icons/navbar/VK.vue';

    const login = reactive({
        email: '',
        password: ''
    })

</script>