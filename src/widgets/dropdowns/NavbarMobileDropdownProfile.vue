<template>
    <div class="navbar__dropdown">
        <div class="container">
            <div class="navbar__dropdown-content">
                <ul class="navbar__dropdown-list">
                    <li class="navbar__dropdown-li" v-for="link in navLinks" :key="link">
                        <NuxtLink :to="link.path" class="navbar__dropdown-link" @click="emit('closeDropdown')">{{ link.text }}</NuxtLink>
                        <span class="navbar__dropdown-icon">
                            <Component :is="link.icon" />
                        </span>
                    </li>
                </ul>
                <ul class="navbar__dropdown-list">
                    <li class="navbar__dropdown-li flex gap-[20px] text-right items-center justify-end" v-for="link in profileLinks" :key="link">
                        <RouterLink :to="link.path" class="navbar__dropdown-link !m-0" @click="emit('closeDropdown')">{{ link.text }}</RouterLink>
                        <span class="navbar__dropdown-icon">
                            <Component :is="link.icon" />
                        </span>
                    </li>
                </ul>
                <ul class="navbar__dropdown-list" v-if="profile.role === 'MASTER' || profile.role === 'ADMIN' || profile.role === 'SUPER_ADMIN'">
                    <li class="navbar__dropdown-li flex gap-[20px] text-right items-center justify-end" v-for="link in masterLinks" :key="link">
                        <RouterLink :to="link.path" class="navbar__dropdown-link !m-0" @click="emit('closeDropdown')">{{ link.text }}</RouterLink>
                        <span class="navbar__dropdown-icon">
                            <Component :is="link.icon" />
                        </span>
                    </li>
                </ul>
                <ul class="navbar__dropdown-list"  v-if="profile.role === 'ADMIN' || profile.role === 'SUPER_ADMIN'">
                    <li class="navbar__dropdown-li flex gap-[20px] text-right items-center justify-end" v-for="link in adminLinks" :key="link">
                        <RouterLink :to="link.path" class="navbar__dropdown-link !m-0" @click="emit('closeDropdown')">{{ link.text }}</RouterLink>
                        <span class="navbar__dropdown-icon">
                            <Component :is="link.icon" />
                        </span>
                    </li>
                </ul>
                <div class="navbar__dropdown-bottom">
                    <div class="navbar__dropdown-help">
                        <div class="navbar__dropdown-help-link" @click="logout">
                            <p class="navbar__dropdown-help-text text-pink-bright">Выйти из аккаунта</p>
                            <span class="navbar__dropdown-help-icon">
                                <LogoutIcon />
                            </span>
                        </div>
                        <div class="navbar__dropdown-help" v-if="userStore.profile.role !== 'USER'">
                            <a href="https:/t.me/ChertogiGeroev" class="navbar__dropdown-help-link">
                                <p class="navbar__dropdown-help-text">Помогите мне</p>
                                <span class="navbar__dropdown-help-icon">
                                    <HelpIcon />
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

    import { ref, computed } from 'vue';
    import { useRouter } from 'vue-router';
    import { useUserStore } from '@/entities/users/model/store';

    const userStore = useUserStore();
    const router = useRouter();

    const profile = computed(() => userStore.profile);

    import HelpIcon from '@/shared/icons/navbar/Help.vue';

    import ProfileIcon from '@/shared/icons/navbar/login/Profile.vue';
    import SettingsIcon from '@/shared/icons/navbar/login/Settings.vue';
    import NotificationIcon from '@/shared/icons/navbar/login/Notification.vue';
    import FollowingMastersIcon from '@/shared/icons/navbar/login/FollowingMasters.vue';
    import LogoutIcon from '@/shared/icons/navbar/login/Logout.vue';
    import MyEventsIcon from '@/shared/icons/profile/sidebar/MyEvents.vue';
    import MasterEventIcon from '@/shared/icons/profile/sidebar/MasterEvent.vue'
    import EditNewsIcon from '@/shared/icons/profile/sidebar/EditNews.vue';
    import EditTagsIcon from '@/shared/icons/profile/sidebar/EditTags.vue';
    import ApplyNotificationIcon from '@/shared/icons/profile/sidebar/ApplyNotification.vue';
    import AboutIcon from '@/shared/icons/navbar/login/About.vue';
    import TariffIcon from '@/shared/icons/navbar/login/Tariff.vue';
    import TravelIcon from '@/shared/icons/navbar/login/Travel.vue';
    import NewsIcon from '@/shared/icons/navbar/login/News.vue';
    import ContactsIcon from '@/shared/icons/navbar/login/Contacts.vue';


    const emit = defineEmits(['closeDropdown']);

    const navLinks = ref([
        { text: 'О клубе', path: '/', icon: AboutIcon },
        { text: 'Тарифы', path: '/tariffs', icon: TariffIcon },
        { text: 'К приключениям', path: '/technical-work', icon: TravelIcon },
        { text: 'Новости', path: '/news', icon: NewsIcon },
        { text: 'Контакты', path: '/contacts', icon: ContactsIcon },
    ])

    const profileLinks = ref([
        { text: 'Профиль', path: '/profile', icon: ProfileIcon },
        { text: 'Мои события', path: '/my-events', icon: MyEventsIcon },
        { text: 'Уведомления', path: '/notifications', icon: NotificationIcon },
        { text: 'Избранные мастера', path: '/favorites-masters', icon: FollowingMastersIcon },
        { text: 'Настройки', path: '/settings', icon: SettingsIcon },
    ])

    const masterLinks = ref([
        {
            text: 'Созданные события',
            icon: MasterEventIcon,
            path: '/master-events',
        },
    ])

    const adminLinks = ref([
        {
            text: 'База пользователей',
            icon: ProfileIcon,
            path: '/users',
        },
        {
            text: 'Редактирование новостей',
            path: '/news',
            icon: EditNewsIcon
        },
        {
            text: 'Редактирование тегов',
            path: '/tags',
            icon: EditTagsIcon
        },
        {
            text: 'Утверждение событий',
            path: '/events/approval',
            icon: ApplyNotificationIcon
        }
    ])

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        emit('closeDropdown');
        userStore.$reset();
        router.replace('/login')
    }

</script>