<template>
    <main>
        <h1>{{ (cubesCount > 1) ? "Игральные кости" : "Игральная кость" }}</h1>
        <div class="cube__container">
            <Cube ref="cubes" v-for="item in cubesCount" :timeAnimation='timeAnimation' :key='item'/>
        </div>   
        <div class="cube__setting">
            <Number :description='"Кол-во кубиков"' :min='1' :max='30' :defaultValue='5' title="от 1 до 30" :get='true' @update='change'/>
            <MyButton @click="cast" :disabled='isDisabled'>Бросить</MyButton>
        </div>
    </main>
</template>
  
<script>
    import Cube from '@/components/Cube.vue'

    export default {
        data() {
            return {
                cubesCount: 1,
                lastCubesCount: 0,
                isDisabled: false,
                timeAnimation: 3,
            };
        },
        mounted() {
            this.disabledTimeout();
            this.lastCubesCount = this.cubesCount;
        },
        methods: {
            change(number) {
                this.cubesCount = number;
                if (this.lastCubesCount < number) {
                    this.disabledTimeout();
                }
            },
            cast() {
                this.$refs.cubes.forEach(e => e.cast());
                this.disabledTimeout();
            },
            disabledTimeout() {
                this.isDisabled = true;
                setTimeout(() => {
                    this.isDisabled = false;
                }, this.timeAnimation * 1000); 
            }
        },
        components: { Cube }
    }   
</script>

<style scoped>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 35px;
        padding: 25px;
    }

    .cube__container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 50px;
        flex-wrap: wrap;
        max-width: 500px;
    }

    .cube__setting {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
</style>
