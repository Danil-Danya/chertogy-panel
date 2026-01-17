<template>
    <section class="events__create">
        <div class="events__create-head flex justify-between">
            <h1 class="events__create-title title !text-left">Обновить событие</h1>
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

    import GameForm from '@/features/forms/GameForm.vue';
    import MeetingForm from '@/features/forms/MeetingForm.vue';

    const route = useRoute();

</script>