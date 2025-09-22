<template>
    <section class="navbar">
        <div class="container">
            <div class="navbar__content">
                <div class="navbar__left">
                    <div class="navbar__logo-container">
                        <img loading="lazy" src="@/assets/images/logos/logo-nav.png" class="navbar__logo-img" alt="logo" format="webp" />
                    </div>
                    <ul class="navbar__socials-list" v-for="link in navbarSocialLinks" :key="link" >
                        <li class="navbar__social-li">
                            <a :href="link.path" class="navbar__social-link">
                                <span class="navbar__socials-icon">
                                    <Component :is="link.icon" />
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="navbar__center">
                    <nav class="navbar__nav">
                        <ul class="navbar__nav-list">
                            <li class="navbar__nav-li" v-for="link in navLinks" :key="link">
                                <a :href="link.path" class="navbar__nav-link" :class="link.target ? 'target' : null">
                                    <img loading="lazy" src="@/assets/images/navbar/left-icon.png" class="navbar__nav-img" alt="logo" format="webp" v-if="link.target" />
                                    <p>{{ link.text }}</p>
                                    <img loading="lazy" src="@/assets/images/navbar/right-icon.png" class="navbar__nav-img" alt="logo" format="webp" v-if="link.target" />
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class="navbar__right">
                    <div class="navbar__login" v-if="profile">
                        <a href="/profile" class="navbar__button-link">
                            <img :src="`${imageUrl}/${profile.profile.avatarPath}`" alt="Аватарка" class="navbar__button-img">
                        </a>
                        <a href="/login" class="navbar__button-link" @click.prevent.stop="logout">
                            <span class="navbar__button-icon">
                                <UserIcon />
                            </span>
                            Выйти
                        </a>
                    </div>
                    <div class="navbar__logout" v-else>
                        <a href="/login" class="navbar__button-link">
                            <span class="navbar__button-icon">
                                <UserIcon />
                            </span>
                            Войти
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>

    import { computed, onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useUserStore } from '@/entities/users/model/store';

    import VKIcon from '@/shared/icons/navbar/VK.vue';
    import TGIcon from '@/shared/icons/navbar/Telegram.vue';
    import UserIcon from '@/shared/icons/navbar/User.vue';

    const userStore = useUserStore();
    const router = useRouter();

    const profile = computed(() => userStore.profile);

    const imageUrl = import.meta.env.VITE_APP_IMAGE_URL;

    const navLinks = ref([
        { text: 'О клубе', path: '/' },
        { text: 'Тарифы', path: '/tariffs' },
        { text: 'К приключениям', path: '/technical-work', target: true },
        { text: 'Новости', path: '/news' },
        { text: 'Контакты', path: '/contacts' },
    ])

    const navbarSocialLinks = ref([
        { icon: TGIcon, path: 'https://t.me/ChertogiGeroev_Club' },
        { icon: VKIcon, path: 'https://vk.com/chertogi.club' },
    ])

    onMounted(async () => await userStore.fetchProfile());

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        router.replace('/login')
    }

</script>

<style lang="scss" scoped>
    @import '@/assets/styles/layouts/navbar.scss';
</style>
