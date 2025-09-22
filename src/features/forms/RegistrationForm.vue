<template>
    <form class="form registration__form !mt-[40px]">
        <div class="registration__form-wrapper max-w-[780px] w-full flex flex-col mb-[20px]">
            <div class="registration__form-wrapper flex gap-[20px] w-full !mb-[20px] sm:flex-nowrap flex-wrap">
                <Input v-model="payload.login" label="Логин" placeholder="@user" :message="fieldMessage(v$.login)" @blur="v$.login.$touch()" />
                <Input v-model="payload.name" label="Имя" placeholder="Как к Вам обращаться?" :message="fieldMessage(v$.name)" @blur="v$.name.$touch()" />
            </div>
            <div class="registration__form-wrapper flex gap-[20px] w-full !mb-[20px] sm:flex-nowrap flex-wrap">
                <Input v-model="payload.phone" label="Телефон" type="tel" placeholder="+7 999 999-99-99" :message="fieldMessage(v$.phone)" @blur="v$.phone.$touch()" />
                <Input v-model="payload.email" label="Почта" type="email" placeholder="example@gmail.com" :message="fieldMessage(v$.email)" @blur="v$.email.$touch()" />
            </div>
            <div class="registration__form-wrapper flex gap-[20px] w-full !mb-[20px] sm:flex-nowrap flex-wrap">
                <Input v-model="payload.socialLink" label="Ссылка на соцсеть" placeholder="Телеграм или ВК" />
                <Input v-model="payload.biography" label="Биография" placeholder="Пусть весь мир узнает" />
            </div>
            <div class="registration__form-wrapper flex gap-[20px] w-full !mb-[20px] sm:flex-nowrap flex-wrap">
                <PasswordInput v-model="payload.password" label="Придумайте пароль" type="password" :message="fieldMessage(v$.password)" @blur="v$.password.$touch()" />
                <PasswordInput v-model="payload.passwordConfirm" label="Повторить пароль" type="password" :message="fieldMessage(v$.passwordConfirm)" @blur="v$.passwordConfirm.$touch()" />
            </div>
        </div>
        <div class="registration__form-action flex gap-[20px] max-w-[780px] items-center !mt-[55px] sm:flex-nowrap flex-wrap">
            <Button text="Зарегистрироваться" color="purple" @click.prevent.stop="registrationUser" />
            <p class="text !text-[14px] w-[655px]">Нажимая кнопку «Зарегистрироваться», вы соглашаетесь с политикой конфиденциальности.</p>
        </div>
    </form>
</template>

<script setup>

    import { reactive } from 'vue';
    import { useRouter } from 'vue-router';
    import { useValidation } from '@/composables/useValidation';

    import { registration } from '@/entities/users/lib/api';
    import { registrationRules } from '@/entities/users/model/form';

    import Input from '@/shared/ui/Input.vue';
    import PasswordInput from '@/shared/ui/PasswordInput.vue';
    import Button from '@/shared/ui/Button.vue';

    const router = useRouter();

    const payload = reactive({
        login: '',
        name: '',
        phone: '',
        email: '',
        socialLink: '',
        biography: '',
        password: '',
        passwordConfirm: ''
    });

    const validate = useValidation(registrationRules, payload);

    const v$ = validate.v$;
    const fieldMessage = validate.fieldMessage;

    const registrationUser = async () => {
        const isValid = await v$.value.$validate();
        if (!isValid) {
            return;
        }
        
        const registeredUser = await registration({...payload, role: 'USER'});
        if (registeredUser.accessToken && registeredUser.refreshToken) {
            localStorage.setItem('accessToken', registeredUser.accessToken);
            localStorage.setItem('refreshToken', registeredUser.refreshToken);

            if (localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')) {
                router.replace('/welcome');
            }
        }
    }

</script>