<template>
    <div class="user__dropdown w-[260px] bg-black rounded-[10px] gap-[30px] !p-[15px]">
        <ul class="user__action-list" v-if="user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN' || userStore.profile.role === 'SUPER_ADMIN'">
            <li v-for="item in rolesList" :key="item.role" class="flex gap-[10px] justify-start !mb-[10px] cursor-pointer" @click="switchUserRole(item.role)">
                <span class="user__dropdown-icon">
                    <Component :is="item.icon" />
                </span>
                <p class="text">{{ item.action }}</p>
            </li>

        </ul>
        <ul class="user__action-list !mt-[30px]" v-if="user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN' || userStore.profile.role === 'SUPER_ADMIN'">
            <li v-for="item in userSettingList" :key="item" class="flex gap-[10px] justify-start !mb-[10px] cursor-pointer" @click="toggleDeleteModal">
                <span class="user__dropdown-icon">
                    <Component :is="item.icon" />
                </span>
                <p class="text">{{ item.action }}</p>
            </li>
        </ul>
        <p class="text" v-else>Операции над пользователем не доступны</p>
        <Transition name="modal">
            <DeleteModal v-if="isActiveDeleteModal"
                :title='`Удалить пользователя: "${user.login} ${user.profile.name}?"`'
                text="Вы уверены, что хотите удалить этот тег? Это действие необратимо."
                @closeModal="toggleDeleteModal"
                @deleteModal="deleteUsers"
            />
        </Transition>
    </div>
</template>

<script setup>

    import AdminIcon from '@/shared/icons/user/Admin.vue';
    import MasterIcon from '@/shared/icons/user/Master.vue';
    import UserIcon from '@/shared/icons/navbar/User.vue';

    import DeleteIcon from '@/shared/icons/user/Delete.vue';
    import DeleteModal from '@/features/modals/DeleteModal.vue';

    import { onMounted, ref, computed } from 'vue';
    import { useRouter } from 'vue-router';
    import { updateUserById, deleteUserById } from '@/entities/users/lib/api';

    import { useUserStore } from '@/entities/users/model/store';

    const isActiveDeleteModal = ref(false);
    const userStore = useUserStore();

    const toggleDeleteModal = () => {
        isActiveDeleteModal.value = !isActiveDeleteModal.value;
    };


    const props = defineProps({
        user: {
            type: Object,
            required: true
        }
    })

    const rolesList = ref([
        {
            icon: AdminIcon,
            action: 'Назначить админом',
            color: 'red',
            role: 'ADMIN',
            isRules: true
        },

        {
            icon: MasterIcon,
            action: 'Назначить мастером',
            color: 'green',
            role: 'MASTER'
        },

        {
            icon: UserIcon,
            action: 'Разжаловать в игроки',
            color: 'blue',
            role: 'USER'
        },
    ])

    const userSettingList = ref([
        {
            icon: DeleteIcon,
            action: 'Удалить пользователя',
            color: 'dark-red'
        }
    ])

    const deleteUsers = async () => {
        try {
            const userId = props.user.id;
            const deletedUser = await deleteUserById(userId);

            if (deletedUser) {
                location.reload();
            }
        }
        catch (error) {
            console.log(error);    
        }
    }

    const switchUserRole = async (role) => {
        try {
            const userId = props.user.id;
            const switchedUserRole = await updateUserById(userId, { role });

            if (switchedUserRole) {
                location.reload();
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    onMounted(async () => {
        await userStore.fetchProfile();
    })

</script>