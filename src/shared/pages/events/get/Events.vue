<template>
    <div class="content__events flex flex-col gap-[30px]" v-if="mappedEvents.length">
        <EventsCard
            v-for="event in mappedEvents"
            :key="event.id"
            v-bind="event"
        />
    </div>
    <h2 class="title !text-left" v-else-if="emptyState">
        <p class="mb-[10px]">{{ emptyState.text }}</p>
        <p v-if="emptyState.subtext" class="text-gray-mid text-[18px] mb-[10px]"> {{ emptyState.subtext }}</p>
        <RouterLink
            v-if="emptyState.link"
            :to="emptyState.link"
            class="!text-purple-light !underline"
        >
            {{ emptyState.linkText }}
        </RouterLink>
    </h2>
</template>


<script setup>
    
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';

    import EventsCard from '@/widgets/cards/EventsCard.vue';
    import { mapEventToCard } from '@/utils/eventMapper';

    const route = useRoute();

    const props = defineProps({
        events: {
            type: Array,
            required: true,
        },
    });

    const mappedEvents = computed(() => {
        if (!Array.isArray(props.events)) {
            return [];
        }

        return props.events.map((event) => ({
            id: event.id,
            ...mapEventToCard(event),
        }));
    });

    const EMPTY_STATES = {
        'my-events': {
            text: 'Вы ещё не подписались ни на одно событие',
            link: '/events',
            linkText: 'Перейти к просмотру событий',
        },

        'master-events': {
            text: 'Вы ещё не создали ни одного события',
            subtext: 'Создайте событие, чтобы оно появилось в списке',
        },

        approval: {
            text: 'На данный момент событий на подтверждение не поступало',
            subtext: 'Новые события появятся здесь после отправки на модерацию',
        },
    };

    const emptyState = computed(() => {
        return EMPTY_STATES[route.name] ?? null;
    });

</script>
