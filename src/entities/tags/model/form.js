import { helpers, required } from "@vuelidate/validators";

const tagsRules = (form) => ({
    shortName: {
        required: helpers.withMessage("Введите короткое название тега", required),
    },

    fullName: {
        required: helpers.withMessage("Введите полное название тега", required),
    },
});

export { tagsRules };
