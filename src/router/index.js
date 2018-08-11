import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [{
        path: '/',
        redirect: '/home'
    }, {
        path: '/home',
        name: 'home',
        component: () =>
            import ('@/pages/home'),
        meta: { title: 'home' }
    },
    {
        path: '/category',
        name: 'category',
        component: () =>
            import ('@/pages/category'),
        meta: { title: 'category' }
    }, {
        path: '/me',
        name: 'me',
        component: () =>
            import ('@/pages/me'),
        meta: { title: 'me', noSearch: true }
    }, {
        path: '/search',
        name: 'search',
        component: () =>
            import ('@/pages/search'),
        meta: { title: 'search', noSearch: true }
    },
    {
        path: '/list/:type',
        name: 'list',
        component: () =>
            import ('@/pages/list'),
        meta: { title: 'list' }
    },
    {
        path: '/detail/:id',
        name: 'detail',
        component: () =>
            import ('@/pages/detail'),
        meta: { title: 'detail', noSearch: true }
    },
]


const router = new Router({ routes });
export {
    router
};