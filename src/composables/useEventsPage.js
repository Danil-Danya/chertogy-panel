import { computed, onMounted } from 'vue';
import { useEventsStore } from '@/entities/event/models/store';


const EVENTS_MODE = {
    MASTER: 'master',
    APPROVE: 'approve',
    SUBSCRIBED: 'subscribed'
};


export function useEventsPage(mode) {
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

    onMounted(() => {
        fetchEvents();
    });

    return {
        refetch: fetchEvents,
        events
    };
}
