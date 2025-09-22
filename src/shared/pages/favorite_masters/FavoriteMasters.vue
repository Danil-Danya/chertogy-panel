<template>
    <div class="masters">
        <div class="masters__container flex flex-wrap gap-[20px]">
            <RouterLink :to="`/user/${master.id}`" v-if="masters.length > 0" class="block md:w-[calc(50%-20px)] w-full" v-for="master in masters" :key="master">
                <FavoriteMastersCard :avatar="master.avatar" :name="master.name" />
            </RouterLink>
            <h2 class="title !text-left" v-else>На данный момент вы не подписаны не на одного мастера</h2>
        </div>
    </div>
</template>

<script setup>

    import { computed, reactive } from 'vue';
    import { useUserStore } from '@/entities/users/model/store';

    import FavoriteMastersCard from '@/widgets/cards/FavoriteMastersCard.vue';

    const userStore = useUserStore();

    const masters = computed(() => userStore.profile.following.map(following => {
        return {
            id: following.id,
            name: following.profile.name,
            avatar: following.profile.avatarPath
        }
    }))

</script>