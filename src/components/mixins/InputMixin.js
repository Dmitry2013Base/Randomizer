import RandomMixin from '@/components/mixins/RandomMixin'


export default {
    data() {
        return {
            inputId: ""
        }
    },
    props: {
        title: {
            type: String,
            required: false
        },
        placeholder: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        },
        resetFlag: {
            type: Boolean,
            default: false
        },
        get: {
            type: Boolean,
            required: false
        },
        disabled: {
            type: Boolean,
            required: false
        }
    },
    mounted() {
        this.inputId = this.idGenerator();
    },
    mixins: [ RandomMixin ]
}
