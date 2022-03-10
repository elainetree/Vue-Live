import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // 前台巢
  {
    path: '/',
    component: () => import('../views/front/FrontView.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/front/HomeView.vue')
      },
      {
        path: 'about',
        component: () => import('../views/front/About.vue')
      },
      {
        path: 'prods',
        component: () => import('../views/front/ProdsView.vue')
      },
      {
        path: 'prod/:id',
        component: () => import('../views/front/SingleProdView.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/front/CartView.vue')
      },
      {
        // 可獨立或放在前台
        path: 'login',
        component: () => import('../views/front/LoginView.vue')
      }
    ]
  },
  // 後台巢
  {
    path: '/admin',
    component: () => import('../views/back/DashboardView.vue'),
    children: [
      {
        path: 'prods',
        component: () => import('../views/back/AdminProds.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/back/AdminOrders.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
  // router 自訂 active 效果，名稱自訂，若要使用 BS 的，就寫「active」
  // linkActiveClass: ''
})

export default router
