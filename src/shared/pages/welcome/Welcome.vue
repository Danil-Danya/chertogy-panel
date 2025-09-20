<template>
    <div class="welcome md:h-[100vh] h-[calc(100vh-300px)]">
        <div class="welcome__container flex flex-col justify-center items-center">
            <h1 class="title welcome__title !mt-[150px]">Добро пожаловать в чертоги, Герой!</h1>
            <p class="welcome__text text !mt-[10px] !text-purple-mid text-center">Регистрация прошла успешно. Автоматическая переадресаци через {{ secondsLeft }}</p>
            <Button color="purple" text="К приключениям!" type="link" link="/profile" class="md:!w-[300px] !mt-[40px]" />
        </div>
    </div>
</template>

<script setup>

    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';

    import Button from '@/shared/ui/Button.vue';

    const router = useRouter();
    const secondsLeft = ref(15);

    const timeCounter = () => {
        secondsLeft.value -= 1;
        
        if (secondsLeft.value) {
            setTimeout(() => timeCounter(), 1000);
        }
        else {
            router.replace('/profile')
        }
    }

    onMounted(() => {
        setTimeout(() => timeCounter(), 1000);
    })

</script>