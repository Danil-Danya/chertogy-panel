<template>
    <header class="header">
        <Navbar v-if="!isMobile" />
        <MobileNavbar v-else />
    </header>
    <main class="main">
        <div class="page-container">
            <Component :is="layout">
                <RouterView />
            </Component>
            <Transition name="scroll-animate">
                <button v-if="isMobile && isBottomScrolled" @click="scrollTop"
                    class="page-button bg-[#18171E] w-[50px] h-[50px] 
                           fixed bottom-[10%] right-[10%] flex justify-center 
                           items-center rounded-[10px] cursor-pointer
                           hover:bg-[#3d3a4b] duration-300"
                >
                    <TopArrowIcon />
                </button>
            </Transition>
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

    import TopArrowIcon from '@/shared/icons/ui/TopArrow.vue';
    
    const route = useRoute();

    const isBottomScrolled = ref(false);

    const calculateBottomScroll = () => {
        const scrollTop = window.scrollY;

        isBottomScrolled.value = scrollTop >= 500;
    }

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
 
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
        const handleScroll = () => calculateBottomScroll();

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', () => checkInMobile());
    })

</script>