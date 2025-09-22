<template>
    <section 
        class="login md:min-h-[100vh] !mb-[60px]"
        :class="`login-${page}`"
    >
        <div class="container">
            <RouterView class="!mt-[150px] !mb-[60px]" />
        </div>
    </section>
</template>

<script setup>

    import { computed } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();

    const page = computed(() => route.name);

</script>