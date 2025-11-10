<template>
    <div class="users-table rounded-[10px] !mt-[30px]">
        <table class="w-full rounded-[10px] border-separate border-spacing-y-[10px]">
            <thead class="h-[60px] rounded-[10px]"
                style="background: linear-gradient(257deg, rgba(90, 51, 98, 0.20) -4.79%, rgba(31, 24, 33, 0.20) 86.4%);"
            >
                <tr class="text-left">
                    <th class="text rounded-l-[10px] !p-[10px]">#</th>
                    <th class="text !p-[10px]" @click="sortBy('login')">Логин</th>
                    <th class="text !p-[10px]">Телефон</th>
                    <th class="text !p-[10px]">Email</th>
                    <th class="text !p-[10px]">Роль</th>
                    <th class="text !p-[10px] rounded-r-[10px]">Действия</th>
                </tr>
            </thead>

            <div class="!mt-[30px]"></div>

            <tbody>
                <tr v-for="(user, index) in users" :key="user.id"
                    :class="{
                        'rounded-t-[10px]': index === 0
                    }"
                    style="background: linear-gradient(
                        257deg, rgba(90, 51, 98, 0.20) 
                        -4.79%, rgba(31, 24, 33, 0.20) 86.4%
                    );"
                >
                    <td class="text !p-[10px]">
                        {{ String(index + 1).padStart(2, '0') }}
                    </td>

                    <td class="user-login !p-[10px]">
                        <div class="flex gap-[10px] items-center">
                            <img :src="`${IMAGE_URL}/${user.profile.avatarPath}`" alt="avatar" class="avatar w-[50px] h-[50px] rounded-full" />
                            <span class="text">{{ user.login }}</span>
                        </div>
                    </td>

                    <td class="text !p-[10px] !text-purple-light">{{ user.profile.phone }}</td>
                    <td class="text !p-[10px] !text-gray-mid">{{ user.email }}</td>

                    <td class="!p-[10px]">
                        <span :class="[
                            'role', 
                            user.role.toLowerCase(),
                            {
                                'bg-blue-mid': user.role === 'USER',
                                'bg-green-dark': user.role === 'MASTER',
                                'bg-red-bright': user.role === 'ADMIN'
                            }
                        ]"
                        class="text !p-[10px_5px] flex justify-center items-center rounded-[5px]"
                        >
                            {{ rolesHelper[user.role.toLowerCase()].ru }}
                        </span>
                    </td>

                    <td class="actions !p-[10px] relative">
                        <button @click="toggleDropdown(user.id)" title="Редактировать" class=" w-full cursor-pointer flex justify-center items-center">
                            <Pen class="text-purple-dark hover:text-purple-light duration-300" />
                        </button>
                        <Transition name="dropdown">
                            <UserDropdown class="absolute right-0 top-[70px] z-10" :user="user" v-if="dropdown.isActive && dropdown.id === user.id"/>
                        </Transition>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import Pen from "@/shared/icons/user/Pen.vue";
    import UserDropdown from "@/widgets/dropdowns/UserDropdown.vue";

    import rolesHelper from "@/utils/rolesHelper";

    const IMAGE_URL = import.meta.env.VITE_APP_IMAGE_URL || '';

    const dropdown = ref({
        isActive: false,
        id: null
    });

    const toggleDropdown = (id) => {
        if (dropdown.value.isActive && dropdown.value.id === id) {
            dropdown.value.isActive = false;
            dropdown.value.id = null;
        } 
        else {
            dropdown.value.isActive = true;
            dropdown.value.id = id;
        }
    }

    const props = defineProps({
        users: {
            type: Array,
            required: true
        }
    });

    const limit = ref(10);

    const deleteUser = (user) => {
        console.log("Удалить:", user);
    };

    const nextPage = () => {};
    const prevPage = () => {};
</script>
