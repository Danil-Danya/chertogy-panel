import { computed, onMounted, watch } from 'vue';
import { useEventsStore } from '@/entities/event/models/store';


const EVENTS_MODE = {
    MASTER: 'master',
    APPROVE: 'approve',
    SUBSCRIBED: 'subscribed'
};


export function useEventsPage(mode, params) {
    const eventsStore = useEventsStore();

    const events = computed(() => {
        const rows = eventsStore.events?.rows;

        if (!Array.isArray(rows) || rows.length === 0) {
            return [];
        }

        if (mode === EVENTS_MODE.SUBSCRIBED) {
            return rows[0]?.subscribedEvents ?? [];
        }

        if (mode === EVENTS_MODE.APPROVE) {
            return rows;
        }

        if (mode === EVENTS_MODE.MASTER) {
            return rows;
        }

        return [];
    });

    const pagination = computed(() => {
        return {
            page: eventsStore.events.page,
            limit: eventsStore.events.limit,
            offset: eventsStore.events.offset,
            totalItems: eventsStore.events.totalItems,
            totalPages: eventsStore.events.totalPages
        };
    });


    const fetchEvents = async (params) => {
        try {
            if (mode === EVENTS_MODE.MASTER) {
                await eventsStore.fetchMasterEvents(params);
            }

            if (mode === EVENTS_MODE.APPROVE) {
                await eventsStore.fetchApproveEvent(params);
            }

            if (mode === EVENTS_MODE.SUBSCRIBED) {
                await eventsStore.fetchSubscribeEvents(params);
            }
        } 
        catch (error) {
            console.log(error);   
        }
    };

    onMounted(async () => {
        await fetchEvents(params);
    });

    watch(
        () => params.page,
        async () => {
            await fetchEvents(params);
        }
    );


    return {
        refetch: fetchEvents,
        pagination,
        events
    };
}
