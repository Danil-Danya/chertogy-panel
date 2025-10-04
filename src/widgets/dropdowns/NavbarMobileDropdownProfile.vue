<template>
    <div class="navbar__dropdown">
        <div class="container">
            <div class="navbar__dropdown-content">
                <ul class="navbar__dropdown-list">
                    <li class="navbar__dropdown-li flex gap-[20px] items-center !mt-[30px]" v-for="link in navLinks" :key="link">
                        <span class="navbar__dropdown-icon">
                            <Component :is="link.icon" />
                        </span>
                        <RouterLink :to="link.path" class="navbar__dropdown-link !m-0" @click="emit('closeDropdown')">{{ link.text }}</RouterLink>
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useUserStore } from '@/entities/users/model/store';

    const userStore = useUserStore();
    const router = useRouter();

    import HelpIcon from '@/shared/icons/navbar/Help.vue';

    import ProfileIcon from '@/shared/icons/navbar/login/Profile.vue';
    import SettingsIcon from '@/shared/icons/navbar/login/Settings.vue';
    import NotificationIcon from '@/shared/icons/navbar/login/Notification.vue';
    import FollowingMastersIcon from '@/shared/icons/navbar/login/FollowingMasters.vue';
    import LogoutIcon from '@/shared/icons/navbar/login/Logout.vue';


    const emit = defineEmits(['closeDropdown']);

    const navLinks = ref([
        { text: 'Профиль', path: '/profile', icon: ProfileIcon },
        { text: 'Мои события', path: '/' },
        { text: 'Уведомления', path: '/notifications', icon: NotificationIcon },
        { text: 'Избранные мастера', path: '/favorites-masters', icon: FollowingMastersIcon },
        { text: 'Настройки', path: '/settings', icon: SettingsIcon },
    ])

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        emit('closeDropdown');
        userStore.$reset();
        router.replace('/login')
    }

</script>