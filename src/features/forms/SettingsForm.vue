<template>
    <form class="settings__form">
        <div class="settings__form-container">
            <div class="settings__form-top flex gap-[15px]">
                <div class="settings__form-file max-w-[252px] w-full">
                    <FileUpload />
                </div>
                <div class="settings__form-inputs flex flex-wrap gap-[15px]">
                    <Input v-model="user.username" label="Имя пользователя" placeholder="Введите имя пользователя" class="!w-[45%]" />
                    <Input v-model="user.login" label="Логин" placeholder="Введите логин" class="!w-[45%]" />
                    <Input v-model="user.phone" label="Телефон" placeholder="Введите телефон" class="!w-[45%]" :message="{ type: 'warning',text: 'Виден только администрации' }" />
                    <Input v-model="user.email" label="Email" placeholder="Введите email" class="!w-[45%]" :message="{ type: 'warning',text: 'Виден только администрации' }" />
                </div>
            </div>
            <div class="settings__form-middle flex gap-[15px] !mt-[20px]">
                <div class="settings__form-area max-w-[550px] w-full">
                    <Textarea v-model="user.biography" label="Расскажите о себе" placeholder="Пусть весь мир узнает" class="!mb-[15px]" :counter="`${areaSymbols}/${areaSymbolsMax}`" :message="{ type: 'warning',text: 'Не более 350 символов, включая пробелы' }" />
                </div>
                <div class="settings__form-inputs">
                    <Input v-model="user.socialLink" label="Ссылка на соц. сеть" placeholder="Телеграм или ВК" :message="{ type: 'warning',text: 'Видно в профиле по умолчанию' }" />
                </div>
            </div>
            <div class="settings__form-bottom">
                <div class="settings__form-password">
                    <h2 class="password__title title !text-left !text-purple-mid !m-[30px_0_15px_0]">Смена пароля</h2>
                    <div class="settings__form-inputs flex flex-wrap gap-[15px]">
                        <PasswordInput v-model="user.username" label="Текущий пароль" class="!w-[32%]" />
                        <PasswordInput v-model="user.username" label="Новый пароль" class="!w-[32%]" />
                        <PasswordInput v-model="user.username" label="Повторите пароль" class="!w-[32%]" />
                    </div>
                </div>
                <div class="settings__form-button flex gap-[15px] !mt-[20px]">
                    <Button color="green" text="Новые настройки применены" :icon="Ok" />
                    <Button color="gray" text="Отмена" class="max-w-[260px]" />
                </div>
            </div>
        </div>
    </form>
</template>

<script setup>

    import { reactive, computed } from 'vue';

    import Button from '@/shared/ui/Button.vue';
    import Input from '@/shared/ui/Input.vue';
    import Textarea from '@/shared/ui/TextArea.vue';
    import FileUpload from '@/shared/ui/FileUpload.vue';
    import PasswordInput from '@/shared/ui/PasswordInput.vue';

    import Ok from '@/shared/icons/settings/Ok.vue';

    const areaSymbols = computed(() => 0);
    const areaSymbolsMax = computed(() => 350);

    const countMaxSymbols = () => {
        if (areaSymbols.value >= areaSymbolsMax.value) {
            return areaSymbolsMax.value;
        }

        return areaSymbols.value;
    }

    const user = reactive({
        username: '',
        email: '',
        login: '',
        phone: '',
        biography: '',
        socialLink: '',
        newPassword: '',
    });

</script>