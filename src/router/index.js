import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const login = r => require.ensure([], () => r(require('../page/login')), 'login');
const manage = r => require.ensure([], () => r(require('../page/manage/manage')), 'manage');
const home = r => require.ensure([], () => r(require('../page/manage/children/home')), 'home');
const userList = r => require.ensure([], () => r(require('../page/manage/children/userList')), 'userList');
const shopList = r => require.ensure([], () => r(require('../page/manage/children/shopList')), 'shopList');
const foodList = r => require.ensure([], () => r(require('../page/manage/children/foodList')), 'foodList');
const orderList = r => require.ensure([], () => r(require('../page/manage/children/orderList')), 'orderList');
const adminList = r => require.ensure([], () => r(require('../page/manage/children/adminList')), 'adminList');
const addShop = r => require.ensure([], () => r(require('../page/manage/children/addShop')), 'addShop');
const addFood = r => require.ensure([], () => r(require('../page/manage/children/addFood')), 'addFood');
const visitor = r => require.ensure([], () => r(require('../page/manage/children/visitor')), 'visitor');
const adminSet = r => require.ensure([], () => r(require('../page/manage/children/adminSet')), 'adminSet');
const explain = r => require.ensure([], () => r(require('../page/manage/children/explain')), 'explain');

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
        },
        {
          path: 'foodlist',
          component: foodList,
          meta: ['数据管理', '食品列表']
        },
        {
          path: 'orderlist',
          component: orderList,
          meta: ['数据管理', '订单列表']
        },
        {
          path: 'adminlist',
          component: adminList,
          meta: ['数据管理', '管理员列表']
        },
        {
          path: 'addshop',
          component: addShop,
          meta: ['添加数据', '添加商铺']
        },
        {
          path: 'addfood',
          component: addFood,
          meta: ['添加数据', '添加商品']
        },
        {
          path: 'visitor',
          component: visitor,
          meta: ['图表', '用户分布']
        },
        {
          path: 'adminset',
          component: adminSet,
          meta: ['设置', '管理员设置']
        },
        {
          path: 'explain',
          component: explain,
          meta: ['说明', '说明']
        }
      ]
    }
  ]
})
