<template>
    <form class="reset__form">
        <div class="reset__form-container flex justify-center gap-10px !mt-[50px] items-center !mb-[50px] flex-col md:flex-row">
            <div class="title reset__help md:!text-left md!text-[32px] !text-[26px] md:w-[40%] w-full">
                <h2 class="reset__title">Введите email, к которому привязан аккаунт</h2>
            </div>
            <div class="reset__inputs md:w-[50%] w-full !mt-[20px] md:!mt-0">
                <Input v-model="payload.email" type="email" placeholder="example@mail.ru" :message="fieldMessage(v$.email)|| emailBackendMessage" @blur="v$.email.$touch()" />
            </div>
        </div>
        <div class="reset__form-button flex justify-center">
            <Button color="purple" text="Восстановить" class="!w-[400px]" @click.prevent.stop="recoveryPassword" />
        </div>
    </form>
</template>

<script setup>

    import { reactive, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { resetPassword } from '@/entities/users/lib/api';
    import { resetPasswordRules } from '@/entities/users/model/form';
    import { useValidation } from '@/composables/useValidation';

    import Input from '@/shared/ui/Input.vue';
    import Button from '@/shared/ui/Button.vue';

    const router = useRouter();
    
    const payload = reactive({ email: '' });
    const validate = useValidation(resetPasswordRules, payload);

    const emailBackendMessage = ref({});

    const v$ = validate.v$;
    const fieldMessage = validate.fieldMessage;

    const recoveryPassword = async () => {
        try {
            const isValid = await v$.value.$validate();
            if (!isValid) {
                return;
            }

            const resetedPassword = await resetPassword(payload);
            if (resetedPassword) {
                router.replace('/reseted-password')
            }
        }
        catch (error) {
            console.log(error);

            emailBackendMessage.value.type = 'error';
            emailBackendMessage.value.text = error.response.data.message;
        }
    }

</script>