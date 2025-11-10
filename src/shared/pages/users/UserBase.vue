<template>
    <section class="users">
        <div class="users__content !p-[30px] rounded-[10px]" 
            style="background: var(--plate-main, radial-gradient(
                        103.75% 60.01% at 51.36% 54.36%, 
                        rgba(44, 38, 47, 0.30) 0%, 
                        rgba(21, 21, 22, 0.30) 100%)
                    );
                   backdrop-filter: blur(10px);
                "
        >
            <UserFilter />
            <UserTable v-if="userStore.users?.rows"
                :users="userStore.users.rows" 
            />
        </div>
    </section>
</template>

<script setup>

    import { watch } from 'vue';
    import { useUserStore } from '@/entities/users/model/store';

    import UserTable from '@/features/tables/UserTable.vue';
    import UserFilter from '@/features/filters/UserFilter.vue';
    
    const userStore = useUserStore();

    watch(
        () => userStore.users,
        { deep: true }
    )

</script>