<template>
    <div class="range__container">
        <input ref="input" type="range" v-model="range" v-bind="$attrs">
        <label class="range-title">{{header}} {{ range }}</label>
    </div>
</template>
    
<script>
    export default {
        name: 'MyRange',
        data() {
            return {
                range: "1"
            }
        },
        mounted(){
            this.range = this.$refs.input.min;
        },
        props: {
            header: {
                type: String,
                required: true
            }
        }
    }

</script>
    
<style scoped>
    .range__container {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        gap: 5px;
        padding: 5px;
    }

    .range-title {
        font-size: 20px;
    }
</style>
      