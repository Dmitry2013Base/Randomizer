<template>
    <section class="random__container">
        <h1>{{ header }}</h1>
        <p class="random-result">{{result}}</p>
        <MyButton @click="generate">Сгенерировать</MyButton>
    </section>
</template>

<script>
    export default {
        props: {
            header: {
                type: String,
                required: true
            },
            generate: {
                required: true
            },
            result: {
                type: String,
                required: true
            },
        },
    }
</script>
      
<style scoped>
    .random__container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: center;
        max-width: 320px;
        align-items: center;
        padding: 10px;
    }

    h1 {
        font-size: 30px;
    }

    .random-result {
        font-size: 40px;
        text-align: center;
    }

    @media(max-width: 450px) {
        .random-result {
            font-size: 25px;
        }

    }
</style>