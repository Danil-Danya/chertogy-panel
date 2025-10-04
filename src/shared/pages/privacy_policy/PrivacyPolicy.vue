<template>
    <div class="privacy">
        <div class="privacy__container">
            <h1 class="title !text-left">Пользовательское соглашение</h1>
            <p class="text !mt-[10px]">Оферта о заключении договора на использование сайта и сервисов</p>
        </div>
        <div class="privacy__content !m-[50px_0]">
            <div class="privacy__item !mb-[30px]" v-for="item in privacyPolicy" :key="item">
                <h3 class="title !text-left !text-[32px]">{{ item.number }}. {{ item.title }}</h3>
                <ul class="list !mt-[10px]">
                    <li v-for="(value, index) in item.list" :key="value">
                        <p class="text">{{ item.number }}.{{index + 1}} {{ value.text }}</p>
                        <ul>
                            <li class="mask-linear-to-stone-50 !list-outside" v-for="li in value.sublist" :key="li">
                                <p class="text">* {{ li.text }}</p>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div class="privacy__container">
            <h2 class="title !text-left">Политика обработки персональных данных ООО «Чертоги Героев»</h2>
        </div>
        <div class="privacy__content !m-[50px_0]">
            <div class="privacy__item !mb-[30px]" v-for="item in personalData" :key="item">
                <h3 class="title !text-left !text-[32px]">{{ item.number }}. {{ item.title }}</h3>
                <ul class="list !mt-[10px]">
                    <li v-for="(value, index) in item.list" :key="value">
                        <p class="text">{{ item.number }}.{{index + 1}} {{ value.text }}</p>
                        <ul>
                            <li class="mask-linear-to-stone-50 !list-outside" v-for="li in value.sublist" :key="li">
                                <p class="text">* {{ li.text }}</p>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>

    import { ref } from 'vue';
    import { privacyPolicyHelper, personalDataHelper } from '@/utils/privacyPolicyHelper';

    const privacyPolicy = ref(privacyPolicyHelper);
    const personalData = ref(personalDataHelper);

</script>