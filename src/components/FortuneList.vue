<template>
    <div class="row">
        <div class="list__container">
            <div class="list-header">
                <h2>Список элементов</h2>
                <ImageButton @click="modalShow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                    </svg>
                </ImageButton>
            </div>
            <MyModal :show="isModalShow" @close="modalShow">
                <h3>Создание</h3>
                <div class="create__container">
                    <div class="color-container" v-show="changeColors">
                        <label for="color">Цвет:</label>
                        <input ref="color" id="color" v-model="colorModel" type="color">
                    </div>
                    <Text ref="value" description="Секция:" defaultValue="" :resetFlag='resetFlag' :get='true' @update='changeSectionName'/>
                    <Number ref="weight" description="Вес:" :min='1' :defaultValue='1' :resetFlag='resetFlag'/>
                </div>
                <div class="modal__buttons">
                    <MyButton @click="create" :disabled='valueModel === ""'>Добавить</MyButton>
                    <MyButton @click="modalShow">Закрыть</MyButton>
                </div>
            </MyModal>
            <TransitionGroup name="list-item" tag="ul">
                <li v-for="(item, index) in data"
                    :key="item.id"
                    :style="{ backgroundColor: (item.isActive) ? colors[index] : 'rgba(0,0,0,0.1)', color: (item.isActive) ? textColors[index] : 'gray' }">
                    <span>{{ item.obj }}</span>
                    <div class="li-buttons">
                        <ImageButton v-show="!item.isActive" @click="update(item)" title="Показать" color="gray">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                            </svg>
                        </ImageButton>
                        <ImageButton v-show="item.isActive" @click="$emit('update', item.id)" title="Скрыть" :color='textColors[index]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                                <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                            </svg>
                        </ImageButton>
                        <ImageButton @click="$emit('remove', item.id)" title="Удалить" :color='(item.isActive) ? textColors[index] : "gray"'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                            </svg>
                        </ImageButton>
                    </div>
                </li>
            </TransitionGroup>
        </div>
    </div>
</template>
    
<script>
    import MyModal from '@/components/MyModal.vue';
    import RandomMixin from '@/components/mixins/RandomMixin.js';
    import ModalMixin from '@/components/mixins/ModalMixin.js';

    export default {
        data() {
            return {
                colorModel: '',
                valueModel: '',
                resetFlag: false,
            }
        },
        props: {
            data: {
                type: Array,
                required: true
            },
            colors: {
                type: Array,
                required: true
            },
            textColors: {
                type: Array,
                required: true
            },
            changeColors: {
                type: Boolean,
                required: true
            }
        },
        mounted() {
            this.colorModel = this.getRandomColor();
        },
        methods: {
            create() {
                this.valueModel = "";
                this.resetFlag = !this.resetFlag;
                this.colorModel = this.getRandomColor();
                this.$emit('create', { obj: this.$refs.value.value, weight: this.$refs.weight.value, color: this.$refs.color.value, isActive: true });
            },
            update(item) {
                this.$emit('update', item.id);
            },
            changeSectionName(next) {
                this.valueModel = next;
            }
        },
        components: { MyModal },
        mixins: [ RandomMixin, ModalMixin ]
    }
</script>
      
<style scoped>
    .list-header {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    ul {
        padding: 0;
        list-style: none;
        overflow-x: hidden;
    }

    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 20px;
        padding: 10px;
        background-color: rgb(235, 213, 152);
        margin-bottom: 10px;
        border-radius: 20px;
    }

    .list__container {
        overflow: auto;
    }

    .create__container {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .li-buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }

    .modal__buttons {
        display: flex;
        gap: 10px;
    }

    .color-container {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        gap: 10px;
        padding: 5px;
    }

    .color-container label {
        font-size: 20px;
        white-space: nowrap;
        padding: 3px 0;
    }

    input[type=color] {
        appearance: none;
        background-color: transparent;
        border: none;
        cursor: pointer;
        width: 35px;
        height: 35px;
        padding: 3px;
    }

    input[type=color]::-webkit-color-swatch {
        border-radius: 50%;
        border: none;
    }

    .list-item-enter-active,
    .list-item-leave-active {
        transition: all 0.5s ease;
    }
    .list-item-enter-from,
    .list-item-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }
</style>
      