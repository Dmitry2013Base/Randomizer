<template>
    <Transition name="bounce">
        <div class="modal__container" v-show="show" @click="close">
            <div class="my-modal-content" @click.stop>
                <slot></slot>
            </div>
        </div>
    </Transition>
</template>
    
<script>
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            close() {
                this.$emit('close');
            }
        }
    }
</script>
      
<style scoped>
    .modal__container {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 100;
    }

    .my-modal-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        opacity: 1;
    }

    
    .bounce-enter-active {
        animation: bounce-in 0.5s;
    }
    .bounce-leave-active {
        animation: bounce-in 0.5s reverse;
    }

    @keyframes bounce-in {
        0% {
            opacity: 0;
        }
        50% {
            transform: scale(1.25);
        }
        100% {
            opacity: 1;
        }
    }
</style>
      