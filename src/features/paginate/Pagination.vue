<template>
    <div class="paginate flex gap-[30px] !mt-[30px] items-center">
        <button
            class="paginate-button w-[40px] h-[40px]
                   flex justify-center items-center bg-[#18171E]
                   rounded-[10px] cursor-pointer hover:bg-[#31303a]
                   disabled:opacity-40"
            :disabled="page <= 1"
            @click="goPrev"
        >
            <ArrowBackIcon />
        </button>

        <div class="pagination__content flex gap-[10px] items-center">
            <PageButton
                :page="1"
                :active="page === 1"
                @click="go(1)"
            />

            <span v-if="page > 3" class="text-[#545560]">…</span>

            <PageButton
                v-for="p in middlePages"
                :key="p"
                :page="p"
                :active="p === page"
                @click="go(p)"
            />

            <span v-if="page < totalPages - 2" class="text-[#545560]">…</span>

            <PageButton
                v-if="totalPages > 1"
                :page="totalPages"
                :active="page === totalPages"
                @click="go(totalPages)"
            />
        </div>

        <button
            class="paginate-button w-[40px] h-[40px]
                   flex justify-center items-center bg-[#18171E]
                   rounded-[10px] cursor-pointer hover:bg-[#31303a]
                   disabled:opacity-40"
            :disabled="page >= totalPages"
            @click="goNext"
        >
            <ArrowNextIcon />
        </button>
    </div>
</template>

<script setup>

    import { computed } from 'vue';

    import ArrowBackIcon from '@/shared/icons/filters/ArrowBack.vue';
    import ArrowNextIcon from '@/shared/icons/filters/ArrowNext.vue';
    import PageButton from '@/shared/ui/PageButton.vue';

    const emit = defineEmits(['update:page']);

    const props = defineProps({
        page: {
            type: Number,
            required: true
        },

        totalPages: {
            type: Number,
            required: true
        }
    });

    const middlePages = computed(() => {
        const pages = [];

        for (let i = props.page - 1; i <= props.page + 1; i++) {
            if (i > 1 && i < props.totalPages) {
                pages.push(i);
            }
        }

        return pages;
    });

    const go = (p) => {
        if (p !== props.page) {
            emit('update:page', p);
        }
    };

    const goPrev = () => go(props.page - 1);
    const goNext = () => go(props.page + 1);
 

</script>
