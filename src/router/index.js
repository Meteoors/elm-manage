import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const login = r => require.ensure([], () => r(require('../page/login')), 'login');
const manage = r => require.ensure([], () => r(require('../page/manage/manage')), 'manage');
const home = r => require.ensure([], () => r(require('../page/manage/children/home')), 'home');
const userList = r => require.ensure([], () => r(require('../page/manage/children/userList')), 'userList');

export default new Router({
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/manage',
      component: manage,
      children: [
        {
          path: '',
          component: home,
          meta: []
        },
        {
          path: 'userlist',
          component: userList,
          meta: ['数据管理', '用户列表']
        },
        {
          path: 'shoplist',
          component: shopList,
          meta: ['数据管理', '商家列表']
        }
      ]
    }
  ]
})
