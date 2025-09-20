<template>
    <form class="reset__form">
        <div class="reset__form-container flex justify-center gap-10px !mt-[50px] items-center !mb-[50px] flex-col md:flex-row">
            <div class="title reset__help md:!text-left md!text-[32px] !text-[26px] md:w-[40%] w-full">
                <h2 class="reset__title">Введите email, к которому привязан аккаунт</h2>
            </div>
            <div class="reset__inputs md:w-[50%] w-full !mt-[20px] md:!mt-0">
                <Input type="email" placeholder="example@mail.ru" />
            </div>
        </div>
        <div class="reset__form-button flex justify-center">
            <Button color="purple" text="Восстановить" class="!w-[400px]" />
        </div>
    </form>
</template>

<script setup>

    import { reactive } from 'vue';

    import Input from '@/shared/ui/Input.vue';
    import Button from '@/shared/ui/Button.vue';

    const email = reactive('');

</script>