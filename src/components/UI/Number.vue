<template>
    <div class="input-container" :title='title'>
        <label v-if="description" :for="inputId" class="label">{{ description }}</label>
        <input :id="inputId" class="input" v-model="value" type="number" :placeholder='placeholder' :disabled='disabled'>
    </div>
</template>
    
<script>
    import InputMixin from '@/components/mixins/InputMixin'

    export default {
        name: "Number",
        data() {
            return {
                value: 0,
                changeValueFlag: false,
            }
        },
        props: {
            defaultValue: {
                type: Number,
                required: false
            },
            min: {
                type: Number,
                required: false
            },
            max: {
                type: Number,
                required: false
            },
        },
        mounted() {
            this.reset();
        },
        methods: {
            reset() {
                this.value = (this.defaultValue) ? this.defaultValue : this.min;
            }
        },
        watch: {
            resetFlag() {
                this.reset();
            },
            value(next) {
                if (this.changeValueFlag) {
                    this.changeValueFlag = false;
                    return;
                }
                if (next < this.min) {
                    this.value = this.min;
                    this.changeValueFlag = true;
                }
                if (next > this.max) {
                    this.value = this.max;
                    this.changeValueFlag = true;
                }
                if (this.get) {
                    this.$emit('update', this.value);
                }
            }
        },
        mixins: [ InputMixin ]
        
    }
</script>
      
<style scoped>
    .input-container {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        gap: 10px;
        padding: 5px;
    }

    .label {
        font-size: 20px;
        white-space: nowrap;
        padding: 3px 0;
    }

    .input {
        width: 100%;
        border: 2px solid teal;
        color: teal;
        font-size: 16px;
        padding: 3px;
    }

    .input:disabled {
        border: 2px solid lightgray;
        color: lightgray;
        pointer-events: none;
    }
</style>
      