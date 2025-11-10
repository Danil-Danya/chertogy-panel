<template>
    <div class="switcher">
        <button class="button-left text-white !p-[12px_16px] duration-300 cursor-pointer"
            @click="toggleQuery('leftButton')"
            :style="{
                background: activeValue === leftButton.query ? '#422748' : '#18171E',
                color: activeValue === leftButton.query ? '#FFFFFF' : '#D5B0E4',
            }"
        >
            {{ leftButton.text }}
        </button>
        <button class="button-right text-white !p-[12px_16px] duration-300 cursor-pointer"
        @click="toggleQuery('rightButton')"
            :style="{
                background: activeValue === rightButton.query ? '#422748' : '#18171E',
                color: activeValue === rightButton.query ? '#FFFFFF' : '#D5B0E4',
            }"
        >
            {{ rightButton.text }}
        </button>
    </div>
</template>

<script setup>

    import { onMounted, watch, ref } from 'vue';
    import { useRouter, useRoute } from 'vue-router';

    const router = useRouter();
    const route = useRoute();

    const props = defineProps({
        leftButton: {
            type: Object,
            required: true,
        },

        rightButton: {
            type: Object,
            required: true,
        },

        param: {
            type: String,
            required: true
        }
    })

    const activeValue = ref(route.query[props.param]);

    const toggleQuery = (button) => {
        const newValue = props[button].query;
        activeValue.value = newValue;

        router.replace({
            query: {
                ...route.query,
                [props.param]: newValue
            }
        })
    }

    watch(
        () => route.query[props.param],
        (value) => (activeValue.value = value)
    )

    onMounted(() => {
        if (!route.query[props.param]) {
            router.replace({
                query: {
                    [props.param]: props.rightButton.query
                }
            })
        }
    })

</script>