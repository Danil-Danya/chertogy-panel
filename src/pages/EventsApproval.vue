<template>
    <Events :events="events" v-if="events" />
    <h2 class="title !text-left" v-else>Нет событий на утверждение</h2>
</template>

<script setup>

    import Button from '@/shared/ui/Button.vue';
    import Events from '@/shared/pages/events/get/Events.vue';

    import { useEventsPage } from '@/composables/useEventsPage';

    const { events } = useEventsPage('approve');
    
</script>