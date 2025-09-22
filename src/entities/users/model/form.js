import { helpers, required, email, minLength, sameAs } from "@vuelidate/validators";

const registrationRules = (form) => ({
    login: {
        required: helpers.withMessage("Введите логин", required),
        startsWithAt: helpers.withMessage("Логин должен начинаться с @", (value) => !!value && value.startsWith("@")),
    },
    
    name: {
        required: helpers.withMessage("Введите имя", required),
    },

    phone: {
        required: helpers.withMessage("Введите телефон", required),
        phoneFormat: helpers.withMessage("Введите телефон в формате +79999999999", (value) => !!value && /^\+7\d{10}$/.test(`${value}`)),
    },

    email: {
        required: helpers.withMessage("Введите почту", required),
        email: helpers.withMessage("Неверный формат почты", email),
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

const resetPasswordRules = () => ({
    
})

const profileRules = (form) => ({
    name: {
        required: helpers.withMessage("Введите имя", required),
    },
    phone: {
        phoneFormat: helpers.withMessage(
            "Введите телефон в формате +79999999999",
            (value) => !value || /^\+7\d{10}$/.test(value)
        ),
    },
    biography: {
        biographyLength: helpers.withMessage(
            "Не более 350 символов, включая пробелы",
            (value) => !value || value.length <= 350
        ),
    },
    socialLink: {
        socialFormat: helpers.withMessage(
            "Введите корректную ссылку (https:// или @username)",
            (value) =>
                !value ||
                /^(https?:\/\/[^\s]+|@[A-Za-z0-9_]+)$/i.test(value)
        ),
    },
});

const userRules = (form) => ({
    login: {
        required: helpers.withMessage("Введите логин", required),
        startsWithAt: helpers.withMessage(
            "Логин должен начинаться с @",
            (value) => !!value && value.startsWith("@")
        ),
    },
    email: {
        required: helpers.withMessage("Введите почту", required),
        email: helpers.withMessage("Неверный формат почты", email),
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