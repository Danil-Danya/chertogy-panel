<template>
    <div class="profile__section !p-[30px] shadow-[0_0_20px_0_rgba(100,146,86,0.15)] rounded-[10px]
                bg-[radial-gradient(103.75%_60.01%_at_51.36%_54.36%,rgba(44,38,47,0.30)_0%,rgba(21,21,22,0.30)_100%)]">
        <div class="profile__section-container flex flex-wrap md:flex-nowrap gap-[30px]">
            <div class="profile__section-avatar w-full h-auto md:!w-[256px] md:h-[256px]">
                <img 
                    src="https://api.xn----dtbbbhdau6cfpgt1e.xn--p1ai/images/default_avatar.png" 
                    class="profile__section-avatar-img block rounded-[10px] w-full h-auto md:!w-[256px] md:h-[256px]"
                    alt="Аватарка" 
                >
            </div>
            <div class="profile__section-data flex flex-wrap max-w-[550px]">
                <div class="profile__section-data-item w-[250px] !mb-[30px]" v-for="item in profileData" :key="item">
                    <div class="profile__section-data-top">
                        <h3 class="profile__section-title text !text-purple-dark">{{ item.title }}</h3>
                    </div>
                    <div class="profile__section-data-bottom !mt-[10px]">
                        <a :href="item.link" class="profile__section-link !text-[24px] text" v-if="item.link">{{ item.text }}</a>
                        <p class="profile__section-text !text-[24px] text" v-else>{{ item.text }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="profile__section-content">
            <div class="profile__section-bio">
                <h3 class="profile__section-title text !text-purple-dark !mb-[15px]">Обо мне</h3>
                <p class="profile__section-text text">Королевство Эландор когда‑то было процветающим и мирным местом, но теперь его окутала тьма. Древние пророчества шепчут о возвращении забытого</p>
            </div>
            <div class="profile__section-card-container flex gap-[30px] !mt-[50px]">
                <ProfileCard v-for="item in profileCard"
                    :key="item"
                    :title="item.title"
                    :value="item.value"
                />
            </div>
        </div>
    </div>
</template>

<script setup>

    import { reactive } from 'vue';

    import ProfileCard from '@/widgets/cards/ProfileCard.vue';

    const profileData = reactive([
        {
            title: 'Имя',
            text: 'Strelokkk',
        },
        {
            title: 'Ссылка на соц. сети',
            text: 't.me/Strelokkk',
            link: 'https://t.me/Strelokkk'
        },
        {
            title: 'Телефон',
            text: '+998 (33) 870-99-09',
            link: 'tel:+998338709909'
        },
        {
            title: 'Email',
            text: 'danil.snip@gmail.com',
            link: 'mailto:danil.snip@gmail.com'
        },
        {
            title: 'Дата регистрации',
            text: '28.10.2024',
        },
    ])

    const profileCard = reactive([
        {
            title: 'Стаж',
            value: '365 дней'
        },
        {
            title: 'Участник',
            value: '10 событий'
        },
    ])

</script>