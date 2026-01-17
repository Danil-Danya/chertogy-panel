<template>
    <form class="login__form flex flex-col justify-center items-center">
        <div class="login__form-container md:w-[50%]">
            <div class="login-wrapper flex gap-[20px] !mb-[20px] flex-wrap !mt-[50px]">
                <Input v-model="loginPayload.email" label="Ваша почта" placeholder="example@mail.ru" :message="errorEmail" />
                <PasswordInput v-model="loginPayload.password" label="Пароль" type="password" :message="errorPassword" />
            </div>
            <div class="login__button-container w-full flex flex-col gap-[20px]">
                <Button :loading="loading" color="green" text="Войти" class="w-full" @click.prevent.stop="submitLogin" />
                <!-- <Button color="blue" text="Войти с помощью ВКонтакте" :icon="LoginIcon" class="w-full" @click.prevent.stop="loginWithVK" /> -->
                <Button color="purple" text="Зарегистрироваться" type="link" link="https://xn----dtbbbhdau6cfpgt1e.xn--p1ai/panel/registration" class="w-full" />
            </div>
            <div class="login__link-container flex justify-center !mt-[30px]">
                <a href="https://xn----dtbbbhdau6cfpgt1e.xn--p1ai/panel/reset/password" class="login__link text-purple-mid text-[22px]">Забыли пароль?</a>
            </div>
        </div>
    </form>
</template>

<script setup>

    import { reactive, ref } from 'vue';
    import { useRouter } from 'vue-router';

    import { login } from '@/entities/users/lib/api';

    import Input from '@/shared/ui/Input.vue';
    import Button from '@/shared/ui/Button.vue';
    import PasswordInput from '@/shared/ui/PasswordInput.vue';

    import LoginIcon from '@/shared/icons/login/LoginIcon.vue';

    const loginPayload = reactive({
        email: '',
        password: ''
    })

    const errorEmail = ref({});
    const errorPassword = ref({});

    const router = useRouter();

    const loginWithVK = () => {
        const appId = import.meta.env.VITE_VK_APP_ID;
        const redirectUri = encodeURIComponent(import.meta.env.VITE_VK_REDIRECT_URI);

        window.location.href = `https://id.vk.com/authorize?client_id=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=email`;
    };

    const loading = ref(false);


    const submitLogin = async () => {
        try {
            loading.value = true;

            const loginData = await login(loginPayload);
    
            if (loginData.accessToken && loginData.refreshToken) {
                localStorage.setItem('accessToken', loginData.accessToken);
                localStorage.setItem('refreshToken', loginData.refreshToken);
    
                if (localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')) {
                    router.replace('/profile');
                }
            }
        }
        catch (error) {
            loading.value = false;

            handleFieldErrors(
                error?.response?.data?.errors,
                {
                    email: (v) => errorEmail.value = v,
                    password: (v) => errorPassword.value = v,
                }
            );
        }
    }


    const handleFieldErrors = (errors, fieldSetters) => {
        if (!Array.isArray(errors)) return;

        Object.values(fieldSetters).forEach(setter => setter(null));

        for (const err of errors) {
            const setError = fieldSetters[err.path];

            if (setError) {
                setError({
                    type: 'error',
                    text: err.msg
                });
            }
        }
    }

</script>