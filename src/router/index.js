import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页' }
    }]
  },

  {
    path: '/science-area',
    component: Layout,
    children: [{
      path: 'index',
      name: 'science-area',
      component: () => import('@/views/science-area/index'),
      meta: { title: '实验室信息' }
    }]
  },

  {
    path: '/center-area',
    component: Layout,
    children: [{
      path: 'index',
      name: 'center-area',
      component: () => import('@/views/center-area/index'),
      meta: { title: '项目管理' }
    }]
  },

  {
    path: '/nonglv',
    component: Layout,
    children: [{
      path: 'index',
      name: 'nonglv',
      component: () => import('@/views/nonglv/index'),
      meta: { title: '设备管理' }
    }]
  },

  {
    path: '/lingang',
    component: Layout,
    name: 'lingan g',
    meta: { title: '事务管理' },
    children: [
      {
        path: 'east',
        name: 'east',
        component: () => import('@/views/lingang/east/index'),
        meta: { title: '人员管理' }
      },
      {
        path: 'south',
        name: 'south',
        component: () => import('@/views/lingang/south/index'),
        meta: { title: '经费管理' }
      },
      {
        path: 'west',
        name: 'west',
        component: () => import('@/views/lingang/west/index'),
        meta: { title: '内部通知' }
      },

    ]
  },
  {
    path: '/project',
    component: Layout,
    children: [{
      path: 'index',
      name: 'project',
      component: () => import('@/views/project/index'),
      meta: { title: '数据管理' }
    }]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
