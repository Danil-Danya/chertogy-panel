<template>
    <div class="profile__container flex flex-wrap gap-[30px]">
        <h1 class="title !text-left">Пользователь</h1>
        <div class="profile__user flex gap-[10px]" v-if="user">
            <p class="profile__name text-[32px] text-purple-dark">{{ user.profile.name }}</p>
            <p class="profile__role text-[32px] text-blue-dark">({{ rolesHelper[user.role.toLowerCase()].ru }})</p> 
        </div>
        <div class="profile__content-container w-full" v-if="user">
            <UserProfile />
        </div>
    </div>
</template>

<script setup>

    import { computed, onMounted } from 'vue';
    import { useRoute } from 'vue-router';

    import { useUserStore } from '@/entities/users/model/store';

    import rolesHelper from '@/utils/rolesHelper';
    import UserProfile from './UserProfile.vue';

    const userStore = useUserStore();
    const route = useRoute();

    const user = computed(() => userStore.user);
    
    onMounted(async () => await userStore.fetchUser(route.params.id));

</script>