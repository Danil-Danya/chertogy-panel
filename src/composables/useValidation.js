import { useVuelidate } from '@vuelidate/core';

export const useValidation = (rules, payload) => {
    const v$ = useVuelidate(rules(payload), payload);

    const fieldMessage = (field) => {
        if (!field.$dirty) return null;

        if (field.$error) {
            return { type: "error", text: field.$errors[0].$message }
        }

        return null;
    }

    return {
        fieldMessage,
        v$
    }
}

