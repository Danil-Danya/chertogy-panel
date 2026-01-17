<template>
    <div class="notifications">
        <div class="notifications__list" v-if="unreadNotifications.length">
            <NotificationsCard
                v-for="card in unreadNotifications"
                :key="card.id"
                :subject="card.subject"
                :action="card.action"
                :target="card.target"
                :color="card.color"
            />
        </div>

        <div class="notifications__watched !mb-[60px]" v-if="readNotifications.length">
            <h2 class="!text-left !m-[70px_0_40px_0] notifications__title !text-gray-mid text-[48px]">
                Просмотренные уведомления
            </h2>

            <NotificationsCard
                v-for="card in readNotifications"
                :key="card.id"
                :subject="card.subject"
                :action="card.action"
                :target="card.target"
            />
        </div>

        <h2 class="title !text-left"
            v-if="!unreadNotifications.length && !readNotifications.length"
        >
            Вы еще не получали актуальных уведомлений
        </h2>

    </div>
</template>

<script setup>

    import { onMounted, ref, computed } from 'vue';
    import NotificationsCard from '@/widgets/cards/NotificationsCard.vue';

    import { useNotificationsStore } from '@/entities/notifications/model/store';

    const notificationsStore = useNotificationsStore();

    const notifications = ref([]);

    const unreadNotifications = computed(() =>
        notifications.value.filter(n => !n.isRead)
    );

    const readNotifications = computed(() =>
        notifications.value.filter(n => n.isRead)
    );


    onMounted(async () => {
        await notificationsStore.fetchNotifications();

        
        notifications.value = notificationsStore.notifications.rows.map(row => ({
            subject: row.subject,
            action: row.action,
            target: row.target,
            color: row.color,
            isRead: row.users?.[0]?.is_read_notification?.is_read ?? false
        }));
    })


</script>