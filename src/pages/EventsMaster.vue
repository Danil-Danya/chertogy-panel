<template>
    <Button color="purple" class="!mb-[30px]" text="Создать событие" link="https://xn----dtbbbhdau6cfpgt1e.xn--p1ai/panel/events/create" type="link" />
    <Events :events="events" v-if="events" />
    <h2 class="title !text-left" v-else>Вы еще не создали события</h2>
</template>

<script setup>

    import Button from '@/shared/ui/Button.vue';
    import Events from '@/shared/pages/events/get/Events.vue';

    import { useEventsPage } from '@/composables/useEventsPage';

    const { events } = useEventsPage('master');
    
</script>