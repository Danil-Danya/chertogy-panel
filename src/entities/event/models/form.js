import { helpers, required, maxValue, minValue, maxLength } from '@vuelidate/validators';

const eventRules = (form) => ({
    title: {
        required: helpers.withMessage(
            'Название мероприятия не должно быть пустым',
            required
        ),
    },

    system: {
        required: helpers.withMessage(
            'Система не должна быть пустой',
            required
        ),
    },

    setting: {
        required: helpers.withMessage(
            'Сеттинг не должен быть пустым',
            required
        ),
    },

    duration: {
        required: helpers.withMessage(
            'Длительность не должна быть пустой',
            required
        ),
    },

    skill: {
        required: helpers.withMessage(
            'Опыт игроков не должен быть пустым',
            required
        ),
    },

    genre: {
        required: helpers.withMessage(
            'Список жанров не должен быть пустым',
            value => Array.isArray(value) && value.length > 0
        ),
    },

    shortDescription: {
        required: helpers.withMessage(
            'Краткое описание не должно быть пустым',
            required
        ),
        maxLength: helpers.withMessage(
            'Максимум 350 символов',
            maxLength(350)
        ),
    },

    fullDescription: {
        required: helpers.withMessage(
            'Полное описание не должно быть пустым',
            required
        ),
        maxLength: helpers.withMessage(
            'Максимум 1200 символов',
            maxLength(1200)
        ),
    },

    aboutCreator: {
        required: helpers.withMessage(
            'Информация об организаторе не должна быть пустой',
            required
        ),
        maxLength: helpers.withMessage(
            'Максимум 500 символов',
            maxLength(500)
        ),
    },

    date: {
        required: helpers.withMessage(
            'Дата события не должна быть пустой',
            required
        ),
    },

    startTime: {
        required: helpers.withMessage(
            'Время начала не должно быть пустым',
            required
        ),
    },

    endTime: {
        required: helpers.withMessage(
            'Время окончания не должно быть пустым',
            required
        ),
    },

    place: {
        required: helpers.withMessage(
            'Место проведения не должно быть пустым',
            required
        ),
    },

    price: {
        required: helpers.withMessage(
            'Стоимость участия не должна быть пустой',
            required
        ),
    },

    discount: {
        required: helpers.withMessage(
            'Размер скидки не должен быть пустым',
            required
        ),
        minValue: helpers.withMessage(
            'Скидка не может быть меньше 0%',
            minValue(0)
        ),
        maxValue: helpers.withMessage(
            'Максимальная скидка — 90%',
            maxValue(90)
        ),
    },

    maxPlayers: {
        required: helpers.withMessage(
            'Максимальное количество игроков не должно быть пустым',
            required
        ),
    },

    registrationType: {
        required: helpers.withMessage(
            'Тип записи не должен быть пустым',
            required
        ),
    },
});

const meetingRules = (form) => ({
    title: {
        required: helpers.withMessage(
            'Название мероприятия не должно быть пустым',
            required
        ),
    },

    shortDescription: {
        required: helpers.withMessage(
            'Краткое описание не должно быть пустым',
            required
        ),
        maxLength: helpers.withMessage(
            'Максимум 250 символов',
            maxLength(250)
        ),
    },

    fullDescription: {
        required: helpers.withMessage(
            'Полное описание не должно быть пустым',
            required
        ),
        maxLength: helpers.withMessage(
            'Максимум 1200 символов',
            maxLength(1200)
        ),
    },

    aboutCreator: {
        required: helpers.withMessage(
            'Информация об организаторе не должна быть пустой',
            required
        ),
        maxLength: helpers.withMessage(
            'Максимум 500 символов',
            maxLength(500)
        ),
    },

    date: {
        required: helpers.withMessage(
            'Дата события не должна быть пустой',
            required
        ),
    },

    startTime: {
        required: helpers.withMessage(
            'Время начала не должно быть пустым',
            required
        ),
    },

    endTime: {
        required: helpers.withMessage(
            'Время окончания не должно быть пустым',
            required
        ),
    },

    place: {
        required: helpers.withMessage(
            'Место проведения не должно быть пустым',
            required
        ),
    },

    price: {
        required: helpers.withMessage(
            'Стоимость участия не должна быть пустой',
            required
        ),
    },

    discount: {
        required: helpers.withMessage(
            'Размер скидки не должен быть пустым',
            required
        ),
        minValue: helpers.withMessage(
            'Скидка не может быть меньше 0%',
            minValue(0)
        ),
        maxValue: helpers.withMessage(
            'Максимальная скидка — 90%',
            maxValue(90)
        ),
    },

    maxPlayers: {
        required: helpers.withMessage(
            'Максимальное количество игроков не должно быть пустым',
            required
        ),
    },

    registrationType: {
        required: helpers.withMessage(
            'Тип записи не должен быть пустым',
            required
        ),
    },
});

export { 
    eventRules,
    meetingRules
};
