<template>
    <header class="header">
        <Navbar  v-if="!isMobile" />
        <MobileNavbar v-else />
    </header>
    <main class="main">
        <div class="page-container">
            <Component :is="layout">
                <RouterView />
            </Component>
        </div>
    </main>
    <footer class="footer">
        <Footer v-if="!isMobile" />
        <MobileFooter v-else />
    </footer>
</template>

<script setup>

    import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
    import { useRoute } from 'vue-router';

    import Navbar from '@/shared/layouts/Navbar.vue';
    import Footer from '@/shared/layouts/Footer.vue';

    import MobileNavbar from '@/shared/layouts/mobile/MobileNavbar.vue';
    import MobileFooter from '@/shared/layouts/mobile/MobileFooter.vue';

    import ProfileLayout from '@/layouts/ProfileLayout.vue';
    import DefaultLayout from '@/layouts/DefaultLayout.vue';
    import LoginLayout from '@/layouts/LoginLayout.vue';
    import FormLayout from '@/layouts/FormLayout.vue';
    
    const route = useRoute();

    const layouts = {
        profile: ProfileLayout,
        default: DefaultLayout,
        form: FormLayout,
        login: LoginLayout,
    }

    const isMobile = ref(false);

    const checkInMobile = () => {
        isMobile.value = window.innerWidth < 992;
    }

    const layout = computed(() => {
        return layouts[route.meta.layout || 'login'];
    });

    onMounted(() => {
        checkInMobile();
        window.addEventListener('resize', () => checkInMobile());
    })

    onBeforeUnmount(() => {
        window.removeEventListener('resize', () => checkIsMobile());
    })

</script>