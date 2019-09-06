import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
/* eslin -disable */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () =>
                import ('@/views/user/list'),
            meta: {
                title: '首页',
                icon: 'dashboard'
            }
        }]
    },

    {
        path: '/user',
        component: Layout,
        redirect: '/user/list',
        children: [{
            path: 'userlist',
            name: 'Userlist',
            component: () =>
                import ('@/views/user/list'),
            meta: {
                title: '用户管理',
                icon: 'dashboard'
            }
        }]
    },

    // 资讯
    {
        path: '/information',
        component: Layout,
        redirect: '/Information/list',
        name: 'Information',
        meta: {
            title: '动态资讯',
            icon: 'tree'
        },
        children: [{
                path: 'list',
                name: 'List',
                component: () =>
                    import ('@/views/information/information'),
                meta: {
                    title: '资讯列表',
                    icon: 'dashboard'
                }
            },
            {
                path: 'new',
                name: 'New',
                component: () =>
                    import ('@/views/information/new'),
                meta: {
                    title: '新增资讯',
                    icon: 'dashboard'
                }
            },
            {
                path: 'put/:id',
                name: 'Put',
                component: () =>
                    import ('@/views/information/put')
            }
        ]
    },
    // 入学评估
    {
        path: '/assessment',
        component: Layout,
        redirect: '/assessment/list',
        name: 'Assessment',
        meta: {
            title: '入学评估',
            icon: 'tree'
        },
        children: [{
                path: 'list',
                name: 'List',
                component: () =>
                    import ('@/views/assessment/assessment'),
                meta: {
                    title: '评估列表',
                    icon: 'dashboard'
                }
            },
            {
                path: 'put/:id',
                name: 'Put',
                component: () =>
                    import ('@/views/assessment/put')
            }
        ]
    },
    // 教师
    {
        path: '/teacher',
        component: Layout,
        redirect: '/Teacher/list',
        name: 'Teacher',
        meta: {
            title: '教师管理',
            icon: 'tree'
        },
        children: [{
                path: 'list',
                name: 'List',
                component: () =>
                    import ('@/views/teacher/teacher'),
                meta: {
                    title: '教师列表',
                    icon: 'dashboard'
                }
            },
            {
                path: 'new',
                name: 'New',
                component: () =>
                    import ('@/views/teacher/new'),
                meta: {
                    title: '新增教师',
                    icon: 'dashboard'
                }
            },
            {
                path: 'put/:id',
                name: 'Put',
                component: () =>
                    import ('@/views/teacher/put')
            }
        ]
    },
    // 辅导课程
    {
        path: '/tutorClass',
        component: Layout,
        redirect: '/TutorClass/list',
        name: 'TutorClass',
        meta: {
            title: '辅导课程',
            icon: 'tree'
        },
        children: [{
                path: 'list',
                name: 'List',
                component: () =>
                    import ('@/views/tutorClass/tutorClass'),
                meta: {
                    title: '课程列表',
                    icon: 'dashboard'
                }
            },
            {
                path: 'new',
                name: 'New',
                component: () =>
                    import ('@/views/tutorClass/new'),
                meta: {
                    title: '新增课程',
                    icon: 'dashboard'
                }
            },
            {
                path: 'put/:id',
                name: 'Put',
                component: () =>
                    import ('@/views/tutorClass/put')
            }
        ]
    },
    // 系统管理
    {
        path: '/system',
        component: Layout,
        redirect: '/system/msg',
        meta: {
            title: '轮播图',
            icon: 'tree'
        },
        children: [{
            path: 'flashView',
            component: () =>
                import ('@/views/flashView/list'),
            meta: {
                title: '轮播图',
                icon: 'dashboard'
            }
        }]
    },

    // product
    {
        path: '/product',
        component: Layout,
        redirect: '/product/list',
        meta: {
            title: '产品',
            icon: 'tree'
        },
        children: [{
                path: 'list',
                component: () =>
                    import ('@/views/product/list'),
                meta: {
                    title: '产品列表',
                    icon: 'dashboard'
                }
            },
            {
                path: 'post',
                component: () =>
                    import ('@/views/product/new'),
                meta: {
                    title: '新增产品',
                    icon: 'dashboard'
                }
            },
            {
                path: 'put/:id',
                component: () =>
                    import ('@/views/product/put')
            }
        ]
    },

    // 404 page must be placed at the end !!!
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router