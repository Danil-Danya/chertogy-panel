import { reactive, computed, ref, onMounted } from 'vue';
import { useUserStore } from '@/entities/users/model/store';
import { createMeetingEvent, updateMeetingEvent } from '@/entities/event/lib/api'; 
import { prepareEventFormData } from '@/utils/prepareEventFormData';
import { useRouter } from 'vue-router';

export function useMeetingForm() {
    const userStore = useUserStore();

    const uploadedPreview = ref(null);

    const router = useRouter();

    const form = reactive({
        type: 'MEETING',
        creatorId: null,

        shortDescription: '',
        fullDescription: '',
        aboutCreator: '',

        date: null,
        startTime: null,
        endTime: null,

        place: null,
        price: null,
        discount: null,
        maxPlayers: null,

        registrationType: null,
        file: null
    });

    const fillForm = (event) => {
        form.title = event?.title;
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

    const createMeeting = async () => {
        const formData = prepareEventFormData(form, uploadedPreview.value);
        const created = await createMeetingEvent(formData);

        if (created) {
            router.replace('/master-events')
        }
    };

    const updateMeeting = async (id) => {
        
        const formData = prepareEventFormData(form, uploadedPreview.value);
        const newMeeting = await updateMeetingEvent(id, formData);

        if (newMeeting) {
            router.replace('/master-events')
        }
    }

    onMounted(async () => {
        await userStore.fetchProfile();
        form.creatorId = userStore.profile.id;
    });

    return {
        form,
        uploadedPreview,
        results,
        fillForm,
        updateMeeting,
        createMeeting
    };
}
