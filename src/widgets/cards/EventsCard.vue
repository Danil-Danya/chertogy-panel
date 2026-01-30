<template>
    <div class="events__card" :class="{
        'draft': isDraft,
        'not-allowed': !isAllowed,
        'finished': isFinished,
        'canceled': isCanceled
    }">
        <div 
            :class="{
                'events__card-closed': isFinished,
                'events__card-canceled': isCanceled
            }" 
            v-if="isFinished || isCanceled"
        >
        </div>
        <div class="events__card-content">
            <div class="events__card-top">
                <div class="events__card-head">
                    <h2 class="title events__card-title">{{ title }}</h2>
                </div>
                <div class="events__card-marks">
                    <p class="text events__card-type">{{ eventType }}</p>
                    <span class="events__card-mark" v-if="authorMark">{{ authorMark }}</span>
                </div>
                <div class="events__card-params" v-if="isMobile">
                    <div class="events__card-date">
                        <span class="events__card-icon">
                            <CalendarIcon />
                        </span>
                        <h3 class="events__card-date-title">{{ date }}</h3>
                    </div>
                    <div class="events__card-subscribes">
                        <span>
                            <SubscribeIcon />
                        </span>
                        <p class="events__card-counter">{{ subscribers?.length }}/{{ maxSubscribes }}</p>
                    </div>
                </div>
            </div>
            <div class="events__card-center">
                <div class="events__card-right">
                    <img :src="`https://api.чертоги-героев.рф/images/${image}`" alt="Картинка" class="events__card-img">
                    <div class="events__card-marks-block">
                        <span class="events__card-price" 
                            :class="{
                                'not-allowed': !isAllowed && !isDraft
                            }"
                        >
                            <PriceIcon />
                            {{ price }} ₽
                            <span class="events__card-price-discount" v-if="originalPrice">
                                {{ originalPrice }} ₽
                            </span>
                        </span>
                        <span class="events__card-price" v-if="discount" 
                            :class="{
                                'not-allowed': !isAllowed && !isDraft
                            }"
                        >
                            - {{ discount }} %
                        </span>
                    </div>
                    <div class="events__card-marks-top">
                        <span class="events__card-allowed" v-if="!isAllowed && !isDraft"
                            :class="{
                                'not-allowed': !isAllowed
                            }"
                        >
                            <WaitingIcon />
                            Ждёт утверждения
                        </span>
                        <span class="events__card-allowed" v-if="isAllowed && subscribes === 0"
                            :class="{
                                'allowed': isAllowed
                            }"
                        >
                            <AllowedIcon />
                            Утверждено
                        </span>
                        <span class="events__card-draft" v-if="isDraft" 
                            :class="{
                                'draft': isDraft
                            }"
                        >
                            <DraftIcon />
                            Черновик
                        </span>
                    </div>
                </div>
                <div class="events__card-left">
                    <div class="events__card-tags-container">
                        <ul class="events__card-list">
                            <li class="event__card-li" v-for="tag in tagsList" :key="tag">
                                <button class="events__card-tag"
                                    :class="`events__card-${categoryClassMap[tag.category]}`"
                                >
                                    {{ tag.short_name }}
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div class="events__card-description">
                        <p class="events__card-text text">{{ description }}</p>
                    </div>
                </div>
            </div>
            <div class="events__card-bottom">
                <div class="events__card-date" v-if="!isMobile">
                    <span class="events__card-icon">
                        <CalendarIcon />
                    </span>
                    <h3 class="events__card-date-title">{{ date }}</h3>
                </div>
                <div class="events__card-bottom-content">
                    <div class="events__card-buttons">
                        <div class="events__buttons-user events__card-buttons" v-if="page === 'my_events'">
                            <a :href="`https://чертоги-героев.рф/events/${slug}`" class="events__card-link">Подробнее</a>
                            <button class="events__card-button !bg-red-500" @click="unSubscribe" v-if="!isFinished">
                                <span class="events__card-icon">
                                    <UnsubscribeIcon />
                                </span>
                                Отписаться
                            </button>
                            <button class="events__card-button finished" @click="subscribeAction" v-if="isFinished">
                                <span>Событие завершено</span>
                            </button>
                        </div>
                        <div class="events__buttons-master events__card-buttons" v-if="page === 'master_events'">
                            <a :href="`https://чертоги-героев.рф/events/${slug}`" class="events__card-link" v-if="!isDraft && !isFinished && !isCanceled">Подробнее</a>
                            <button class="events__card-button draft" @click="toUpdate" v-if="isDraft">
                                <span class="events__card-icon">
                                    <EditDraftIcon />
                                </span>
                                Редактировать черновик
                            </button>
                            <button class="events__card-button" @click="toUpdate" v-else-if="!isFinished && !isCanceled">
                                <span class="events__card-icon">
                                    <EditIcon />
                                </span>
                                Редактировать
                            </button>
                            <button class="events__card-button finished" @click="subscribeAction" v-if="isCanceled">
                                <span>Событие Отменено</span>
                            </button>
                            <button class="events__card-button finished" @click="subscribeAction" v-if="isFinished">
                                <span>Событие завершено</span>
                            </button>
                        </div>
                        <div class="events__buttons-master events__card-buttons" v-if="page === 'approval_events' && !isDraft">
                            <a :href="`https://чертоги-героев.рф/events/${slug}`" class="events__card-link">Подробнее</a>
                            <button class="events__card-button" @click="isApproveModalOpen = true">Утвердить событие</button>
                        </div>
                    </div>
                    <div class="events__card-subscribes" v-if="!isMobile">
                        <span>
                            <SubscribeIcon />
                        </span>
                        <p class="events__card-counter">{{ subscribes }}/{{ maxSubscribes }}</p>
                    </div>
                </div>
            </div>
        </div>
        <Transition name="modal">
            <ApproveModal
                v-if="isApproveModalOpen"
                @approve="approveThisEvent"
                @cancel="isApproveModalOpen = false"
            />
        </Transition>
    </div>
</template>

<script setup>

    import { computed, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useIsMobile } from '@/composables/useIsMobile';
    import { approveEvent, unSubscribeEvents } from '@/entities/event/lib/api';
    import { useUserStore } from '@/entities/users/model/store';
    import { useEventsStore } from '@/entities/event/models/store';

    import SubscribeIcon from '@/shared/icons/events/cards/Subscribes.vue';
    import PriceIcon from '@/shared/icons/events/cards/Price.vue';
    import CalendarIcon from '@/shared/icons/events/info/Calendar.vue';
    import ApproveModal from '@/features/modals/ApproveModal.vue';
    import WaitingIcon from '@/shared/icons/events/cards/Waiting.vue';
    import DraftIcon from '@/shared/icons/events/cards/Draft.vue';

    import EditDraftIcon from '@/shared/icons/events/cards/EditDraft.vue';
    import EditIcon from '@/shared/icons/events/cards/Edit.vue';
    import UnsubscribeIcon from '@/shared/icons/events/cards/Unsubscribe.vue';
    import AllowedIcon from '@/shared/icons/events/cards/Allowed.vue';

    const isMobile = useIsMobile();

    const route = useRoute();
    const router = useRouter();

    const isApproveModalOpen = ref(false);

    const userStore = useUserStore();
    const eventStore = useEventsStore();

    const profile = userStore.profile;

    const page = computed(() => {
        const map = {
            '/my-events': 'my_events',
            '/master-events': 'master_events',
            '/events/approval': 'approval_events',
        };

        return map[route.path];
    });

    const unSubscribe = async () => {
        const unSubscribedEvent = await unSubscribeEvents(profile.id, props.id);
        if (unSubscribedEvent) {
            await eventStore.fetchSubscribeEvents();
        }
    }
    
    
    const categoryClassMap = {
        "Длительность": "duration",
        "Сеттинг": "setting",
        "Система": "system",
        "Подготовка": "preparation",
        "Жанр": "genre",
        "Опыт игрока": "experience"
    };
    
    const approveThisEvent = async () => {
        const approvedEvent = await approveEvent(props.id);
        
        if (approvedEvent) {
            location.reload();
        }
    };
    
    
    const toUpdate = () => {
        router.replace({
            path: `/events/update/${props.id}`,
            query: {
                event: `${props.type.toLowerCase()}_session`
            }
        })
    }
    
    
    const props = defineProps({
        id: {
            type: String, 
            required: true
        },
        
        type: {
            type: String, 
            required: true
        },
        
        isDraft: {
            type: Boolean, 
            required: true
        },
        
        subscribers: {
            type: String, 
            required: true
        },
        
        slug: {
            type: String, 
            required: true
        },
        
        title: {
            type: String, 
            required: true
        },
        
        eventType: {
            type: String, 
            required: true
        },
        
        authorMark: {
            type: String, 
            required: true
        },
        
        image: {
            type: String, 
            required: true
        },
        
        price: {
            type: Number, 
            required: true
        },
        
        tagsList: {
            type: Array, 
            required: true
        },
        
        description: {
            type: String,
            required: true
        },
        
        date: {
            type: String,
            required: true
        },
        
        subscribes: {
            type: Number,
            required: true
        },
        
        maxSubscribes: {
            type: Number,
            required: true
        },
        
        subscribeStatus: {
            type: String,
            required: false
        },

        endTime: {
            type: String,
            required: false
        },

        isAllowed: {
            type: String,
            required: false
        },

        discount: {
            type: Number,
            required: false
        },

        originalPrice: {
            type: Number,
            required: false
        },

        isCanceled: {
            type: Boolean,
            required: true
        }
    })
    
    
    const isFinished = computed(() => {
        return new Date(props.endTime) < new Date()
    });
    
</script>

<style lang="scss">
    @import '@/assets/styles/widgets/events.scss';
</style>