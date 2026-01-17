<template>
    <form class="form registration__form w-full !mt-[40px] flex flex-col items-center !bg-none">
        <div class="registration__form-wrapper max-w-[780px] w-full flex flex-col mb-[20px]">
            <div class="registration__form-wrapper flex gap-[20px] w-full !mb-[20px] sm:flex-nowrap flex-wrap">
                <Input v-model="payload.login" label="Логин" placeholder="user" :message="getFieldMessage('login', v$.login)" @blur="v$.login.$touch()" />
                <Input v-model="payload.name" label="Имя" placeholder="Как к Вам обращаться?" :message="fieldMessage(v$.name)" @blur="v$.name.$touch()" />
            </div>
            <div class="registration__form-wrapper flex gap-[20px] w-full !mb-[20px] sm:flex-nowrap flex-wrap">
                <Input v-model="payload.phone" label="Телефон" type="tel" placeholder="+7 999 999-99-99" :message="getFieldMessage('phone', v$.phone)"  @blur="v$.phone.$touch()" />
                <Input v-model="payload.email" label="Почта" type="email" placeholder="example@gmail.com" :message="getFieldMessage('email', v$.email)" @blur="v$.email.$touch()" />
            </div>
            <div class="registration__form-wrapper flex gap-[20px] w-full !mb-[20px] sm:flex-nowrap flex-wrap">
                <Input v-model="payload.socialLink" label="Ссылка на соцсеть" placeholder="Телеграм или ВК" :message="fieldMessage(v$.socialLink)" @blur="v$.socialLink.$touch()" />
                <TextArea v-model="payload.biography" :counter="`${areaSymbols}/${areaSymbolsMax}`" label="Расскажите о себе" placeholder="Пусть весь мир узнает" :message="fieldMessage(v$.biography) || { type: 'warning'} " @blur="v$.biography.$touch()" />
            </div>
            <div class="registration__form-wrapper flex gap-[20px] w-full !mb-[20px] sm:flex-nowrap flex-wrap">
                <PasswordInput v-model="payload.password" label="Придумайте пароль" type="password" :message="fieldMessage(v$.password)" @blur="v$.password.$touch()" />
                <PasswordInput v-model="payload.passwordConfirm" label="Повторить пароль" type="password" :message="fieldMessage(v$.passwordConfirm)" @blur="v$.passwordConfirm.$touch()" />
            </div>
        </div>
        <div class="registration__form-action flex gap-[20px] md:max-w-[780px] max-w-full items-center !mt-[55px] sm:flex-nowrap flex-wrap">
            <Button text="Зарегистрироваться" color="purple" :loading="loading" @click.prevent.stop="registrationUser" />
            <RouterLink to="privacy-policy" class="text !text-[14px] w-[655px]">Нажимая кнопку «Зарегистрироваться», вы соглашаетесь с политикой конфиденциальности.</RouterLink>
        </div>
    </form>
</template>

<script setup>

    import { reactive, watch, computed, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useValidation } from '@/composables/useValidation';

    import { registration } from '@/entities/users/lib/api';
    import { registrationRules } from '@/entities/users/model/form';

    import Input from '@/shared/ui/Input.vue';
    import PasswordInput from '@/shared/ui/PasswordInput.vue';
    import TextArea from '@/shared/ui/TextArea.vue';
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

    const areaSymbols = computed(() => payload.biography?.length || 0);
    const areaSymbolsMax = computed(() => 350);

    const validate = useValidation(registrationRules, payload);

    const v$ = validate.v$;
    const fieldMessage = validate.fieldMessage;

    const loading = ref(false);

    const backendErrors = reactive({
        login: null,
        email: null
    });

    const normalizeMessage = (msg) => {
        if (!msg) {
            return null;
        }

        if (typeof msg === 'string') {
            return { type: 'error', text: msg };
        }

        if (msg?.text) {
            return msg;
        }

        return null;
    };

    const getFieldMessage = (field, vField) => {
        return backendErrors[field] || normalizeMessage(fieldMessage(vField));
    };

    watch(() => payload.login, () => {
        if (backendErrors.login) backendErrors.login = null;
    });

    watch(() => payload.email, () => {
        if (backendErrors.email) backendErrors.email = null;
    });

    const registrationUser = async () => {
        const isValid = await v$.value.$validate();
        if (!isValid) {
            return;
        }

        loading.value = true;

        const payloadToSend = {
            ...payload,
            role: 'USER',
            phone: payload.phone ? "+7" + payload.phone.replace(/\D/g, "").slice(1) : null
        };

        try {
            const registeredUser = await registration(payloadToSend);
            if (registeredUser.accessToken && registeredUser.refreshToken) {
                localStorage.setItem('accessToken', registeredUser.accessToken);
                localStorage.setItem('refreshToken', registeredUser.refreshToken);

                if (localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')) {
                    router.replace('/welcome');
                }
            }
        } 
        catch (err) {
            loading.value = false;

            const data = err?.response?.data || err?.data || null;

            if (data?.errors && Array.isArray(data.errors) && data.errors.length) {
                const errorObj = data.errors[0];

                if (errorObj.login) backendErrors.login = { type: 'error', text: errorObj.login };
                if (errorObj.email) backendErrors.email = { type: 'error', text: errorObj.email };
                if (errorObj.phone) backendErrors.phone = { type: 'error', text: errorObj.phone };
            }
        }
    };

</script>
