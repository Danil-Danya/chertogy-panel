<template>
    <section class="events__create">
        <div class="events__create-head flex justify-between md:flex-nowrap flex-wrap">
            <h1 class="events__create-title title !text-left">Создать событие</h1>
            <Switcher 
                class="md:!mt-0 !mt-[10px]"
                :left-button="switcher.leftButton" 
                :right-button="switcher.rightButton" 
                :param="switcher.param" 
            />
        </div>
        <div class="event__create-content">
            <TransitionGroup name="event-form">
                <MeetingForm v-if="route.query.event === 'meeting_session'" />
                <GameForm v-else />
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
            query: 'meeting_session'
        },

        param: 'event'
    }

</script>