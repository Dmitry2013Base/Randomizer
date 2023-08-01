<template>
    <Transition name="bounce">
        <div class="textarea__container">
            <textarea :placeholder="placeholder" v-model="text"></textarea>
        </div>
    </Transition>
</template>
    
<script>
    export default {
        name: 'MyTextarea',
        data() {
            return {
                text: ''
            }
        },
        mounted() {

        },
        props: {
            placeholder: {
                type: String,
                default: ''
            }
        }
    }
</script>
    
<style scoped>
    ::placeholder {
        text-align: center;
        font-size: 16px;
    }

    .textarea__container {
        width: 100%;
        padding: 5px;
    }

    textarea {
        resize: none;
        width: 100%;
        min-height: 150px;
        border: 2px solid teal;
        padding: 5px;
        font-size: 16px;
        color: teal;
    }

    .bounce-enter-active {
        animation: bounce-in 0.5s;
    }
    .bounce-leave-active {
        animation: bounce-in 0.5s reverse;
    }

    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.25);
        }
        100% {
            transform: scale(1);
        }
    }
</style>
      