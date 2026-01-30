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

    import { ref, onMounted, reactive, computed } from 'vue';

    import SearchInput from '@/shared/ui/SearchInput.vue';
    import Button from '@/shared/ui/Button.vue';
    import Checkbox from '@/shared/ui/Checkbox.vue';

    import { useUserStore } from '@/entities/users/model/store';

    import { debounce } from '@/utils/debounce';
    
    const userStore = useUserStore();

    const props = defineProps({
        filter: Object
    });

    const search = computed({
        get: () => props.filter.search,
        set: (v) => props.filter.search = v
    });

    const roleFilter = ref([
        { text: 'Пользователь', value: 'USER', checked: props.filter.roles.includes('USER') },
        { text: 'Админ', value: 'ADMIN', checked: props.filter.roles.includes('ADMIN') },
        { text: 'Мастер', value: 'MASTER', checked: props.filter.roles.includes('MASTER') },
    ]);


    onMounted(async () => {
        await userStore.fetchUsers(props.filter);
    });

    const updateFilter = async () => {
        props.filter.roles = roleFilter.value
            .filter(r => r.checked)
            .map(r => r.value);

        props.filter.page = 1; 

        await userStore.fetchUsers(props.filter);
    }

    const debouncedUpdateFilter = debounce(updateFilter, 100);


</script>