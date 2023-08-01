<template>
    <div class="input-container">
        <label v-if="description" :for="inputId" class="label">{{ description }}</label>
        <input :id="inputId" v-model="value" type="checkbox">
    </div>
</template>
    
<script>
    import RandomMixin from '@/components/mixins/RandomMixin'

    export default {
        name: "MyCheckbox",
        data() {
            return {
                value: false,
                inputId: ""
            }
        },
        props: {
            description: {
                type: String,
                required: true
            },
            defaultValue: {
                type: Boolean,
                default: false
            },
            get: {
                type: Boolean,
                required: false
            },
        },
        mounted() {
            this.inputId = this.idGenerator();
            this.value = this.defaultValue;
        },
        methods: {

        },
        watch: {
            value(next) {
                if (this.get) {
                    this.$emit('update', next);
                }
            }
        },
        mixins: [ RandomMixin ]
        
    }
</script>
      
<style scoped>
    .input-container {
        display: flex;
        flex-direction: row-reverse;
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
</style>
      