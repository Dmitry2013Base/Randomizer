export default {
    data() {
        return {
            isModalShow: false,
        }
    },
    methods: {
        modalShow() {
            this.isModalShow = !this.isModalShow;
        },
    }
}