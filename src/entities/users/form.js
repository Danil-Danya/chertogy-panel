import { helpers, required, email, minLength, sameAs } from "@vuelidate/validators";

const registrationRules = (form) => ({
    username: {
        required: helpers.withMessage("Введите логин", required),
    },
    
    fullName: {
        required: helpers.withMessage("Введите имя", required),
    },

    phone: {
        required: helpers.withMessage("Введите телефон", required),
    },

    email: {
        required: helpers.withMessage("Введите почту", required),
        email: helpers.withMessage("Неверный формат почты", email),
    },

    password: {
        required: helpers.withMessage("Введите пароль", required),
        minLength: helpers.withMessage("Пароль должен быть не меньше 6 символов", minLength(6)),
    },

    passwordConfirm: {
        required: helpers.withMessage("Повторите пароль", required),
        sameAsPassword: helpers.withMessage("Пароли не совпадают", sameAs(() => form.password)),
    },
})

const loginRules = {

}

const resetPasswordRules = {

}

const profileRules = {

}

export {
    registrationRules,
    loginRules,
    resetPasswordRules,
    profileRules
}