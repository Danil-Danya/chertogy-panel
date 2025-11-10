<template>
    <form class="settings__form">
        <div class="settings__form-container">
            <div class="settings__form-top flex gap-[15px] flex-wrap md:flex-nowrap">
                <div class="settings__form-file md:max-w-[252px] w-full">
                    <FileUpload @update:file="onFileSelected" />
                </div>
                <div class="">
                    <h2 class="settings__title text-purple-light text-[32px]">Личная информация</h2>
                    <div class="settings__form-inputs flex flex-wrap gap-[15px]">
                        <Input v-model="payloadProfile.name" 
                            label="Имя пользователя" 
                            placeholder="Введите имя пользователя" 
                            class="md:!w-[45%]" 
                            :message="fieldMessageProfile(vProfile$.name)" 
                            @blur="vProfile$.name.$touch()" 
                        />
                        <Input v-model="payloadUser.login" 
                            label="Логин" 
                            placeholder="Введите логин" 
                            class="md:!w-[45%]" 
                            :message="fieldMessageUser(vUser$.login)" 
                            @blur="vUser$.login.$touch()" 
                        />
                        <Input v-model="payloadProfile.phone" 
                            label="Телефон" 
                            placeholder="Введите телефон" 
                            class="md:!w-[45%]" 
                            :message="fieldMessageProfile(vProfile$.phone) || { type: 'warning', text: 'Виден только администрации' }" 
                            @blur="vProfile$.phone.$touch()" 
                        />
                        <Input v-model="payloadUser.email" 
                            label="Email" 
                            placeholder="Введите email" 
                            class="md:!w-[45%]" 
                            :message="fieldMessageUser(vUser$.email) || { type: 'warning', text: 'Виден только администрации' }" 
                            @blur="vUser$.email.$touch()" 
                        />
                    </div>
                </div>
            </div>
            <div class="settings__form-middle flex gap-[15px] !mt-[20px] flex-wrap md:flex-now">
                <div class="settings__form-area md:max-w-[525px] w-full">
                    <Textarea 
                        v-model="payloadProfile.biography" 
                        label="Расскажите о себе" 
                        placeholder="Пусть весь мир узнает" 
                        class="!mb-[15px]" 
                        :counter="`${areaSymbols}/${areaSymbolsMax}`" 
                        :message="fieldMessageProfile(vProfile$.biography) || { type: 'warning', text: 'Не более 350 символов, включая пробелы' }" 
                        @blur="vProfile$.biography.$touch"
                    />
                </div>
                <div class="settings__form-inputs md:w-[30%] w-full">
                    <Input 
                        v-model="payloadProfile.socialLink" 
                        label="Ссылка на соц. сеть" 
                        placeholder="Телеграм или ВК" 
                        :message="{ type: 'warning', text: 'Видно в профиле по умолчанию' }" 
                    />
                </div>
            </div>
            <div class="settings__form-bottom">
                <div class="settings__form-password">
                    <h2 class="password__title title !text-left !text-purple-mid !m-[30px_0_15px_0]">Смена пароля</h2>
                    <div class="settings__form-inputs flex flex-wrap gap-[15px]">
                        <PasswordInput 
                            v-model="payloadUser.password" 
                            label="Новый пароль" 
                            class="md:!w-[49%]" 
                            :message="fieldMessageUser(vUser$.password) || { type: 'warning', text: 'Минимум 8 символов' }" 
                            @blur="vUser$.password.$touch()" 
                        />
                        <PasswordInput 
                            v-model="payloadUser.repeatPassword" 
                            label="Повторите пароль" 
                            class="md:!w-[49%]" 
                            :message="fieldMessageUser(vUser$.repeatPassword) || { type: 'warning', text: 'Должен совпадать с новым паролем' }" 
                            @blur="vUser$.repeatPassword.$touch()" 
                        />
                    </div>
                </div>
                <div class="settings__form-button flex gap-[15px] !mt-[20px] flex-wrap md:flex-nowrap">
                    <Button 
                        color="green" 
                        text="Применить" 
                        @click.prevent.stop="submitAllData()" 
                        class="!text-[18px]" 
                    />
                    <Button 
                        color="gray" 
                        text="В профиль" 
                        class="md:max-w-[50%] !text-[18px]" 
                        @click.prevent.stop="goToProfile"
                    />
                </div>
            </div>
        </div>
    </form>
</template>

<script setup>

    import { reactive, computed, ref } from 'vue';
    import { useRouter } from 'vue-router';

    import { useUserStore } from '@/entities/users/model/store';
    import { useIsMobile } from '@/composables/useIsMobile';
    import { updateUserById, updateProfileByUserId } from '@/entities/users/lib/api';

    import { useValidation } from '@/composables/useValidation';
    import { profileRules, userRules } from '@/entities/users/model/form';

    import Button from '@/shared/ui/Button.vue';
    import Input from '@/shared/ui/Input.vue';
    import Textarea from '@/shared/ui/TextArea.vue';
    import FileUpload from '@/shared/ui/FileUpload.vue';
    import PasswordInput from '@/shared/ui/PasswordInput.vue';

    const userStore = useUserStore();
    const router = useRouter();
    const isMobile = useIsMobile();

    const user = userStore.profile;

    const areaSymbols = computed(() => payloadProfile.biography?.length || 0);
    const areaSymbolsMax = computed(() => 350);

    const payloadUser = reactive({
        login: user.login,
        email: user.email,
        repeatPassword: '',
        password: '',
    });

    const payloadProfile = reactive({
        name: user.profile.name,
        phone: user.profile.phone,
        biography: user.profile.biography,
        socialLink: user.profile.socialLink,
    })

    const validateProfile = useValidation(() => profileRules(payloadProfile), payloadProfile);
    const validateUser = useValidation(() => userRules(payloadUser), payloadUser);

    const vProfile$ = validateProfile.v$;
    const vUser$ = validateUser.v$;

    const fieldMessageProfile = validateProfile.fieldMessage;
    const fieldMessageUser = validateUser.fieldMessage;

    const uploadedFile = ref(null);

    const onFileSelected = (file) => {
        uploadedFile.value = file; 
    }

    const getFormDataToProfile = () => {
        const formDataProfile = new FormData();

        for (const key in payloadProfile) {
            if (payloadProfile[key] != null) {
                formDataProfile.append(key, payloadProfile[key]);
            }
        }

        if (uploadedFile.value) {
            formDataProfile.append('file', uploadedFile.value);
        } 

        return formDataProfile;
    }

    const submitAllData = async () => {
        vUser$.value.$touch();
        vProfile$.value.$touch();

        if (vUser$.$invalid || vProfile$.$invalid) {
            return;
        }

        payloadUser.password = payloadUser.password ? payloadUser.password : undefined;
        const updatedUser = await updateUserById(user.id, payloadUser);
        if (!updatedUser) {
            return;
        }

        const profileData = getFormDataToProfile();
        const updatedProfile = await updateProfileByUserId(user.profile.id, profileData);

        if (!updatedProfile) {
            return;
        }

        router.replace('/profile');
    }

    const goToProfile = () => {
        router.replace('/profile');
    }

</script>