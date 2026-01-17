<template>
    <div
        class="modal fixed inset-0 z-[999999] flex items-center justify-center"
        @click.self="onCancel"
        style="
            background: #0000005b;
            backdrop-filter: blur(3px);
        "
    >
        <div class="modal__window w-[90%] md:w-[50%] bg-dark rounded-[8px] !p-[30px]">
            <h3 class="modal__title title !text-left !text-[32px]">
                Утвердить событие
            </h3>

            <p class="modal__text text my-[20px]">
                Вы уверены, что хотите утвердить данное событие?
            </p>

            <div class="modal__actions flex gap-[20px] justify-end">
                <Button
                    color="blue"
                    class="!w-[140px]"
                    text="Отмена"
                    @click="onCancel"
                />
                <Button
                    color="green"
                    class="!w-[140px]"
                    text="Утвердить"
                    @click="onApprove"
                />
            </div>
        </div>
    </div>
</template>

<script setup>

    import Button from '@/shared/ui/Button.vue';

    const emit = defineEmits(['approve', 'cancel']);

    const onApprove = () => {
        emit('approve');
    };

    const onCancel = () => {
        emit('cancel');
    };

</script>
