import { getToken } from '@/utils/storage'
import Vue from 'vue'
import VueRouter from 'vue-router'
const Layout = () => import('@/views/Layout.vue')
const Login = () => import('@/views/Login.vue')
const Register = () => import('@/views/Register.vue')
const Detail = () => import('@/views/Detail.vue')
const Article = () => import('@/views/Article.vue')
const Like = () => import('@/views/Like.vue')
const Collect = () => import('@/views/Collect.vue')
const User = () => import('@/views/User.vue')
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: 'article',
      children: [
        { path: 'article', component: Article },
        { path: 'like', component: Like },
        { path: 'collect', component: Collect },
        { path: 'user', component: User }
      ]
    },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/detail/:id', component: Detail }
  ]
})

// 路由守卫(判断是否有token,如果没有则跳转到想要去的页面，反之强制去登录页面)
router.beforeEach((to, from, next) => {
  // 定义白名单
  const whiteList = ['/login', '/register']
  const token = getToken()
  if (token) {
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
