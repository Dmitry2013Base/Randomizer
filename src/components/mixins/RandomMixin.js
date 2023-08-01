export default {
    methods: {
        idGenerator() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        },
        getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },
    }
}