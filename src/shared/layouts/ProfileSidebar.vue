<template>
    <ul class="profile__sidebar-list w-[280px]">
        <li class="profile__sidebar-li" v-for="link in sidebarLinks" :key="link">
            <component
                :is="isExternal(link.link) ? 'a' : 'RouterLink'"
                :to="!isExternal(link.link) ? link.link : null"
                :href="isExternal(link.link) ? link.link : null"
                rel="noopener noreferrer"
                class="profile__sidebar-links items-center gap-[10px] duration-300
                    block flex !p-[16px_22px] rounded-[10px] hover:bg-purple-dark
                    border-purple-dark border !mb-[16px] bg-blackish cursor-pointer"
            >
                <span class="profile__sidebar-icon">
                    <Component :is="link.icon" />
                </span>
                <p class="profile__sidebar-text text">{{ link.text }}</p>
            </component>
        </li>
    </ul>
    <div class="master__content" v-if="profile.role === 'MASTER' || profile.role === 'ADMIN' || profile.role === 'SUPER_ADMIN'">
        <h2 class="title !text-left !text-[32px] !m-[20px_0]">Мастер панель</h2>
        <ul class="profile__sidebar-list w-[280px]">
            <li class="profile__sidebar-li" v-for="link in masterLinks" :key="link">
                <RouterLink :to="link.link"
                    class="profile__sidebar-links items-center gap-[10px] duration-300
                        block flex !p-[16px_22px] rounded-[10px] hover:bg-purple-dark
                        border-purple-dark border !mb-[16px] bg-blackish cursor-pointer"
                >
                    <span class="profile__sidebar-icon" v-if="link.icon">
                        <Component :is="link.icon" />
                    </span>
                    <p class="profile__sidebar-text text">{{ link.text }}</p>
                </RouterLink>
            </li>
        </ul>
    </div>
    <div class="admin__content" v-if="profile.role === 'ADMIN' || profile.role === 'SUPER_ADMIN'">
        <h2 class="title !text-left !text-[32px] !m-[20px_0]">Админ панель</h2>
        <ul class="profile__sidebar-list w-[280px]">
            <li class="profile__sidebar-li" v-for="link in adminLinks" :key="link">
                <RouterLink :to="link.link"
                    class="profile__sidebar-links items-center gap-[10px] duration-300
                        block flex !p-[16px_22px] rounded-[10px] hover:bg-purple-dark
                        border-purple-dark border !mb-[16px] bg-blackish cursor-pointer"
                >
                    <span class="profile__sidebar-icon" v-if="link.icon">
                        <Component :is="link.icon" />
                    </span>
                    <p class="profile__sidebar-text text">{{ link.text }}</p>
                </RouterLink>
            </li>
        </ul>
    </div>
</template>

<script setup>

    import { ref } from 'vue';
    import { useUserStore } from '@/entities/users/model/store';

    import Profile from '@/shared/icons/profile/sidebar/Profile.vue';
    import Settings from '@/shared/icons/profile/sidebar/Settings.vue';
    import MyEvents from '@/shared/icons/profile/sidebar/MyEvents.vue';
    import Notification from '@/shared/icons/profile/sidebar/Notification.vue';
    import FavoritesMasters from '@/shared/icons/profile/sidebar/FavoritesMasters.vue';

    const userStore = useUserStore();
    const profile = userStore.profile;    

    const sidebarLinks = ref([
        {
            text: 'Профиль',
            icon: Profile,
            link: '/profile'
        },
        {
            text: 'Мои события',
            icon: MyEvents,
            link: '/my-events'
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
    ]);

    const adminLinks = ref([
        {
            text: 'База пользователей',
            link: '/users',
        },
        {
            text: 'Редактирование новостей',
            link: '/news',
        },
        {
            text: 'Редактирование тегов',
            link: '/tags',
        },
        {
            text: 'Утверждение событий',
            link: '/events/approval',
        }
    ])

    const masterLinks = ref([
        {
            text: 'Созданные события',
            link: '/master-events',
        },
    ])

    const isExternal = (url) => /^https?:\/\//.test(url);

</script>