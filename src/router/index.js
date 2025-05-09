import useMainStore from '@/stores/main/main'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main',
    },
    {
      path: '/login',
      component: () => import('@/views/login/login.vue'),
    },
    {
      name: 'main',
      path: '/main',
      component: () => import('@/views/main/main.vue'),
      children: [],
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/not found/notFound.vue'),
    },
  ],
})

const overviewCpn =
  import.meta.env.MODE === 'production'
    ? () => import('@/views/main/modules/analysis/overview/overview1.vue')
    : () => import('@/views/main/modules/analysis/overview/overview.vue')

const freeRoute = {
  dashboard: {
    name: 'dashboard',
    path: '/main/analysis/dashboard',
    component: () => import('@/views/main/modules/analysis/dashboard/dashboard.vue'),
  },
  overview: {
    name: 'overview',
    path: '/main/analysis/overview',
    component: overviewCpn,
  },
  category: {
    name: 'category',
    path: '/main/product/category',
    component: () => import('@/views/main/modules/product/category/category.vue'),
  },
  goods: {
    name: 'goods',
    path: '/main/product/goods',
    component: () => import('@/views/main/modules/product/goods/goods.vue'),
  },
  chat: {
    name: 'chat',
    path: '/main/story/chat',
    component: () => import('@/views/main/modules/story/chat/chat.vue'),
  },
  list: {
    name: 'list',
    path: '/main/story/list',
    component: () => import('@/views/main/modules/story/list/list.vue'),
  },
  department: {
    name: 'department',
    path: '/main/system/department',
    component: () => import('@/views/main/modules/system/department/department.vue'),
  },
  menu: {
    name: 'menu',
    path: '/main/system/menu',
    component: () => import('@/views/main/modules/system/menu/menu.vue'),
  },
  role: {
    name: 'role',
    path: '/main/system/role',
    component: () => import('@/views/main/modules/system/role/role.vue'),
  },
  user: {
    name: 'user',
    path: '/main/system/user',
    component: () => import('@/views/main/modules/system/user/user.vue'),
  },
}

let firstRoute
router.beforeEach((to) => {
  const token = localStorage.getItem('login/token')
  if (to.path !== '/login' && !token) {
    return '/login'
  }

  const mainStore = useMainStore()
  if (to.path.startsWith('/main') && mainStore.firstView) {
    mainStore.firstView = false
    mainStore.fetchRoleMenu(localStorage.getItem('userId')).then((res) => {
      res.forEach((key) => {
        if (key in freeRoute) {
          if (!firstRoute) firstRoute = freeRoute[key].path
          router.addRoute('main', freeRoute[key])
        }
      })
      router.push(to.path === '/main' ? firstRoute : to.path)
    })
    return false
  }
})

export default router
