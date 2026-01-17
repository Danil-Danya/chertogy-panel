<template>
    <Events :events="events" v-if="events" />
    <h2 class="title !text-left" v-else>У вас нет подписанных событий</h2>
</template>

<script setup>
    
    import Events from '@/shared/pages/events/get/Events.vue';

    import { useEventsPage } from '@/composables/useEventsPage';

    const { events } = useEventsPage('subscribed');
    
</script>