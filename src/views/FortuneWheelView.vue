<template>
    <MyModal :show="isModalShow" @close="modalShow">
        <h2>Настройки</h2>
        <Number ref="time" description="Время прокрутки (c)" :defaultValue='5' :min='1'/>
        <div class="fortune__setting">
            <MyCheckbox description="Учитывать вес" :defaultValue='false' :get='true' @update="changeWeight"/>
            <MyCheckbox description="Использовать случайные цвета" :defaultValue='isColors' :get='true' @update="changeIsColors"/>
            <MyRadio :data="radioData" :isSelect="isSelect"/>
        </div>
        <MyButton @click="modalShow">Закрыть</MyButton>
    </MyModal>
    <div class="container">
        <div class="row">
            <div class="wheel">
                <h1>Колесо фортуны</h1>
                <div class="pie__container">
                    <div :class="pieClass">
                        <ul class="spinner" :style="{ background: spinerBackground }">
                            <li 
                                v-for="(item, index) in getDataFilter"
                                :key="item.id"
                                class="prize"
                                :style="{ rotate: item.textAngle, color: wheelTextColors[index] }">
                                <span class="text">{{ item.obj }}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="triangle"></div>
                    <div class="black-dot"></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="result" :style="{ color: resultTextColor}">{{ result }}</div>
        </div>
        <div class="row">
            <div class="fortune__buttons">
                <MyButton @click="spin" :disabled="isSpinDisabled">Крутить</MyButton>
                <MyButton @click="modalShow" :disabled="isSpinDisabled">Настройки</MyButton>
            </div>
        </div>
        <FortuneList 
                    :data="data"
                    @create="createDataItem"
                    @update="updateDataItem"
                    @remove="removeDataItem"
                    :colors="currentColors"
                    :textColors="textColors"
                    :changeColors="isColors"/>
    </div>
</template>
    
<script>
    import 'bootstrap/dist/css/bootstrap-grid.css'
    import MyModal from '@/components/MyModal.vue';
    import FortuneList from '@/components/FortuneList.vue';
    import RandomMixin from '@/components/mixins/RandomMixin.js';
    import ModalMixin from '@/components/mixins/ModalMixin.js';
    import localData from '@/data/index.js';

    export default {
        data() {
            return {
                isModalShow: false,
                isSpinDisabled: false,
                firstTime: true,
                result: "",
                resultColor: "transparent",
                resultTextColor: "transparent",
                spinerBackground: "",
                pieClass: [ 'pie' ],
                current: 0,
                start: 0,
                finish: 0,
                data: [],
                dataFilter: [],
                colors: [ '#fa8072', '#98fb98', '#f5deb3', '#dda0dd', '#4169e1', '#9457eb' ],
                currentColors: [],
                textColors: [],
                wheelTextColors: [],
                select: 0,
                radioData: [
                    {
                        header: "Обычное",
                        checked: true
                    },
                    {
                        header: "Выбывание",
                        checked: false
                    },
                ],
                isWeight: false,
                isColors: false
            }
        },
        mounted() {
            var data = sessionStorage.getItem('data');
            this.data = (data === null) ? localData : JSON.parse(data);
            this.data.map((item, index) => this.createDataItem(item, index));
            this.dataFilter = this.data.filter(e => e.isActive);
            this.spin();
            this.firstTime = false;
        },
        methods: {
            spin() {
                this.isSpinDisabled = true;
                var array = this.dataFilter;
                var index = Math.floor(Math.random() * array.length);

                var angle = 3.6 * (100 / array.length * index);
                var angle2 = 3.6 * (angle / 3.6 + 100 / array.length) - (360 * 10);
                var nextAngle = Math.floor(Math.random() * (angle2 - angle + 1)) + angle;

                this.pieClass.length = 0;
                this.pieClass.push('pie');
                this.pieClass.push("pie-rotate");
                setTimeout(() => {
                    this.current = this.finish;
                    this.start = this.current;
                    this.finish = nextAngle;

                    this.pieClass.length = 0;
                    this.pieClass.push('pie-next');

                    var index = this.getItemByAngle(this.current);
                    this.result = (typeof index !== 'undefined') ? `${this.dataFilter[index].obj}` : "";

                    this.resultColor = this.dataFilter.filter(e => e.isActive).map(e => e.color)[index];
                    this.resultTextColor = (typeof(this.resultColor) !== 'undefined') && `#${(Number(`0x1${this.resultColor.substring(1)}`) ^ 0xFFFFFF).toString(16).substring(1).toUpperCase()}`;
                    this.start += (360 * 10);
                    (this.select === 1) && setTimeout(() => this.removeDataItem(this.dataFilter[index].id), 500);         
                    this.isSpinDisabled = false;   
                }, Number((this.firstTime) ? 0 : this.$refs.time.value) * 1000)
            },
            getItemByAngle(angle){
                var array = this.getData();
                var sum = array.map(e => e.weight).reduce((a, b) => a + b, 0);
                var weights = array.map((s => a => s += a.weight)(0));
                var angleFind = ((angle < 0) ? 360 : 0) + angle % 360;
                var angles = weights.map(item => 360 - (3.6 * item / sum * 100));
                angles.unshift(360);

                for (let i = 1; i < angles.length; i++) {
                    
                    if (angleFind <= angles[i - 1] && angleFind > angles[i]) {    
                        return i - 1
                    } 
                }
            },
            getSpinnerColors() {
                var array = this.getData();
                var sum = array.map(e => e.weight).reduce((a, b) => a + b, 0);
                var weights = array.map((s => a => s += a.weight)(0)).reverse();
                var colors = array.map(e => e.color).reverse();
                this.wheelTextColors = colors.map(e => this.getOppositeColor(e)).reverse();
                return `conic-gradient(from -90deg, ${array.map((item, i) => `${colors[i]} 0 ${weights[i] / sum * 100}%`).reverse()})`;
            },
            getOppositeColor(color) {
                return `#${(Number(`0x1${color.substring(1)}`) ^ 0xFFFFFF).toString(16).substring(1).toUpperCase()}`;
            },
            getTextAngle(index) {
                var array = this.getData();
                var sum = array.map(e => e.weight).reduce((a, b) => a + b, 0);
                var weights = array.map((s => a => s += a.weight)(0));
                return (3.6 * (weights[index] / sum * 100) - ((3.6 * (weights[index] / sum * 100) - (3.6 * ((index === 0) ? 0 : weights[index - 1] / sum * 100))) / 2)) + 'deg';
            },
            createDataItem(nextObject, index = -1) {
                nextObject.id = this.idGenerator();
                nextObject.isActive = nextObject.isActive;
                nextObject.color = (this.isColors) ? nextObject.color : this.colors[(index === -1) ? this.data.length % this.colors.length : index % this.colors.length];
                this.textColors.push(this.getOppositeColor(nextObject.color));
                this.currentColors.push(nextObject.color);
                index = (index !== -1) ? index : this.data.length;
                this.data[index] = nextObject;
                this.dataFilter[index] = nextObject;
                this.updateData();
            },
            updateDataItem(id) {
                var item = this.data.find(e => e.id === id);
                item.isActive = !item.isActive;
                this.dataFilter = this.data.filter(e => e.isActive);
                this.updateData();
            },
            removeDataItem(id) {
                var item = this.data.find(e => e.id === id);
                var index = this.data.indexOf(item);
                this.currentColors.splice(index, 1);
                this.textColors.splice(index, 1);
                this.dataFilter = this.dataFilter.filter(e => e.id !== id);
                this.data = this.data.filter(e => e.id !== id);
                this.updateData();
            },
            isSelect(e) {
                this.select = Number(e.target.value);
            },
            changeWeight(next) {
                this.isWeight = next;
            },
            changeIsColors(next) {
                this.isColors = next;
            },
            getData() {
                var array = [];
                (!this.dataFilter.every(e => e.weight) || !this.isWeight) ? this.dataFilter.forEach(i => array.push({...i, weight: 1 })) : this.dataFilter.forEach(i => array.push(i));
                return array;
            },
            updateData() {
                sessionStorage.setItem('data', JSON.stringify(this.data));
            }
        },
        components: { FortuneList, MyModal },
        computed: {
            getDataFilter() {
                var array = this.getData();
                this.spinerBackground = this.getSpinnerColors();
                array.map((item, index) => item.textAngle = this.getTextAngle(index))
                return array;
            }
        },
        watch: {
            isColors(newValue) {
                this.currentColors = this.data.map((e, index) => e.color = (!newValue) ? this.colors[index % this.colors.length] : this.getRandomColor());
                this.textColors = this.currentColors.map(e => this.getOppositeColor(e));
                this.spinerBackground = this.getSpinnerColors();
            }
        },
        mixins: [ RandomMixin, ModalMixin ]
    }
</script>
      
<style scoped>
    .row {
        margin-bottom: 15px;
    }

    h1 {
        text-align: center;
        padding: 15px 0;
    }

    .pie__container {
        --size: 500px;
        width: var(--size);
        height: var(--size);
        display: inline-block;
        position: relative;
    }

    .pie-rotate {
        animation: rotate v-bind('$refs.time.value + "s"') ease-in-out forwards;
    }

    @keyframes rotate {
    0% {
            transform: rotate(v-bind(start + 'deg'));
        }
        100% {
            transform: rotate(v-bind(finish + 'deg'));
        }
    }

    .pie,
    .pie-next {
        height: 100%;
        position: relative;
        font-size: calc(var(--size) / 21);
    }

    .pie > * {
        grid-area: spinner;
    }

    .pie-next {
        rotate: v-bind(current + "deg");
    }

    .wheel {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 10px;
    }

    .result {
        font-size: 25px;
        background-color: v-bind(resultColor);
        text-align: center;
        padding: 10px;
        border-radius: 25px;
        transition: background-color 0.2s linear;
        z-index: 10;
    }

    .fortune__buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
        z-index: 10;
    }

    .fortune__setting {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
    }

    .triangle {
        display: inline-block;
        position: absolute;
        top: calc(50% - 15px);
        left: -15px;
        rotate: -90deg;
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
        border-top: 30px solid red;
        z-index: 2;
    }

    .black-dot {
        width: 14px;
        height: 14px;
        background-color: black;
        border-radius: 50%;
        position: absolute;
        top: calc(50% - 7px);
        left: calc(50% - 7px);
    }

    ul {
        padding: 0;
        margin: 0;
    }

    .spinner {
        position: relative;
        display: grid;
        align-items: center;
        grid-template-areas: "spinner";
        width: 100%;
        height: 100%;
        border: 1px solid black;
        border-radius: 50%;
        overflow: hidden;
    }

    .spinner * {
        grid-area: spinner;
    }

    .prize {
        display: flex;
        align-items: center;
        padding: 0 calc(var(--size) / 6) 0 calc(var(--size) / 20);
        width: 50%;
        height: 50%;
        transform-origin: center right;
        user-select: none;
    }

    @media (max-width: 576px) {    
        .pie__container {
            --size: 300px;
        }

        .triangle {
            top: calc(50% - 8px);
            left: -8px;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 16px solid red;
        }

    .black-dot {
            width: 10px;
            height: 10px;
            top: calc(50% - 5px);
            left: calc(50% - 5px);
        }
    }
</style>
      