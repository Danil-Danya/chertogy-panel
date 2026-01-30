<template>
    <Events :events="events" v-if="events" />
    <h2 class="title !text-left" v-else>У вас нет подписанных событий</h2>
    <Pagination
        v-if="pagination && events.length && pagination.totalPages && pagination.totalPages > 1"
        v-model:page="params.page"
        :total-pages="pagination.totalPages"
    />
</template>

<script setup>

    import { reactive } from 'vue';

    import Events from '@/shared/pages/events/get/Events.vue';
    import Pagination from '@/features/paginate/Pagination.vue';

    import { useEventsPage } from '@/composables/useEventsPage';

    const params = reactive({
        page: 1,
        limit: 4,
    })

    const { events, pagination } = useEventsPage('subscribed', params);
    
</script>