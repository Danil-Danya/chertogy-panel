<template>
    <div class="profile__section !p-[30px] shadow-[0_0_20px_0_rgba(100,146,86,0.15)] rounded-[10px]
                bg-[radial-gradient(103.75%_60.01%_at_51.36%_54.36%,rgba(44,38,47,0.30)_0%,rgba(21,21,22,0.30)_100%)]"
    >
        <div class="profile__section-container flex flex-wrap md:flex-nowrap gap-[30px]">
            <div class="profile__section-avatar w-full h-auto md:!w-[256px] md:h-[256px]">
                <img v-if="user.profile.avatarPath"
                    :src="`${imageUrl}/${user.profile.avatarPath}`" 
                    class="profile__section-avatar-img block rounded-[10px] w-full h-auto md:!w-[256px] md:h-[256px]"
                    alt="Аватарка" 
                >
                <img v-else
                    src="https://api.xn----dtbbbhdau6cfpgt1e.xn--p1ai/images/default_avatar.png" 
                    class="profile__section-avatar-img block rounded-[10px] w-full h-auto md:!w-[256px] md:h-[256px]"
                    alt="Аватарка" 
                >
            </div>
            <div class="profile__section-data flex gap-[30px] flex-wrap w-full">
                <div class="profile__section-data-item max-h-[50px]" v-for="item in profileData" :key="item">
                    <div class="profile__section-data-top">
                        <h3 class="profile__section-title text !text-purple-dark">{{ item.title }}</h3>
                    </div>
                    <div class="profile__section-data-bottom !mt-[10px]">
                        <a :href="item.link" class="profile__section-link !text-[24px] text" v-if="item.link">{{ item.text }}</a>
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
        <div class="profile__section-content">
            <div class="profile__section-card-container flex gap-[30px] !mt-[50px] flex-wrap">
                <ProfileCard v-for="item in profileCard"
                    :key="item"
                    :title="item.title"
                    :value="item.value"
                    class="!w-full md:!w-auto"
                />
                <div class="profile__follow w-[220px] cursor-pointer">
                    <p class="profile__follow-text text !text-gray-mid text-right">Получать уведомления о событиях мастера</p>
                    <span>
                        
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

    import { reactive } from 'vue';
    import { useUserStore } from '@/entities/users/model/store';

    import getDaysSinceRegistration from '@/utils/getDaysSinceRegistration';

    import ProfileCard from '@/widgets/cards/ProfileCard.vue';

    const imageUrl = import.meta.env.VITE_APP_IMAGE_URL;

    const userStore = useUserStore();
    const user = userStore.user;

    const profileData = reactive([
        {
            title: 'Имя',
            text: user.profile.name
        },
        {
            title: 'Ссылка на соц. сети',
            text: user.profile.socialLink || 'Сыллка не была оставлена',
            link: user.profile.socialLink
        },
        {
            title: 'Дата регистрации',
            text: `${user.createdAt.split('T')[0]}, ${user.createdAt.split('T')[1].split('.')[0]}`,
        },
    ])

    const profileCard = reactive([
        {
            title: 'Стаж',
            value: `${getDaysSinceRegistration(user.createAt)} дней`
        },
        {
            title: 'Участник',
            value: '0 событий'
        },
        {
            title: 'Провёл',
            value: '0 событий',
            roles: ['MASTER', 'ADMIN']
        },
    ])

</script>