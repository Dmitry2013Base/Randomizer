<template>
    <div class="input-container" :title='title'>
        <label v-if="description" :for="inputId" class="label">{{ description }}</label>
        <input :id="inputId" class="input" v-model="value" type="text" :placeholder='placeholder' :disabled='disabled'>
    </div>
</template>
    
<script>
    import InputMixin from '@/components/mixins/InputMixin'

    export default {
        name: "Text",
        data() {
            return {
                value: "",
            }
        },
        props: {
            defaultValue: {
                type: String,
                required: false,
                default: ''
            },
        },
        mounted() {
            this.reset();
        },
        methods: {
            reset() {
                this.value = this.defaultValue;
            }
        },
        watch: {
            resetFlag() {
                this.reset();
            },
            value(next) {
                if (this.get) {
                    this.$emit('update', next);
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
      