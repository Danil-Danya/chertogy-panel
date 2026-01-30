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
            <UserFilter :filter="filter" />
            <UserTable v-if="userStore.users?.rows.length"
                :users="userStore.users.rows" 
            />
            <Pagination
                v-if="userStore.users && userStore.users.totalPages > 1"
                v-model:page="filter.page"
                :total-pages="userStore.users.totalPages"
            />
        </div>
    </section>
</template>

<script setup>

    import { onMounted, watch, reactive } from 'vue';
    import { useUserStore } from '@/entities/users/model/store';

    import UserTable from '@/features/tables/UserTable.vue';
    import UserFilter from '@/features/filters/UserFilter.vue';
    import Pagination from '@/features/paginate/Pagination.vue';
    
    const userStore = useUserStore();

    const filter = reactive({
        page: 1,
        limit: 10,
        search: '',
        searchField: 'login',
        roles: []
    });

    watch(
        () => userStore.users,
        { deep: true }
    )

    watch(() => filter.page, async () => {
        await userStore.fetchUsers(filter);
    });


    // onMounted(async () => {
    //     await userStore.fetchUsers();
    // })  

</script>