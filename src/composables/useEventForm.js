import { reactive, computed, ref, onMounted } from 'vue';
import { useTagsStore } from '@/entities/tags/model/store';
import { createGameDraft, createGameEvent, updateGameEvent } from '@/entities/event/lib/api';
import { prepareEventFormData } from '@/utils/prepareEventFormData';
import { useUserStore } from '@/entities/users/model/store';
import { useRoute, useRouter } from 'vue-router';

export function useEventForm() {
    const tagsStore = useTagsStore();
    const userStore = useUserStore();

    const route = useRoute();
    const router = useRouter();

    const uploadedPreview = ref(null);

    const form = reactive({
        type: 'GAME',
        creatorId: null, 
        title: '',
        isAllowed: false,
        maxPlayers: null,
        fullDescription: '',
        shortDescription: '',
        place: null,
        price: null,
        discount: null,
        date: null,
        startTime: null,
        endTime: null,
        aboutCreator: '',
        registrationType: null,
        file: null,
        genre: [],
        skill: null,
        system: null,
        setting: null,
        duration: null,
        playerLevel: null,
        necessaryPlayerPreparation: null
    });

    const fillForm = (event) => {
        const start = event?.startTime ? new Date(event.startTime) : null;
        const end   = event?.endTime   ? new Date(event.endTime)   : null;

        form.title = event?.title;
        form.system = event?.game?.system;
        form.setting = event?.game?.setting;
        form.duration = event?.game?.duration;
        form.skill = event?.game?.skill;
        form.genre = event?.game?.genre;
        form.shortDescription = event?.shortDescription;
        form.fullDescription = event?.fullDescription;
        form.aboutCreator = event?.aboutCreator;
        form.place = event?.place;
        form.price = event?.price;
        form.discount = event?.discount;
        form.maxPlayers = event?.maxPlayers;
        form.registrationType = event?.registrationType;
        form.startTime = event?.startTime,
        form.endTime = event?.endTime;
        form.date = event?.startTime;

        if (event?.previewPath) {
            uploadedPreview.value = event.previewPath;
        }


        form.creatorId = event.creatorId;
    };


    const categories = computed(() => tagsStore.tagsCategories?.rows || []);

    const toOptions = (name) => {
        const row = categories.value.find((c) => c.name === name);
        return row ? row.tags.map(t => ({ label: t.fullName, value: t.shortName })) : [];
    };

    const systemOptions = computed(() => toOptions('Система'));
    const settingOptions = computed(() => toOptions('Сеттинг'));
    const durationOptions = computed(() => toOptions('Длительность'));
    const experienceOptions = computed(() => toOptions('Опыт игрока'));
    const genreOptions = computed(() => toOptions('Жанр'));

    const results = computed(() => {
        const price = Number(form.price);
        const discount = Number(form.discount);

        const finalPrice = price * (1 - discount / 100);

        return [
            { 
                title: 'Итоговая цена с участника', 
                text: `<span class="text-red-accent">${finalPrice.toFixed(0)} рублей</span>` 
            },
            { 
                title: 'Формат события', 
                text: `Запись<span class="${form.registrationType === 'OPEN' ? 'text-green-dark' : 'text-red-accent'}">
                    ${form.registrationType === 'OPEN' ? 'открытая' : 'закрытая'}
                </span>, ${form.maxPlayers || 0} чел.` 
            }
        ];
    });



    const createGame = async (isDraft) => {
        console.log(form)
        const formData = prepareEventFormData(form, uploadedPreview.value);
        const newGame = isDraft ? await createGameDraft(formData) : await createGameEvent(formData);

        if (newGame) {
            router.replace('/master-events')
        }
    };

    const updateGame = async (id, gameId) => {
        const formData = prepareEventFormData(form, uploadedPreview.value);
        const newGame = await updateGameEvent(id, gameId, formData);

        if (newGame) {
            router.replace('/master-events')
        }
    }

    onMounted(async () => {
        await tagsStore.fetchCategories({ include: true });
        await userStore.fetchProfile();

        form.creatorId = userStore.profile.id;
    });

    return {
        form,
        uploadedPreview,
        systemOptions,
        settingOptions,
        durationOptions,
        experienceOptions,
        genreOptions,
        results,
        fillForm,
        updateGame,
        createGame
    };
}
