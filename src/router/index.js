import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import('@/views/Video')
      },
      {
        path: '/qa',
        component: () => import('@/views/QA')
      },
      {
        path: '/profile',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
  },
  {
    path: '/detail',
    component: () => import('@/views/Detail')
  },
  {
    path: '/user/profile',
    component: () => import('@/views/editUserInfo')
  }
]

const router = new VueRouter({
  routes
})

export default router
