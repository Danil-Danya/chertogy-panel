import { createRouter, createWebHistory } from 'vue-router';
import { checkAuth, checkRoles } from './guards';

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
            path: '/reseted-password',
            name: 'reseted password',
            component: () => import('@/pages/ResetedPassword.vue'),
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
                title: 'Профиль',
                auth: 'true',
            }
        },
        {
            path: '/settings',
            name: 'settings',
            component: () => import('@/pages/Settings.vue'),
            meta: {
                layout: 'profile',
                title: 'Настройки',
                auth: 'true',
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
                title: 'Уведомления',
                auth: 'true',
            }
        },
        {
            path: '/favorites-masters',
            name: 'masters', 
            component: () => import('@/pages/FavoriteMasters.vue'),
            meta: {
                layout: 'profile',
                title: 'Избранные мастера',
                auth: 'true',
            }
        },
        {
            path: '/user/:id',
            name: 'Profile by id', 
            component: () => import('@/pages/AnyUserProfile.vue'),
            meta: {
                layout: 'default'
            }
        },
        {
            path: '/privacy-policy',
            name: 'Privacy Policy', 
            component: () => import('@/pages/PrivacyPolicy.vue'),
            meta: {
                layout: 'default'
            }
        },
        {
            path: '/events/create',
            name: 'create-events', 
            component: () => import('@/pages/EventsCreate.vue'),
            meta: {
                layout: 'form',
                auth: 'true',
            }
        },
        {
            path: '/news',
            name: 'news', 
            component: () => import('@/pages/News.vue'),
            meta: {
                layout: 'profile',
                title: 'Новости',
                auth: 'true',
                roles: ['ADMIN']
            }
        },
        {
            path: '/news/create',
            name: 'news-create', 
            component: () => import('@/pages/NewsCreate.vue'),
            meta: {
                layout: 'form',
                auth: 'true',
                roles: ['ADMIN']
            }
        },
        {
            path: '/news/update/:id',
            name: 'news-update', 
            component: () => import('@/pages/NewsUpdated.vue'),
            meta: {
                layout: 'form',
                auth: 'true',
                roles: ['ADMIN']
            }
        },
        {
            path: '/permission-denied',
            name: 'permission-denied', 
            component: () => import('@/pages/Permission.vue'),
            meta: {
                layout: 'default',
            }
        },
        {
            path: '/users',
            name: 'users', 
            component: () => import('@/pages/UserBase.vue'),
            meta: {
                layout: 'profile',
                title: 'База пользователей',
                auth: 'true',
                roles: ['ADMIN']
            }
        },
        {
            path: '/tags',
            name: 'tags', 
            component: () => import('@/pages/Tags.vue'),
            meta: {
                layout: 'profile',
                title: 'Просмотр Тегов',
                auth: 'true',
                roles: ['ADMIN']
            }
        },
        {
            path: '/tags/create/:category_id',
            name: 'create tag', 
            component: () => import('@/pages/TagsCreate.vue'),
            meta: {
                layout: 'form',
                auth: 'true',
                roles: ['ADMIN']
            }
        },
        {
            path: '/tags/:category_id/update/:id',
            name: 'update tags', 
            component: () => import('@/pages/TagsUpdate.vue'),
            meta: {
                layout: 'form',
                auth: 'true',
                roles: ['ADMIN']
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

    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } 
        else {
            return { top: 0 };
        }
    }
})


router.beforeEach(async (to) => {
    const requiresAuth = to.meta.auth;
    const roles = to.meta.roles || [];

    if (requiresAuth) {
        const isAuth = await checkAuth();
        if (!isAuth) {
            return '/login';
        }

        const hasRole = await checkRoles(roles);
        if (!hasRole) {
            return '/permission-denied';
        }
    }
})

export default router;
