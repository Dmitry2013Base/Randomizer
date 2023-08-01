<template>
    <main class="random__form">
        <RandomView header="Случайное число:" :generate="generate" :result="result"/>
        <section class="section__setting">
            <MyRange v-model="count" header="Количество элементов:" min="1" max="50"/>
            <MyRadio :data="radioData" :isSelect="isSelect"/>

            <div class="random__setting" v-if="select === 0">
                <Number ref="start" description="от" :defaultValue='1'/>
                <Number ref="finish" description="до" :defaultValue='1000'/>
            </div>

            <MyTextarea ref="listNumbers" placeholder="Укажите список целых чисел" v-else-if="select === 1"/>

            <MyCheckbox description="Исключить числа" :get='true' @update='change'/>
            <MyTextarea ref="listExclude" placeholder="Укажите список целых чисел" v-show="isExcludeNumbers"/>
        </section>
    </main>
</template>
  
<script>
    import RandomView from '@/components/RandomView.vue';

    export default {
        data() {
            return {
                count: 1,
                radioData: [
                    {
                        header: "Из диапозона",
                        checked: true
                    },
                    {
                        header: "Из списка",
                        checked: false
                    },
                ],
                select: 0,
                isExcludeNumbers: false,
                result: "",
            };
        },
        mounted() {
            this.generate();
        },
        methods: {
            generate() {
                var exclude = this.getExcludeNumbers();   
                const result = [];

                if (this.select === 0) {

                    var maximum = Number(this.$refs.finish.value)
                    var minimum = Number(this.$refs.start.value)

                    for (let i = 0; i < this.count; i++) {
                        
                        let num = Math.floor(Math.random() * (maximum - minimum + 1 - exclude.length) + minimum);
                        exclude
                            .slice()
                            .sort((a, b) => a - b)
                            .every((exeption) => exeption <= num && (num++, true));
                        result.push(num);
                    }

                } else if (this.select === 1) {

                    var array = this.getNumbers().filter(e => !exclude.includes(e));
                    var maximum = array.length - 1;
                    var minimum = 0;

                    for (let i = 0; i < this.count; i++) {
                        
                        let index = Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
                        result.push(array[index]);
                    }
                }

                this.result = result.join(", ");
            },
            isSelect(e) {
                this.select = Number(e.target.value);
            },
            change(checked) {
                this.isExcludeNumbers = checked;
            },
            getExcludeNumbers() {
                return (this.isExcludeNumbers) ? this.$refs.listExclude.text.split(/,?\s/).filter(e => e !== '').map(Number) : [];
            },
            getNumbers() {
                return this.$refs.listNumbers.text.split(/,?\s/).map(Number);
            },
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

    .random__setting {
        display: flex;
        flex-direction: column;
        width: 100%;
    } 
</style>
  