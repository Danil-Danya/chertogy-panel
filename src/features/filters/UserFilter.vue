<template>
    <div class="users__filter">
        <div class="users__filter-content flex justify-between flex-wrap md:flex-nowrap">
            <div class="users__input-container md:!w-[400px] w-full">
                <SearchInput class="md:!w-[400px] w-full" placeholder="Введите никнейм" v-model="search" @input="debouncedUpdateFilter" />
            </div>
            <div class="users__checkbox-container flex flex-col justify-between">
                <h3 class="user__filter-title text-[14px] text-purple-dark">Фильтровать по</h3>
                <div class="users__checkboxes flex gap-[5px]">
                    <Checkbox
                        v-for="role in roleFilter"
                        :key="role.value"
                        :label="role.text"
                        v-model="role.checked"
                        @update:modelValue="debouncedUpdateFilter"
                    />
                </div>
            </div>
            <!-- <div class="users__crate flex items-end">
                <Button text="+" color="green" class="!w-[50px] h-[50px]" />
            </div> -->
        </div>
    </div>
</template>

<script setup>

    import { ref, onMounted, reactive } from 'vue';

    import SearchInput from '@/shared/ui/SearchInput.vue';
    import Button from '@/shared/ui/Button.vue';
    import Checkbox from '@/shared/ui/Checkbox.vue';

    import { useUserStore } from '@/entities/users/model/store';

    import { debounce } from '@/utils/debounce';
    
    const userStore = useUserStore();

    const search = ref('');

    const roleFilter = ref([
        { text: 'Пользователь', value: 'USER', checked: false },
        { text: 'Админ', value: 'ADMIN', checked: false },
        { text: 'Мастер', value: 'MASTER', checked: false },
    ]);

    const filter = {
        page: 1,
        limit: 100,
    }

    onMounted(async () => {
        await userStore.fetchUsers(filter);
    });

    const updateFilter = async () => {
        const selectedRoles = roleFilter.value
            .filter(r => r.checked)
            .map(r => r.value);

        filter.roles = selectedRoles;

        filter.searchField = 'login';
        filter.search = search.value;

        await userStore.fetchUsers(filter);
    }

    const debouncedUpdateFilter = debounce(updateFilter, 100);

</script>