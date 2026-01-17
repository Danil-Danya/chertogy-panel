<template>
    <div class="profile__section !p-[30px] shadow-[0_0_20px_0_rgba(100,146,86,0.15)] rounded-[10px]
                bg-[radial-gradient(103.75%_60.01%_at_51.36%_54.36%,rgba(44,38,47,0.30)_0%,rgba(21,21,22,0.30)_100%)]"
    >
        <div class="profile__section-container flex flex-wrap md:flex-nowrap gap-[30px]">
            <div class="profile__section-avatar w-full h-auto md:!w-[256px] md:h-[256px]">
                <img v-if="profile.profile.avatarPath"
                    :src="`${imageUrl}/${profile.profile.avatarPath}`" 
                    class="profile__section-avatar-img block rounded-[10px] w-full h-[340px] md:!w-[256px] md:h-[256px]"
                    alt="Аватарка" 
                >
                <img v-else
                    src="https://api.xn----dtbbbhdau6cfpgt1e.xn--p1ai/images/default_avatar.png" 
                    class="profile__section-avatar-img block rounded-[10px] w-full h-[340px] md:!w-[256px] md:h-[256px]"
                    alt="Аватарка" 
                >
            </div>
            <div class="profile__section-data flex flex-wrap max-w-[550px]">
                <div class="profile__section-data-item w-[250px] !mb-[30px]" v-for="item in profileData" :key="item">
                    <div class="profile__section-data-top">
                        <h3 class="profile__section-title text !text-purple-dark">{{ item.title }}</h3>
                    </div>
                    <div class="profile__section-data-bottom !mt-[10px]">
                        <a :href="item.link" class="profile__section-link !text-[24px] text hover:!text-purple-light" v-if="item.link">{{ item.text }}</a>
                        <p class="profile__section-text !text-[24px] text" v-else>{{ item.text }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="profile__section-content">
            <div class="profile__section-bio">
                <h3 class="profile__section-title text !text-purple-dark !mb-[15px]">Обо мне</h3>
                <p class="profile__section-text text" v-if="profile.profile.biography">{{ profile.profile.biography }}</p>
                <p class="profile__section-text text" v-else>Вы не оставили вашу историю.</p>
            </div>
            <div class="profile__section-card-container flex gap-[30px] !mt-[50px]">
                <ProfileCard v-for="item in profileCard"
                    :key="item"
                    :title="item.title"
                    :value="item.value"
                    :color="item.color"
                />
            </div>
        </div>
    </div>
</template>

<script setup>

    import { reactive, ref } from 'vue';
    import { useUserStore } from '@/entities/users/model/store';

    import getDaysSinceRegistration from '@/utils/getDaysSinceRegistration';
    import truncateString from '@/utils/truncateString';

    import ProfileCard from '@/widgets/cards/ProfileCard.vue';

    const imageUrl = import.meta.env.VITE_APP_IMAGE_URL;

    const userStore = useUserStore();
    const profile = userStore.profile;

    const maxLengthForUserData = 25;

    const profileData = reactive([
        {
            title: 'Имя',
            text: truncateString(profile.profile.name, maxLengthForUserData)
        },
        {
            title: 'Ссылка на соц. сети',
            text: truncateString(profile.profile.socialLink, maxLengthForUserData),
            link: profile.profile.socialLink 
        },
        {
            title: 'Телефон',
            text: profile.profile.phone,
            link: `tel:${profile.profile.phone}`
        },
        {
            title: 'Email',
            text: truncateString(profile.email, maxLengthForUserData),
            link: `mailto:${profile.email}`
        },
        {
            title: 'Дата регистрации',
            text: (() => {
                const [year, month, day] = profile.createdAt.split('T')[0].split('-');
                return `${day}.${month}.${year.slice(-2)}`;
            })()
        },
    ])

    const profileCard = reactive([
        {
            title: 'Стаж',
            value: `${getDaysSinceRegistration(profile.createdAt)} дней`,
            color: 'linear-gradient(257deg, rgba(134, 72, 156, 0.20) -4.79%, rgba(58, 58, 58, 0.20) 86.4%)'
        },
        {
            title: 'Участник',
            value: `${profile.subscribedEvents.length} событий`,
            color: 'linear-gradient(257deg, rgba(51, 87, 129, 0.20) -4.79%, rgba(58, 58, 58, 0.20) 86.4%)'
        },
    ])

</script>