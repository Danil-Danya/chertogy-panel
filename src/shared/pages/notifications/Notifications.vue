<template>
    <div class="notifications">
        <div class="notifications__container">
            <div class="notifications__list">
                <NotificationsCard
                    v-for="card in notifications"
                    :key="card"
                    :subject="card.subject"
                    :action="card.action"
                    :target="card.target"
                    :color="card.color"
                />
            </div>
            <div class="notifications__watched !mb-[60px]">
                <h2 class="!text-left !m-[70px_0_40px_0] notifications__title !text-gray-mid text-[48px]">
                    Просмотренные уведомления
                </h2>
                <NotificationsCard
                    v-for="card in notifications"
                    :key="card"
                    :subject="card.subject"
                    :action="card.action"
                    :target="card.target"
                />
            </div>
        </div>
    </div>
</template>

<script setup>

    import { reactive } from 'vue';
    import NotificationsCard from '@/widgets/cards/NotificationsCard.vue';

    const notifications = reactive([
        {
            subject: 'Мастер Билли',
            action: 'создал событие',
            target: 'Three hundred bucks',
            color: 'yellow' 
        },
        {
            subject: 'Мастер Вен',
            action: 'создал событие',
            target: 'Three hundred bucks',
            color: 'yellow' 
        },
        {
            subject: 'Игрок Slave',
            action: 'записался на событие',
            target: 'Three hundred bucks',
            color: 'yellow'
        },
        {
            subject: 'Вы записаны на',
            action: 'Three hundred bucks',
            target: 'к мастеру Билли',
            color: 'green' 
        },
        {
            subject: 'Событие Ass we can',
            action: 'не одобренно',
            target: 'и перемещенно в черновики',
            reason: 'Boss of this gym не доволен вашей нецензурной лексикой',
            color: 'red'
        }
    ])


</script>