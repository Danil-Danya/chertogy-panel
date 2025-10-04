<template>
    <div class="profile__section !p-[30px] shadow-[0_0_20px_0_rgba(100,146,86,0.15)] rounded-[10px]
                bg-[radial-gradient(103.75%_60.01%_at_51.36%_54.36%,rgba(44,38,47,0.30)_0%,rgba(21,21,22,0.30)_100%)]"
    >
        <div class="profile__section-container flex flex-wrap md:flex-nowrap gap-[30px]">
            <div class="profile__section-avatar w-full h-auto md:!w-[340px] md:h-[256px]">
                <img v-if="user.profile.avatarPath"
                    :src="`${imageUrl}/${user.profile.avatarPath}`" 
                    class="profile__section-avatar-img block rounded-[10px] w-full h-auto md:!w-[340px] md:h-[256px]"
                    alt="Аватарка" 
                >
                <img v-else
                    src="https://api.xn----dtbbbhdau6cfpgt1e.xn--p1ai/images/default_avatar.png" 
                    class="profile__section-avatar-img block rounded-[10px] w-full h-auto md:!w-[256px] md:h-[256px]"
                    alt="Аватарка" 
                >
            </div>
            <div class="profile__section-data flex gap-[30px] flex-wrap w-full relative">
                <span class="followIcon absolute right-0 top-0 cursor-pointer" @click="toggleFollowThisUser">
                    <OnStarIcon v-if="!isFollowed" />
                    <OffStarIcon v-else />
                </span>
                <div class="profile__section-data-item max-h-[50px]" v-for="item in profileData" :key="item">
                    <div class="profile__section-data-top">
                        <h3 class="profile__section-title text !text-purple-dark">{{ item.title }}</h3>
                    </div>
                    <div class="profile__section-data-bottom !mt-[10px]">
                        <a :href="item.link" class="profile__section-link !text-[24px] text hover:text-purple-light" v-if="item.link">{{ item.text }}</a>
                        <p class="profile__section-text !text-[24px] text" v-else>{{ item.text }}</p>
                    </div>
                </div>
                <div class="profile__section-bio">
                    <h3 class="profile__section-title text !text-purple-dark">Обо мне</h3>
                    <p class="profile__section-text text" v-if="user.profile.biography">{{ user.profile.biography }}</p>
                    <p class="profile__section-text text" v-else>Данный пользовател не оставил свою историю</p>
                </div>
            </div>
        </div>
        <div class="profile__section-content flex justify-between items-center flex-wrap !mt-[50px]">
            <div class="profile__section-card-container flex gap-[30px] flex-wrap">
                <ProfileCard v-for="item in profileCard"
                    :key="item"
                    :title="item.title"
                    :value="item.value"
                    :color="item.color"
                    class="!w-full md:!w-auto"
                />
            </div>
            <div class="profile__follow w-[320px] cursor-pointer flex gap-[10px] !mt-[30px]"
                :class="isNotificated ? '!text-purple-mid' : '!text-gray-mid'"
                @click="changeNotification"
            >
                <p class="profile__follow-text text-[20px] text-right" v-if="!followMessage.text">Получать уведомления о событиях мастера</p>
                <p class="profile__follow-text text-[20px] text-right !text-red-500" v-else>{{ followMessage.text }}</p>
                <span class="profile__follow-icon block !p-[16px] rounded-[10px] max-h-[64px]"
                    style="background: linear-gradient(257deg, rgba(51, 87, 129, 0.20) -4.79%, rgba(58, 58, 58, 0.20) 86.4%);"
                >
                    <NotificationIcon />
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>

    import { computed, reactive, ref } from 'vue';
    import { useUserStore } from '@/entities/users/model/store';
    import { followOnMaster, unFollowOnMaster } from '@/entities/followers/lib/api';

    import getDaysSinceRegistration from '@/utils/getDaysSinceRegistration';
    import truncateString from '@/utils/truncateString';

    import ProfileCard from '@/widgets/cards/ProfileCard.vue';

    import NotificationIcon from '@/shared/icons/profile/notification/Notification.vue';
    import OnStarIcon from '@/shared/icons/user/OnStar.vue';
    import OffStarIcon from '@/shared/icons/user/OffStar.vue';

    const imageUrl = import.meta.env.VITE_APP_IMAGE_URL;
    
    const userStore = useUserStore();

    const user = userStore.user;
    const profile = userStore.profile;
    
    const isNotificated = ref(false)
    const isFollowed = ref(profile.following.some(follower => follower.id === user.id));

    const maxLengthForUserData = 25;
    const followMessage = ref({});

    const changeNotification = () => {
        isNotificated.value = !isNotificated.value;
    }

    const toggleFollowThisUser = async () => {
        try {
            if (isFollowed.value) {
                const unFollowed = await unFollowOnMaster(user.id);

                if (unFollowed) {
                    isFollowed.value = false;
                }
            }
            else {
                const followed = await followOnMaster(user.id);

                if (followed) {
                    isFollowed.value = true;
                }
            }
        }
        catch (error) {
            console.log(error);
            followMessage.value.text = error.response.data.message;
        }
    }

    const profileData = reactive([
        {
            title: 'Имя',
            text: truncateString(user.profile.name, maxLengthForUserData)
        },
        {
            title: 'Ссылка на соц. сети',
            text: truncateString(user.profile.socialLink || 'Сыллка не была оставлена', maxLengthForUserData),
            link: user.profile.socialLink
        },
        {
            title: 'Дата регистрации',
            text: (() => {
                const [year, month, day] = user.createdAt.split('T')[0].split('-');
                return `${day}.${month}.${year.slice(-2)}`;
            })(),
        },
    ])

    const profileCard = reactive([
        {
            title: 'Стаж',
            value: `${getDaysSinceRegistration(user.createdAt)} дней`,
            color: 'linear-gradient(257deg, rgba(134, 72, 156, 0.20) -4.79%, rgba(58, 58, 58, 0.20) 86.4%)'
        },
        {
            title: 'Участник',
            value: '0 событий',
            color: 'linear-gradient(257deg, rgba(51, 87, 129, 0.20) -4.79%, rgba(58, 58, 58, 0.20) 86.4%)'
        },
        {
            title: 'Провёл',
            value: '0 событий',
            roles: ['MASTER', 'ADMIN'],
            color: 'linear-gradient(257deg, rgba(210, 60, 72, 0.20) -4.79%, rgba(58, 58, 58, 0.20) 86.4%)'
        },
    ])

</script>