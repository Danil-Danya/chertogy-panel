<template>
    <ul class="profile__sidebar-list w-[280px]">
        <li class="profile__sidebar-li" v-for="link in sidebarLinks" :key="link">
            <RouterLink :to="link.link" 
                class="profile__sidebar-links items-center gap-[10px] duration-300
                       block flex !p-[16px_22px] rounded-[10px] hover:bg-purple-dark
                     border-purple-dark border !mb-[16px] bg-blackish"
            >
                <span class="profile__sidebar-icon">
                    <Component :is="link.icon" />
                </span>
                <p class="profile__sidebar-text text">{{ link.text }}</p>
            </RouterLink>
        </li>
    </ul>
</template>

<script setup>

    import { ref } from 'vue';

    import Profile from '@/shared/icons/profile/sidebar/Profile.vue';
    import Settings from '@/shared/icons/profile/sidebar/Settings.vue';
    import MyEvents from '@/shared/icons/profile/sidebar/MyEvents.vue';
    import Notification from '@/shared/icons/profile/sidebar/Notification.vue';
    import FavoritesMasters from '@/shared/icons/profile/sidebar/FavoritesMasters.vue';

    const sidebarLinks = ref([
        {
            text: 'Профиль',
            icon: Profile,
            link: '/profile'
        },
        {
            text: 'Мои события',
            icon: MyEvents,
            link: 'https://xn----dtbbbhdau6cfpgt1e.xn--p1ai/technical-work'
        },
        {
            text: 'Уведомления',
            icon: Notification,
            link: '/notifications'
        },
        {
            text: 'Избранные мастера',
            icon: FavoritesMasters,
            link: '/favorites-masters'
        },
        {
            text: 'Настройки',
            icon: Settings,
            link: '/settings'
        },
    ])

</script>