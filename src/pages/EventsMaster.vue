<template>
    <Button color="purple" class="!mb-[30px]" text="Создать событие" link="https://xn----dtbbbhdau6cfpgt1e.xn--p1ai/panel/events/create" type="link" />
    <Events :events="events" v-if="events" />
    <h2 class="title !text-left" v-else>Вы еще не создали события</h2>
    <Pagination
        v-if="pagination && events.length && pagination.totalPages && pagination.totalPages > 1"
        v-model:page="params.page"
        :total-pages="pagination.totalPages"
    />

</template>

<script setup>

    import { reactive } from 'vue';

    import Button from '@/shared/ui/Button.vue';
    import Events from '@/shared/pages/events/get/Events.vue';
    import Pagination from '@/features/paginate/Pagination.vue';

    const params = reactive({
        page: 1,
        limit: 4,
    })

    import { useEventsPage } from '@/composables/useEventsPage';

    const { events, pagination } = useEventsPage('master', params);
    
</script>