import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import Index from '@/views/index.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Index',
        component: Index
    },
    {
        path: '/home/',
        name: 'Home',
        component: () => import('@/views/HomeView.vue'),
    },
    {
        path: '/account/',
        name: 'Account',
        component: () => import('@/views/myAccount/Index.vue'),
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router