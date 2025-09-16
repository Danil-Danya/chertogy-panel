<template>
    <section class="profile min-h-[100vh] !pt-[150px]">
        <div class="container">
            <div class="profile__container flex flex-wrap gap-[30px]">
                <h1 class="title !text-left">{{ title }}</h1>
                <div class="profile__user flex gap-[10px]">
                    <p class="profile__name text-[32px] text-purple-dark">Strelokkk</p>
                    <p class="profile__role text-[32px] text-blue-dark">(игрок)</p>
                </div>
            </div>
            <div class="profile__content !mt-[60px] flex gap-[20px]">
                <div class="profile__sidebar" v-if="!isMobile">
                    <ProfileSidebar />
                </div>
                <div class="profile__content-container w-full">
                    <RouterView />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>

    import { computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { useIsMobile } from '@/composables/useIsMobile';

    import ProfileSidebar from '@/shared/layouts/ProfileSidebar.vue';

    const route = useRoute();
    const isMobile = useIsMobile();

    const title = computed(() => route.meta.title);

</script>