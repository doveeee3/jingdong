import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/home/Home.vue')
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () =>
      import(/* webpackChunkName: "shop" */ '../views/shop/Shop.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () =>
      import(
        /* webpackChunkName: "register" */ '../views/register/Register.vue'
      ),
    beforeEnter(to, from, next) {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue'),
    beforeEnter(to, from, next) {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/orderConfirmation/:id',
    name: 'OrderConfirmation',
    component: () => import('../views/orderConfirmation/OrderConfirmation')
  },
  {
    path: '/cartList',
    name: 'CartList',
    component: () => import('../views/cartList/CartList')
  },
  {
    path: '/orderList',
    name: 'OrderList',
    component: () => import('../views/orderList/OrderList')
  },
  {
    path: '/personalCenter',
    name: 'PersonalCenter',
    component: () => import('../views/personalCenter/PersonalCenter')
  },
  {
    path: '/addressList',
    name: 'AddressList',
    component: () => import('../views/personalCenter/address/AddressList')
  },
  {
    path: '/addAddress',
    name: 'AddAddress',
    component: () => import('../views/personalCenter/address/AddAddress')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage
  isLogin || to.name === 'Login' || to.name === 'Register'
    ? next()
    : next({ name: 'Login' })
})

export default router
