import { helpers, required, maxLength } from "@vuelidate/validators";

const newsRules = (form) => ({
    title: {
        required: helpers.withMessage("Введите заголовок новости", required),
        maxLength: helpers.withMessage(
            "Заголовок не может быть длиннее 100 символов",
            maxLength(100)
        ),
    },

    shortDescription: {
        required: helpers.withMessage("Введите краткое описание", required),
        maxLength: helpers.withMessage(
            "Краткое описание не может быть длиннее 300 символов",
            maxLength(300)
        ),
    },

    fullDescription: {
        required: helpers.withMessage("Введите полное описание новости", required),
        maxLength: helpers.withMessage(
            "Полное описание не может превышать 1500 символов",
            maxLength(1500)
        ),
    },
});

export { newsRules };
