import { helpers, required, email, minLength, maxLength, sameAs } from "@vuelidate/validators";

const registrationRules = (form) => ({
    login: {
        required: helpers.withMessage("Введите логин", required),
        maxLength: helpers.withMessage("Логин не может быть длиннее 15 символов", maxLength(15)),
    },
    
    name: {
        required: helpers.withMessage("Введите имя", required),
        maxLength: helpers.withMessage("Имя не может быть длиннее 15 символов", maxLength(15)),
    },

    phone: {
        required: helpers.withMessage("Введите телефон", required),
    },

    email: {
        required: helpers.withMessage("Введите почту", required),
        email: helpers.withMessage("Неверный формат почты", email),
        maxLength: helpers.withMessage("Почта не может быть длиннее 25 символов", maxLength(25)),
    },

    socialLink: {
        required: helpers.withMessage("Введите ссылку на страницу ВК или Телеграмм", required),
        maxLength: helpers.withMessage("Ссылка не может быть длиннее 25 символов", maxLength(25)),
        socialFormat: helpers.withMessage(
            "Введите корректную ссылку (https://vk.com/... или https://t.me/... или @username)",
            (value) =>
                !value || 
                /^https?:\/\/(vk\.com|t\.me)\/[A-Za-z0-9_]+$/i.test(value) || 
                /^@[A-Za-z0-9_]+$/i.test(value)
        ),
    },

    biography: {
        biographyLength: helpers.withMessage(
            "Не более 350 символов, включая пробелы",
            (value) => !value || value.length <= 350
        ),
    },

    password: {
        required: helpers.withMessage("Введите пароль", required),
        minLength: helpers.withMessage("Пароль должен быть не меньше 6 символов", minLength(6)),
        hasUppercase: helpers.withMessage(
            "Пароль должен содержать хотя бы одну заглавную букву", 
            (value) => !!value && /[A-ZА-Я]/.test(value)
        ),
        hasLowercase: helpers.withMessage(
            "Пароль должен содержать хотя бы одну строчную букву",
            (value) => !!value && /[a-zа-я]/.test(value)
        ),
        sameAsPasswordConfirm: helpers.withMessage(
            "Пароли не совпадают",
            (value) => value === form.passwordConfirm
        ),
    },

    passwordConfirm: {
        required: helpers.withMessage("Повторите пароль", required),
        sameAsPassword: helpers.withMessage(
            "Пароли не совпадают",
            (value) => value === form.password
        ),
    },
})

const resetPasswordRules = (form) => ({
    email: {
        required: helpers.withMessage("Введите почту", required),
        email: helpers.withMessage("Неверный формат почты", email),
    },
})

const profileRules = (form) => ({
    name: {
        required: helpers.withMessage("Введите имя", required),
        maxLength: helpers.withMessage("Имя не может быть длиннее 15 символов", maxLength(15)),

    },
    phone: {
        required: helpers.withMessage("Введите телефон", required),
    },
    biography: {
        biographyLength: helpers.withMessage(
            "Не более 350 символов, включая пробелы",
            (value) => !value || value.length <= 350
        ),
    },
    socialLink: {
        socialFormat: helpers.withMessage(
            "Введите корректную ссылку (https://vk.com/... или https://t.me/... или @username)",
            (value) =>
                !value || 
                /^https?:\/\/(vk\.com|t\.me)\/[A-Za-z0-9_]+$/i.test(value) || 
                /^@[A-Za-z0-9_]+$/i.test(value)
        ),
    },
    maxLength: helpers.withMessage("Ссылка не может быть длиннее 25 символов", maxLength(25)),
});

const userRules = (form) => ({
    login: {
        required: helpers.withMessage("Введите логин", required),
        maxLength: helpers.withMessage("Логин не может быть длиннее 15 символов", maxLength(15)),
    },
    email: {
        required: helpers.withMessage("Введите почту", required),
        email: helpers.withMessage("Неверный формат почты", email),
        maxLength: helpers.withMessage("Почта не может быть длиннее 25 символов", maxLength(25)),
    },
    password: {
        minLength: helpers.withMessage(
            "Пароль должен быть не меньше 6 символов",
            minLength(6)
        ),
        hasUppercase: helpers.withMessage(
            "Пароль должен содержать хотя бы одну заглавную букву",
            (value) => !value || /[A-ZА-Я]/.test(value)
        ),
        hasLowercase: helpers.withMessage(
            "Пароль должен содержать хотя бы одну строчную букву",
            (value) => !value || /[a-zа-я]/.test(value)
        ),
        sameAsRepeatPassword: helpers.withMessage(
            "Пароли не совпадают",
            (value) => !form.repeatPassword || value === form.repeatPassword
        ),
    },
    repeatPassword: {
        sameAsPassword: helpers.withMessage(
            "Пароли не совпадают",
            (value) => !form.password || value === form.password
        ),
    },
});


export {
    registrationRules,
    resetPasswordRules,
    profileRules,
    userRules
}