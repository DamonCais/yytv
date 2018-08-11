import Vue from 'vue';
Vue.mixin({
    data() {
        return {
            onload: false
        };
    },
    methods: {
        _(value, path) {
            return (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path).reduce((o, k) => (o || {})[k], value) || undefined;
        },
        _img(value, path) {
            const url = (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path).reduce((o, k) => (o || {})[k], value);
            return url ? 'http://mp.jycais.cn/' + url : 'http://mp.jycais.cn/uploadDir/upload_611a565a13886cd7f52e01cb7356fbe4.jpg';
        },
        goBack() {
            this.$router.go(-1);
        },
        goHome() {
            this.$router.push({ path: '/' });
        },
        toDetail(id) {
            this.$router.push({ path: `/detail/${id}` })
        },
        toList(type) {
            this.$router.push({ path: `/list/${type}` })

        }
    },
    filters: {
        deepGet(value, path) {
            return (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path).reduce((o, k) => (o || {})[k], value) || undefined;
        },
        yuan(value) {
            return !isNaN(value) ? '¥' + (value / 100).toFixed(2) : value;
        }
    },
    computed: {},


});