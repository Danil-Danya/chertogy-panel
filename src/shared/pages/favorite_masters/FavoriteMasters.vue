<template>
    <div class="masters">
        <div class="masters__container flex flex-wrap gap-[20px]">
            <FavoriteMastersCard 
                v-for="master in masters"
                :key="master"
                :avatar="master.avatar"
                :name="master.name"
            />
        </div>
    </div>
</template>

<script setup>

    import { reactive } from 'vue';
    import FavoriteMastersCard from '@/widgets/cards/FavoriteMastersCard.vue';

    const masters = reactive([
        {
            avatar: 'https://png.klev.club/uploads/posts/2024-04/png-klev-club-pkxt-p-billi-kherrington-png-18.png',
            name: 'Билли Харингтон'
        },
        {
            avatar: 'https://avatars.mds.yandex.net/get-shedevrum/12154803/img_1afb1d9503ab11ef8f3246432d35d758/orig',
            name: 'Вен Даркхолмн'
        },
        {
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzNZhwosZlaHdJri1mX2_1buC-aVb-fVAkUQ&s',
            name: 'Рикардо мылос'
        },
        {
            avatar: 'https://u.kanobu.ru/editor/images/52/d9b4f706-1b19-4cd1-bad7-e733370a46dc.webp',
            name: 'Сайтама'
        },
        {
            avatar: 'https://cdn-images.dzcdn.net/images/cover/d22a58a63f39cb6679911f9e6667fb5f/0x1900-000000-80-0-0.jpg',
            name: 'Дио Брандо'
        },
    ])

</script>