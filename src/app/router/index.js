import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/profile',
        },
        {
            path: '/registration',
            name: 'registration',
            component: () => import('@/pages/Registration.vue'),
            meta: {
                layout: 'login'
            }
        },
        {
            path: '/login',
            name: 'login',component: () => import('@/pages/Login.vue'),
            meta: {
                layout: 'login'
            }
        },
        {
            path: '/welcome',
            name: 'welcome',
            component: () => import('@/pages/Welcome.vue'),
            meta: {
                layout: 'login'
            }
        },
        {
            path: '/reset/password',
            name: 'reset-password',
            component: () => import('@/pages/ResetPassword.vue'),
            meta: {
                layout: 'login'
            }
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('@/pages/Profile.vue'),
            meta: {
                layout: 'profile',
                title: 'Профиль'
            }
        },
        {
            path: '/settings',
            name: 'settings',
            component: () => import('@/pages/Settings.vue'),
            meta: {
                layout: 'profile'
            }
        },
        {
            path: '/my-events',
            name: 'my-events', 
            component: () => import('@/pages/MyEvents.vue'),
            meta: {
                layout: 'profile'
            }
        },
        {
            path: '/email',
            name: 'email', 
            component: () => import('@/pages/Email.vue'),
            meta: {
                layout: 'login'
            }
        },
        {
            path: '/notifications',
            name: 'notifications', 
            component: () => import('@/pages/Notification.vue'),
            meta: {
                layout: 'profile',
                title: 'Уведомления'
            }
        },
        {
            path: '/favorites-masters',
            name: 'masters', 
            component: () => import('@/pages/FavoriteMasters.vue'),
            meta: {
                layout: 'profile',
                title: 'Избранные мастера'
            }
        },
        // {
        //     path: '',
        //     name: '', 
        //     component: () => import('@/pages/'),
        //     meta: {
        //         layout: ''
        //     }
        // },
        // {
        //     path: '',
        //     name: '', 
        //     component: () => import('@/pages/'),
        //     meta: {
        //         layout: ''
        //     }
        // },
        // {
        //     path: '',
        //     name: '', 
        //     component: () => import('@/pages/'),
        //     meta: {
        //         layout: ''
        //     }
        // },
        // {
        //     path: '',
        //     name: '', 
        //     component: () => import('@/pages/'),
        //     meta: {
        //         layout: ''
        //     }
        // },
        // {
        //     path: '',
        //     name: '', 
        //     component: () => import('@/pages/'),
        //     meta: {
        //         layout: ''
        //     }
        // },
        // {
        //     path: '',
        //     name: '', 
        //     component: () => import('@/pages/'),
        //     meta: {
        //         layout: ''
        //     }
        // },
        // {
        //     path: '',
        //     name: '', 
        //     component: () => import('@/pages/'),
        //     meta: {
        //         layout: ''
        //     }
        // },
        // {
        //     path: '',
        //     name: '', 
        //     component: () => import('@/pages/'),
        //     meta: {
        //         layout: ''
        //     }
        // },
    ],
})

export default router
