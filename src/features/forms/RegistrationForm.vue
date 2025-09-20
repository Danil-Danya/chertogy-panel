<template>
    <form class="form registration__form !mt-[40px]">
        <div class="registration__form-wrapper max-w-[780px] w-full flex flex-col mb-[20px]">
            <div class="registration__form-wrapper flex gap-[20px] w-full !mb-[20px] sm:flex-nowrap flex-wrap">
                <Input v-model="login.username" label="Логин" placeholder="@user" :message="fieldMessage(v$.username)" />
                <Input v-model="login.fullName" label="Имя" placeholder="Как к Вам обращаться?" :message="fieldMessage(v$.fullName)" />
            </div>
            <div class="registration__form-wrapper flex gap-[20px] w-full !mb-[20px] sm:flex-nowrap flex-wrap">
                <Input v-model="login.phone" label="Телефон" type="tel" placeholder="+7 999 999-99-99" :message="fieldMessage(v$.phone)" />
                <Input v-model="login.email" label="Почта" type="email" placeholder="example@gmail.com" :message="fieldMessage(v$.email)" />
            </div>
            <div class="registration__form-wrapper flex gap-[20px] w-full !mb-[20px] sm:flex-nowrap flex-wrap">
                <Input v-model="login.social" label="Ссылка на соцсеть" placeholder="Телеграм или ВК" />
                <Input v-model="login.bio" label="Биография" placeholder="Пусть весь мир узнает" />
            </div>
            <div class="registration__form-wrapper flex gap-[20px] w-full !mb-[20px] sm:flex-nowrap flex-wrap">
                <Input v-model="login.password" label="Придумайте пароль" type="password" :message="fieldMessage(v$.password)" />
                <Input v-model="login.passwordConfirm" label="Повторить пароль" type="password" :message="fieldMessage(v$.passwordConfirm)" />
            </div>
        </div>
        <div class="registration__form-action flex gap-[20px] max-w-[780px] items-center !mt-[55px] sm:flex-nowrap flex-wrap">
            <Button text="Зарегистрироваться" color="purple" />
            <p class="text !text-[14px] w-[655px]">Нажимая кнопку «Зарегистрироваться», вы соглашаетесь с политикой конфиденциальности.</p>
        </div>
    </form>
</template>

<script setup>

    import { ref, reactive } from 'vue';
    import { useVuelidate } from "@vuelidate/core";
    import { helpers, required, email, minLength, sameAs } from "@vuelidate/validators";

    import Input from '@/shared/ui/Input.vue';
    import Button from '@/shared/ui/Button.vue';

    const login = reactive({
        username: '',
        fullName: '',
        phone: '',
        email: '',
        social: '',
        bio: '',
        password: '',
        passwordConfirm: ''
    })

    const rules = {
        username: { 
            required: helpers.withMessage("Введите логин", required) 
        },
        fullName: { 
            required: helpers.withMessage("Введите имя", required) 
        },
        phone: { 
            required: helpers.withMessage("Введите телефон", required) 
        }, 
        email: { 
            required: helpers.withMessage("Введите почту", required),
            email: helpers.withMessage("Неверный формат почты", email)
        },
        password: { 
            required: helpers.withMessage("Введите пароль", required),
            minLength: helpers.withMessage("Пароль должен быть не меньше 6 символов", minLength(6))
        },
        passwordConfirm: { 
            required: helpers.withMessage("Повторите пароль", required),
            sameAsPassword: helpers.withMessage("Пароли не совпадают", sameAs(() => login.password))
        }
    }

    const v$ = useVuelidate(rules, login);

    const fieldMessage = (field) => {
        if (!field.$dirty) return null;

        if (field.$error) {
            return { type: "error", text: field.$errors[0].$message }
        }

        return null;
    }

</script>