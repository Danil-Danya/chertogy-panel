<template>
    <div class="event__form !mb-[30px]">

        <div class="event__form-main !mb-[60px]">
            <h2 class="event__form-title text-[32px] text-purple-dark">Основная информация</h2>

            <div class="event__form-wrapper flex md:flex-nowrap flex-wrap gap-[20px] mt-[20px]">
                
                <Input 
                    label="Название"
                    placeholder="Как будет называться мероприятие?"
                    v-model="form.title"
                    @blur="vEvent$.title.$touch()"
                    :message="fieldMessageEvent(vEvent$.title)"
                />
                    
                <Select 
                    v-if="systemOptions.length"
                    label="Система"
                    v-model="form.system"
                    :options="systemOptions"
                    @blur="vEvent$.system.$touch()"
                    :message="fieldMessageEvent(vEvent$.system)"
                />

                <Select 
                    label="Сеттинг"
                    v-model="form.setting"
                    :options="settingOptions"
                    @blur="vEvent$.setting.$touch()"
                    :message="fieldMessageEvent(vEvent$.setting)"
                />
            </div>

            <div class="event__form-wrapper flex md:flex-nowrap flex-wrap gap-[20px] mt-[20px]">

                <Select 
                    label="Опыт игроков"
                    v-model="form.skill"
                    :options="experienceOptions"
                    @blur="vEvent$.skill.$touch()"
                    :message="fieldMessageEvent(vEvent$.skill)"
                />

                <Input 
                    label="Подготовка к игре"
                    v-model="form.necessaryPlayerPreparation"
                />

                <Input 
                    label="Уровень персонажа"
                    v-model="form.playerLevel"
                />

            </div>

            <div class="event__form-wrapper flex md:flex-nowrap flex-wrap gap-[20px] mt-[20px]">

                <Select 
                    label="Жанр"
                    v-model="form.genre"
                    :options="genreOptions"
                    :multiple="true"
                    :message="fieldMessageEvent(vEvent$.genre)"
                    @blur="vEvent$.genre.$touch()"
                />

            </div>
        </div>

        <div class="event__form-info md:!mb-[50px]">
            <div class="event__form-wrapper md:flex-nowrap flex-wrap flex items-end gap-[40px]">

                <div class="event__form-info-left w-full md:w-[75%] h-full">
                    <TextArea 
                        class="!mt-[30px] h-full" 
                        label="Краткое описание"
                        placeholder="Напишите здесь что-нибудь"
                        v-model="form.shortDescription"
                        :counter="`${textAreaCounter.shortDescription.usedSymbols}/${textAreaCounter.shortDescription.maxSymbols}`"
                        :message="
                            fieldMessageEvent(vEvent$.shortDescription) 
                            || { type: 'warning', text: 'Не более 250 символов, включая пробелы' }
                        "
                        @blur="vEvent$.shortDescription.$touch()"
                    />
                </div>

                <div class="event__form-info-right">
                    <FileUpload
                        class="h-full"
                        :submit-attempted="isSubmitAttempted"
                        :file="uploadedPreview"
                        @update:file="onFileSelected"
                    />
                </div>

            </div>
        </div>

        <div class="event__form-desc !mb-[50px]">
            <h2 class="event__form-title text-[32px] text-purple-dark">Подробности игровой сессии</h2>

            <div class="event__form-wrapper md:flex-nowrap flex-wrap flex gap-[40px]">

                <TextArea 
                    class="!mt-[30px]" 
                    label="Полное описание"
                    placeholder="Что планируется?"
                    v-model="form.fullDescription"
                    :counter="`${textAreaCounter.fullDescription.usedSymbols}/${textAreaCounter.fullDescription.maxSymbols}`"
                    :message="
                        fieldMessageEvent(vEvent$.fullDescription) 
                        || { type: 'warning', text: 'Не более 1200 символов, включая пробелы' }
                    "
                    @blur="vEvent$.fullDescription.$touch()"
                />

                <TextArea 
                    class="!mt-[30px]" 
                    label="Об организаторе"
                    placeholder="Расскажите о себе то, что считаете нужным..."
                    v-model="form.aboutCreator"
                    :counter="`${textAreaCounter.aboutCreator.usedSymbols}/${textAreaCounter.aboutCreator.maxSymbols}`"
                    :message="
                        fieldMessageEvent(vEvent$.aboutCreator) 
                        || { type: 'warning', text: 'Не более 1200 символов, включая пробелы' }
                    "
                    @blur="vEvent$.aboutCreator.$touch()"
                />

            </div>
        </div>

        <div class="event__form-date !mb-[50px]">
            <h2 class="event__form-title text-[32px] text-purple-dark">Дата и время проведения события</h2>

            <div class="event__form-wrapper md:flex-nowrap flex-wrap flex gap-[20px]">

                <div class="data__picker-container w-full">
                    <label :for="id" class="text-label text-white xl:text-[22px] block !mb-[10px]">Дата события</label>
                    <VueDatePicker 
                        dark="true"
                        :locale="ru"
                        v-model="form.date"
                        lang="ru"
                        :theme="'dark'"
                        :action-row="actionsRow"
                        :min-date="now"
                        @blur="vEvent$.date.$touch()"
                        class=" border-[1px]"
                        :time-config="{ enableTimePicker: false }"
                        :class="{
                            '!border-red-500': fieldMessageEvent(vEvent$.date)?.type === 'error',
                            '!border-green-500': fieldMessageEvent(vEvent$.date)?.type === 'success'
                        }"
                    />
                    <p v-if="vEvent$.date.$error" class="text-red-accent text-sm mt-1">
                        {{ fieldMessageEvent(vEvent$.date)?.text }}
                    </p>
                </div>

                <div class="data__picker-container w-full">
                    <label class="text-label text-white xl:text-[22px] block !mb-[10px]">Время события</label>
                    <VueDatePicker 
                        v-model="form.timeRange"          
                        :locale="ru"
                        format="HH:mm"
                        iso
                        lang="ru"
                        dark="true"
                        :theme="'dark'"
                        time-picker
                        range                               
                        :action-row="actionsRow"
                        class="border-[1px]"
                        :class="{
                            '!border-red-500': fieldMessageEvent(vEvent$.startTime)?.type === 'error' || fieldMessageEvent(vEvent$.endTime)?.type === 'error',
                            '!border-green-500': fieldMessageEvent(vEvent$.startTime)?.type === 'success' && fieldMessageEvent(vEvent$.endTime)?.type === 'success'
                        }"
                        :disabled-time="disableEndBeforeStart" 
                        @blur="vEvent$.startTime.$touch(); vEvent$.endTime.$touch()"
                    />
                    <p v-if="vEvent$.startTime.$error" class="text-red-accent text-sm mt-1">
                        {{ fieldMessageEvent(vEvent$.startTime)?.text }}
                    </p>
                    <p v-if="vEvent$.endTime.$error" class="text-red-accent text-sm mt-1">
                        {{ fieldMessageEvent(vEvent$.endTime)?.text }}
                    </p>
                </div>

                <Select 
                    label="Длительность"
                    v-model="form.duration"
                    :options="durationOptions"
                    @blur="vEvent$.duration.$touch()"
                    :message="fieldMessageEvent(vEvent$.duration)"
                />

                <Select 
                    label="Место"
                    v-model="form.place"
                    @blur="vEvent$.place.$touch()"
                    :message="fieldMessageEvent(vEvent$.place)"
                    :options="[
                        { label: 'Таверна', value: 'Таверна' },
                        { label: 'Замок', value: 'Замок' },
                        { label: 'Фиолетовая', value: 'Фиолетовая' },
                        { label: 'Зеленая', value: 'Зеленая' },
                        { label: 'Общая зона', value: 'Общая зона' }
                    ]"
                />

            </div>
        </div>

        <div class="event__form-organization !mb-[50px]">
            <h2 class="event__form-title text-[32px] text-purple-dark">Организационные моменты</h2>

            <div class="event__form-wrapper flex gap-[20px] md:flex-nowrap flex-wrap">

                <Input 
                    label="Стоимость участия"
                    type="number"
                    v-model="form.price"
                    @blur="vEvent$.price.$touch()"
                    :message="fieldMessageEvent(vEvent$.price)"
                />

                <Input 
                    label="Размер скидки, %"
                    type="number"
                    v-model="form.discount"
                    @blur="vEvent$.discount.$touch()"
                    :message="fieldMessageEvent(vEvent$.discount)"
                />

                <Input 
                    label="Макс. количество игроков"
                    type="number"
                    v-model="form.maxPlayers"
                    @blur="vEvent$.maxPlayers.$touch()"
                    :message="fieldMessageEvent(vEvent$.maxPlayers)"
                />

                <Select 
                    label="Запись на событие"
                    v-model="form.registrationType"
                    @blur="vEvent$.place.$touch()"
                    :message="fieldMessageEvent(vEvent$.place)"
                    :options="[
                        { label: 'Открытая', value: 'OPEN' },
                        { label: 'Закрытая', value: 'CLOSED' }
                    ]"
                />

            </div>
        </div>

        <div class="event__form-end flex flex-col gap-[20px]">

            <div class="event__form-result flex gap-[40px] md:flex-nowrap flex-wrap">

                <div 
                    class="event__form-result-data w-full md:w-[50%] !p-[30px] rounded-[5px]"
                    v-for="value in results" 
                    :key="value"
                    style="background: var(--plate-03, linear-gradient(114deg, rgba(54, 38, 38, 0.30) -3.5%, rgba(34, 27, 36, 0.30) 47.08%, rgba(54, 38, 38, 0.30) 97.65%));"
                >
                    <h3 class="event__form-result-title text-white text-[26px]">{{ value.title }}</h3>
                    <p class="event__form-result-text text-white md:text-[46px] text-[36px]" v-html="value.text"></p>
                </div>

            </div>

            <div class="event__form-buttons flex gap-[40px] md:flex-nowrap flex-wrap" v-if="!isUpdate">
                <Button color="green" text="Отправить на утверждение" @click="submitEvent(false)" :loading="buttonLoading" />
                <Button color="gray" text="Сохранить в черновики" @click="submitEvent(true)" :loading="buttonLoading" />
            </div>
            <div class="event__form-buttons flex gap-4 flex-nowrap" v-else>
                <Button color="green" :text="eventStore.event?.isDraft ? 'Отправить на утверждение' : 'Обновить событие'" @click="submitEvent(false)" :loading="buttonLoading" />
                <Button color="gray" :text="eventStore.event?.isDraft ? 'Сохранить в черновик' : 'Отменить событие'" @click="eventStore.event?.isDraft ? submitEvent(true) : cancelEvent(eventStore.event.game.id, eventStore.event.id)" :loading="buttonLoading" />
                <Button color="red" text="Удалить событие" @click="openDeleteModal" />
            </div>

        </div>
        <Transition name="modal">
            <DeleteModal 
                v-if="showDeleteModal" 
                title="Удаление события" 
                text="Вы уверены, что хотите удалить это событие?" 
                @closeModal="closeDeleteModal" 
                @deleteModal="confirmDelete"
            />
        </Transition>
    </div>
</template>


<script setup>

    import { computed, onMounted, ref, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    import { VueDatePicker } from '@vuepic/vue-datepicker';
    import { ru } from 'date-fns/locale';

    import { deleteEvent } from '@/entities/event/lib/api';
    import { useEventsStore } from '@/entities/event/models/store';

    import { useValidation } from '@/composables/useValidation';
    import { eventRules } from '@/entities/event/models/form';
    
    import '@vuepic/vue-datepicker/dist/main.css'
    
    import Input from '@/shared/ui/Input.vue';
    import Select from '@/shared/ui/Select.vue';
    import Button from '@/shared/ui/Button.vue';
    import TextArea from '@/shared/ui/TextArea.vue';
    import FileUpload from '@/shared/ui/FileUpload.vue';
    import DeleteModal from '@/features/modals/DeleteModal.vue';
    
    import { useEventForm } from '@/composables/useEventForm';

    const actionsRow = {
        selectBtnLabel: 'Выбрать',
        cancelBtnLabel: 'Закрыть',
    }
    
    const route = useRoute();
    const router = useRouter();

    const buttonLoading = ref(false);

    const eventStore = useEventsStore();
    
    const showDeleteModal = ref(false);

    const isUpdate = computed(() => route.meta.isUpdate ? true : false);
    const isSubmitAttempted = ref(false);
    
    const openDeleteModal = () => {
        showDeleteModal.value = true;
    };

    const closeDeleteModal = () => {
        showDeleteModal.value = false;
    };

    const minDate = ref(null);

    const now = new Date();
    now.setMinutes(now.getMinutes() - 15); 
    minDate.value = now;

    const confirmDelete = async () => {
        try {
            const deletedEvent = await deleteEvent(route.params.id); 
            if (deletedEvent) {
                router.replace('/master-events');
            }
        } 
        catch (err) {
            console.error(err);
        }
    };

    const submitEvent = async (isDraft) => {
        vEvent$.value.$touch();

        if (vEvent$.value.$invalid || !uploadedPreview.value) {
            isSubmitAttempted.value = true;
            return;
        }

        buttonLoading.value = true;

        if (route.path.includes('create')) {
            await createGame(isDraft);
        }
        else {
            await updateGame(eventStore.event.game.id, eventStore.event.id, isDraft);
        }
    };

    onMounted(async () => {
        if (route.name === 'event-update') {
            await eventStore.fetchEvent(route.params.id);
            fillForm(eventStore.event)
        }
    })

    const {
        form,
        uploadedPreview,
        systemOptions,
        settingOptions,
        durationOptions,
        experienceOptions,
        genreOptions,
        results,
        fillForm,
        updateGame,
        createGame,
        cancelEvent
    } = useEventForm();

    const textAreaCounter = computed(() => {
        return {
            shortDescription: {
                maxSymbols: 250,
                usedSymbols: form.shortDescription.length
            },

            fullDescription: {
                maxSymbols: 1200,
                usedSymbols: form.fullDescription.length
            },

            aboutCreator: {
                maxSymbols: 500,
                usedSymbols: form.aboutCreator.length
            }
        }
    })

    const validateEvent = useValidation(
        () => eventRules(form),
        form
    );

    const disableEndBeforeStart = ({ date, type }) => {
        const start = form.timeRange[0];
        if (type === 'end' && start) {
            return date < start;  
        }
        return false;
    };

    watch(
        () => form.timeRange,
        (val) => {
            form.startTime = val[0];
            form.endTime = val[1];
        },
        { deep: true }
    );
    
    const vEvent$ = validateEvent.v$;
    const fieldMessageEvent = validateEvent.fieldMessage;

    const onFileSelected = (file) => {
        uploadedPreview.value = file; 
    }

</script>