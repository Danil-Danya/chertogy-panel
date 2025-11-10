<template>
    <section class="events__create">
        <div class="events__create-head flex justify-between">
            <h1 class="events__create-title title !text-left">Создать событие</h1>
            <Switcher 
                :left-button="switcher.leftButton" 
                :right-button="switcher.rightButton" 
                :param="switcher.param" 
            />
        </div>
        <div class="event__create-content">
            <TransitionGroup name="event-form">
                <MeetingForm v-if="route.query.event === 'event_session'" />
                <GameForm else />
            </TransitionGroup>
        </div>
    </section>
</template>

<script setup>

    import { useRoute } from 'vue-router';

    import Switcher from '@/shared/ui/Switcher.vue';

    import GameForm from '@/features/forms/GameForm.vue';
    import MeetingForm from '@/features/forms/MeetingForm.vue';

    const route = useRoute();

    const switcher = {
        leftButton: {
            text: 'Игровая сессия',
            query: 'game_session'
        },

        rightButton: {
            text: 'Мероприятие',
            query: 'event_session'
        },

        param: 'event'
    }

</script>