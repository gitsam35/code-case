import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from './views/Main.vue'

import House from './views/House.vue'
import Car from './views/Car.vue'
import Announcement from './views/Announcement.vue'
import Repairment from './views/Repairment.vue'
import Repairer from './views/Repairer.vue'
import AdminUser from './views/AdminUser.vue'
import Login from './views/Login.vue'
import Shuffling from './views/Shuffling.vue'
import User from './views/User.vue'

Vue.use(VueRouter)


const router = new VueRouter({
        routes: [{
                path: '/login',
                component: Login,
                meta: {
                    isPublic: true
                }
            },
            {
                path: '/',
                redirect: '/shuffling'
            },
            {
                path: '/',
                name: 'Main',
                component: Main,
                children: [{
                        path: '/house',
                        component: House
                    },
                    {
                        path: '/car',
                        component: Car
                    },
                    {
                        path: '/announcement',
                        component: Announcement
                    },
                    {
                        path: '/repairment',
                        component: Repairment
                    },
                    {
                        path: '/repairer',
                        component: Repairer
                    },
                    {
                        path: '/adminUser',
                        component: AdminUser
                    },
                    {
                        path: '/login',
                        component: Login
                    },
                    {
                        path: '/shuffling',
                        component: Shuffling
                    },
                    {
                        path: '/user',
                        component: User
                    },
                ]
            },


        ]
    })
    // 全局前置守卫
router.beforeEach((to, from, next) => {
    if (!to.meta.isPublic && !sessionStorage.token) {
        return next('/login')
    }
    next()
})
export default router