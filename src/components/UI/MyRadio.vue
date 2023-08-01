<template>
    <div class="input__container" v-for="(item, index) in data" :key="item.header">
        <label :for="keys[index]" class="label">{{ item.header }}</label>
        <input :id="keys[index]" type="radio" :name="keys[1]" :value="index" v-model="select" :checked="item.checked" @input="isSelect">
    </div>
</template>
    
<script>
    import RandomMixin from '@/components/mixins/RandomMixin'
    
    export default {
        name: "MyRadio",
        data() {
            return {
                keys: [],
                select: -1
            }
        },
        props: {
            data: {
                type: Array,
                required: true
            },
            isSelect: {
                required: true
            }
        },
        mounted() {
            this.data.forEach((e) => {
                this.keys.push(this.idGenerator());
            });
            this.select = this.data.findIndex(e => e.checked);
        },
        mixins: [ RandomMixin ]
    }
</script>
      
<style scoped>
    .input__container {
        display: flex;
        flex-direction: row-reverse;
        justify-content: start;
        align-items: center;
        flex-wrap: nowrap;
        gap: 10px;
        padding: 0 5px;
    }
    .label {
        font-size: 20px;
        white-space: nowrap;
        padding: 3px 0;
    }
</style>
      