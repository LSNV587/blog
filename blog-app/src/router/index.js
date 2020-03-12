import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/Home'
/*import Index from '@/views/Index'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Log from '@/views/Log'
import MessageBoard from '@/views/MessageBoard'
import BlogWrite from '@/views/blog/BlogWrite'
import BlogView from '@/views/blog/BlogView'
import BlogAllCategoryTag from '@/views/blog/BlogAllCategoryTag'
import BlogCategoryTag from '@/views/blog/BlogCategoryTag'*/

import {Message} from 'element-ui';


import store from '@/store'

import {getToken} from '@/request/token'

Vue.use(Router)

const router = new Router({
  // routes: [
  //   {
  //     path: '/write/:id?',
  //     component: r => require.ensure([], () => r(require('@/views/blog/BlogWrite')), 'blogwrite'),
  //     meta: {
  //       requireLogin: true
  //     },
  //   },
  //   {
  //     path: '',
  //     name: 'Home',
  //     component: Home,
  //     children: [
  //       {
  //         path: '/',
  //         component: r => require.ensure([], () => r(require('@/views/Index')), 'index')
  //       },
  //       {
  //         path: '/log',
  //         component: r => require.ensure([], () => r(require('@/views/Log')), 'log')
  //       },
  //       {
  //         path: '/archives/:year?/:month?',
  //         component: r => require.ensure([], () => r(require('@/views/blog/BlogArchive')), 'archives')
  //       },
  //       {
  //         path: '/messageBoard',
  //         component: r => require.ensure([], () => r(require('@/views/MessageBoard')), 'messageboard')
  //       },
  //       {
  //         path: '/view/:id',
  //         component: r => require.ensure([], () => r(require('@/views/blog/BlogView')), 'blogview')
  //       },
  //       {
  //         path: '/:type/all',
  //         component: r => require.ensure([], () => r(require('@/views/blog/BlogAllCategoryTag')), 'blogallcategorytag')
  //       },
  //       {
  //         path: '/:type/:id',
  //         component: r => require.ensure([], () => r(require('@/views/blog/BlogCategoryTag')), 'blogcategorytag')
  //       }
  //     ]
  //   },
  //   {
  //     path: '/login',
  //     component: r => require.ensure([], () => r(require('@/views/Login')), 'login')
  //   },
  //   {
  //     path: '/register',
  //     component: r => require.ensure([], () => r(require('@/views/Register')), 'register')
  //   }

  // ],
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login')
    },
    {
      path: '/register',
      component: () => import('@/views/Register')
    },
    {
      path: '',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/Home',
          component: () => import('@/views/Index')
        },
        {
          path: '/log',
          component: () => import('@/views/Log')
        },
        {
          path: '/archives/:year?/:month?',
          component: () => import('@/views/blog/BlogArchive')
        },
        {
          path: '/messageBoard',
          component: () => import('@/views/MessageBoard')
        },
        {
          path: '/view/:id',
          component: () => import('@/views/blog/BlogView')
        },
        {
          path: '/:type/all',
          component: () => import('@/views/blog/BlogAllCategoryTag')
        },
        {
          path: '/:type/:id',
          component: () => import('@/views/blog/BlogCategoryTag')
        },
        {
          path: '/write/:id?',
          component: () => import('@/views/blog/BlogWrite')
          // meta: {
          //   requireLogin: true
          // },
        }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})
// 解决路由点击报错的问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    // console.log(to.path, 'to.path')
    // console.log(store.getters, 'store.getters')
    if (store.getters.token) {
      store.dispatch('GetUserInfo')
    }
  }
  // if (getToken()) {
    // if (to.path === '/login') {
    //   next()
    // } else {
    //   console.log(store.state)
    //   if (store.state.account=== '') {
    //     store.dispatch('GetUserInfo').then(data => { //获取用户信息
    //       // next()
    //     }).catch(() => {
    //       next()
    //     })
    //   } else {
    //     next()
    //   }
    // }
  // } else {
  //   if (to.matched.some(r => r.meta.requireLogin)) {
  //     Message({
  //       type: 'warning',
  //       showClose: true,
  //       message: '请先登录哦'
  //     })

  //   }
  //   else {
      next()
  //   }
  // }
})


export default router
