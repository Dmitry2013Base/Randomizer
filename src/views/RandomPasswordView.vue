<template>
    <main class="random__form">
        <RandomView header="Пароль:" :generate="generate" :result="result"/>

        <div class="section__setting">
            <MyRange ref="count" v-model="count" header="Длина пароля:" min="8" max="20"/>
            <MyCheckbox ref="checkNumbers" description="использовать цифры"/>
            <MyCheckbox ref="checkSymbols" description="использовать спец. символы"/>
        </div>
    </main>
</template>
  
<script>
    import RandomView from '@/components/RandomView.vue';

    export default {
        data() {
            return {
                count: 8,
                result: ""
            };
        },
        mounted() {
            this.generate();
        },
        methods: {
            generate() {
                var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

                if (this.$refs.checkNumbers.value) {
                    charset += "0123456789";
                }

                if (this.$refs.checkSymbols.value) {
                    charset += "~!@-#$";
                }

                this.result = "";

                for (var i = 0; i < this.count; ++i) {

                    this.result += charset.charAt(Math.floor(Math.random() * charset.length));
                }
            }
        },
        components: { RandomView }
    }   
</script>

<style scoped>
    .random__form {
        display: flex;
        gap: 15px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .section__setting {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
  