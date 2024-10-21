import Vue from 'vue'
import VueRouter from 'vue-router'
import LayoutIndex from '@/views/layout/index.vue'
import HomeIndex from '@/views/layout/home.vue'
import CategoryIndex from '@/views/layout/category.vue'
import CartIndex from '@/views/layout/cart.vue'
import UserIndex from '@/views/layout/user.vue'
import store from '@/store/index.js'
const LoginIndex = () => import('@/views/login/index.vue')
const MyorderIndex = () => import('@/views/myorder/index.vue')
const ProdetallIndex = () => import('@/views/prodetall/index.vue')
const SeachIndex = () => import('@/views/search/index.vue')
const SeachListIndex = () => import('@/views/search/list.vue')
const Pay = () => import('@/views/myorder/pay.vue')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: LayoutIndex,
      redirect: '/home',
      children:
      [
        { path: '/home', component: HomeIndex },
        { path: '/category', component: CategoryIndex },
        { path: '/cart', component: CartIndex },
        { path: '/user', component: UserIndex }
      ]
    },
    { path: '/login', component: LoginIndex },
    { path: '/myorder', component: MyorderIndex },
    { path: '/prodetail/:id', component: ProdetallIndex },
    { path: '/search', component: SeachIndex },
    { path: '/searchList', component: SeachListIndex },
    { path: '/pay', component: Pay }
  ]
})

const authUrl = ['/pay', '/myorder']

router.beforeEach((to, from, next) => {
  const token = store.getters['user/getToken']
  if (!authUrl.includes(to.path)) {
    next()
    return
  }
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
