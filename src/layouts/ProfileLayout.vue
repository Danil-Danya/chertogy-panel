<template>
    <section class="profile min-h-[100vh] md:!pt-[150px] !pt-[100px] !pb-[60px]">
        <div class="container">
            <div class="profile__container flex justify-between">
                <div class="flex flex-wrap items-center gap-[30px]">
                    <h1 class="title !text-left">{{ title }}</h1>
                    <div class="profile__user flex gap-[10px]">
                        <p class="profile__name text-[32px] text-purple-dark">{{ profile.login }}</p>
                        <p class="profile__role text-[32px] text-blue-dark">({{ rolesHelper[profile.role.toLowerCase()].ru }})</p>
                    </div>
                </div>
                <button class="bg-[#18171E] !p-[15px] cursor-pointer rounded-[8px] h-[50px]" @click="goBack">
                    <span>
                        <ArrowIcon />
                    </span>
                </button>
            </div>
            <div class="profile__content md:!mt-[60px] !mt-[30px] flex gap-[20px]">
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

    import { computed, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    import { useIsMobile } from '@/composables/useIsMobile';
    import { useUserStore } from '@/entities/users/model/store';
    import ArrowIcon from '@/shared/icons/ui/ArrowBack.vue';

    import rolesHelper from '@/utils/rolesHelper';

    import ProfileSidebar from '@/shared/layouts/ProfileSidebar.vue';

    const userStore = useUserStore();

    const route = useRoute();
    const router = useRouter();
    const isMobile = useIsMobile();

    const goBack = () => {
        router.go(-1);
    }

    onMounted(async () => {
        await userStore.fetchProfile();
    });

    const title = computed(() => route.meta.title);
    const profile = computed(() => userStore.profile);

</script>