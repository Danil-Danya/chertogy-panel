<template>
    <div class="event__form">
        <div class="event__form-main !mb-[60px]">
            <h2 class="event__form-title text-[32px] text-purple-dark">Основная информация</h2>
            <div class="event__form-wrapper flex gap-[20px] mt-[20px]">
                <Input 
                    label="Название"
                    placeholder="Как будет называться мероприятие?"
                />
                <Select 
                    label="Система"
                    v-model="selectedSystem"
                    :options="[
                        { label: 'D&D 5e', value: 'dnd5e' },
                        { label: 'Pathfinder', value: 'pathfinder' },
                        { label: 'Call of Cthulhu', value: 'cthulhu' },
                        { label: 'Cyberpunk RED', value: 'cyberpunk' }
                    ]"
                />
                <Select 
                    label="Сеттинг"
                    v-model="selectedSetting"
                    :options="[
                        { label: 'Фэнтези', value: 'fantasy' },
                        { label: 'Научная фантастика', value: 'sci-fi' },
                        { label: 'Постапокалипсис', value: 'post-apoc' },
                        { label: 'Детектив', value: 'detective' }
                    ]"
                />
            </div>
            <div class="event__form-wrapper flex gap-[20px] mt-[20px]">
                <Select 
                    label="Длительность"
                    v-model="selectedDuration"
                    :options="[
                        { label: 'Нулевая сессия', value: 'zero' },
                        { label: 'Ваншот', value: 'oneshot' },
                        { label: 'Кампания', value: 'campaign' }
                    ]"
                />
                <Select 
                    label="Опыт игроков"
                    v-model="selectedExperience"
                    :options="[
                        { label: 'Новички', value: 'newbies' },
                        { label: 'Опытные', value: 'experienced' },
                        { label: 'Смешанная группа', value: 'mixed' }
                    ]"
                />
                <Select 
                    label="Жанр"
                    v-model="selectedGenre"
                    :options="[
                        { label: 'Фантастика', value: 'fantasy' },
                        { label: 'Комедия', value: 'comedy' },
                        { label: 'Драма', value: 'drama' },
                        { label: 'Хоррор', value: 'horror' }
                    ]"
                />
            </div>
            <div class="event__form-wrapper flex gap-[20px] mt-[20px]">
                <Select 
                    label="Необходимая подготовка игрока"
                    v-model="selectedPreparation"
                    :options="[
                        { label: 'Не требуется', value: 'none' },
                        { label: 'Минимальная', value: 'minimal' },
                        { label: 'Средняя', value: 'medium' },
                        { label: 'Высокая', value: 'high' }
                    ]"
                />
                <Select 
                    label="Уровень персонажа"
                    v-model="selectedLevel"
                    :options="[
                        { label: 'Низкий', value: 'low' },
                        { label: 'Средний', value: 'mid' },
                        { label: 'Высокий', value: 'high' },
                        { label: 'Эпический', value: 'epic' }
                    ]"
                />
            </div>
        </div>

        <div class="event__form-info !mb-[50px]">
            <div class="event__form-wrapper flex items-end gap-[40px]">
                <div class="event__form-info-left w-[75%]">
                    <TextArea class="!mt-[30px] h-full" label="Краткое описание" placeholder="Напишите здесь что-нибудь" message="{ type: 'warning', text: 'Не более 350 символов, включая пробелы' }" />
                </div>
                <div class="event__form-info-right">
                    <FileUpload class="h-full" />
                </div>
            </div>
        </div>
        <div class="event__form-desc !mb-[50px]">
            <h2 class="event__form-title text-[32px] text-purple-dark">Подробности меропрития</h2>
            <div class="event__form-wrapper flex gap-[40px]">
                <TextArea class="!mt-[30px]" label="Полное описание" placeholder="Что планируется?" message="{ type: 'warning', text: 'Не более 350 символов, включая пробелы' }" />
                <TextArea class="!mt-[30px]" label="Об организаторе" placeholder="Расскажите о себе то, что считаете нужным..." message="{ type: 'warning', text: 'Не более 350 символов, включая пробелы' }" />
            </div>
        </div>
        <div class="event__form-date !mb-[50px]">
            <h2 class="event__form-title text-[32px] text-purple-dark">Дата и время проведения события</h2>
            <div class="event__form-wrapper flex gap-[20px]">
                <Input label="Дата" placeholder="Как будет называться мероприятие?" />
                <Input label="Время начала" placeholder="Как будет называться мероприятие?" />
                <Input label="Место" placeholder="Как будет называться мероприятие?" />
                <Select label="Место"
                    v-model="selectedPlace"
                    :options="[
                    { label: 'Комната 1', value: 'room1' },
                    { label: 'Комната 2', value: 'room2' },
                    { label: 'Зал 3', value: 'hall3' },
                    { label: 'Главный зал', value: 'main' }
                ]"/>
            </div>
        </div>
        <div class="event__form-organization !mb-[50px]">
            <h2 class="event__form-title text-[32px] text-purple-dark">Организационные моменты</h2>
            <div class="event__form-wrapper flex gap-[20px]">
                <Input label="Стоимость участия" placeholder="Как будет называться мероприятие?" />
                <Input label="Размер скидки, %" placeholder="Как будет называться мероприятие?" />
                <Input label="Макс. количество игроков" placeholder="Как будет называться мероприятие?" />
                <Select label="Запись на событие"
                    v-model="selectedPlace"
                    :options="[
                    { label: 'Комната 1', value: 'room1' },
                    { label: 'Комната 2', value: 'room2' },
                    { label: 'Зал 3', value: 'hall3' },
                    { label: 'Главный зал', value: 'main' }
                ]"/>
            </div>
        </div>
        <div class="event__form-end flex flex-col gap-[20px]">
            <div class="event__form-result flex gap-[40px]">
                <div class="event__form-result-data w-[50%] !p-[30px] rounded-[5px]" v-for="value in results" :key="value"
                    style="background: var(--plate-03, linear-gradient(114deg, rgba(54, 38, 38, 0.30) -3.5%, rgba(34, 27, 36, 0.30) 47.08%, rgba(54, 38, 38, 0.30) 97.65%));"
                >
                    <h3 class="event__form-result-title text-white text-[26px]">{{ value.title }}</h3>
                    <p class="event__form-result-text text-white text-[46px]" v-html="value.text"></p>
                </div>
            </div>
            <div class="event__form-buttons flex gap-[40px]">
                <Button color="green" text="Отправить на утверждение"  />
                <Button color="gray" text="Сохранить в черновики"  />
            </div>
        </div>
    </div>
</template>

<script setup>

    import { ref } from 'vue';

    import Input from '@/shared/ui/Input.vue';
    import Select from '@/shared/ui/Select.vue';
    import Button from '@/shared/ui/Button.vue';
    import TextArea from '@/shared/ui/TextArea.vue';
    import FileUpload from '@/shared/ui/FileUpload.vue';

    const results = ref([
        {
            title: 'Итоговая цена с участника',
            text: `<span class="text-red-accent">3000 рублей</span>`
        },
        {
            title: 'Формат события',
            text: `Запись<span class="text-red-accent">закрыта</span>, 12 чел.`
        },
    ])

</script>