import Vue from "vue";
import VueRouter from "vue-router";

// 按需加载 （如果打包出错可能是babel插件的问题）
const first = () => import(/* webpackChunkName:'first'*/ '../page/first/first.vue')
const home = () => import(/* webpackChunkName:'home'*/ '../page/home/index.vue')
const homes = () => import(/* webpackChunkName:'homes'*/ '../page/homes/index.vue')
const store = () => import(/* webpackChunkName:'store'*/ '../page/store/store.vue')
const orders = () => import(/* webpackChunkName:'orders'*/ '../page/store/orders/orders.vue')
const product = () => import(/* webpackChunkName:'product'*/ '../page/store/product/product.vue')
const wait = () => import(/* webpackChunkName:'wait'*/ '../page/store/product/wait/wait.vue')
const result = () => import(/* webpackChunkName:'result'*/ '../page/store/product/result/result.vue')
const not = () => import(/* webpackChunkName:'not'*/ '../page/store/product/not/not.vue')
const back = () => import(/* webpackChunkName:'back'*/ '../page/store/product/back/back.vue')
const miss = () => import(/* webpackChunkName:'miss'*/ '../page/store/product/miss/miss.vue')
const overtime = () => import(/* webpackChunkName:'overtime'*/ '../page/store/product/overtime/overtime.vue')
const login = () => import(/* webpackChunkName:'login'*/ '../page/login/login.vue')
const register = () => import(/* webpackChunkName:'register'*/ '../page/register/register.vue')
const recharge = () => import(/* webpackChunkName:'recharge'*/ '../page/store/recharge/recharge.vue')
const vipMessage = () => import(/* webpackChunkName:'vipMessage'*/ '../page/vip/vipMessage.vue')
const goods = () => import(/* webpackChunkName:'goods'*/ '../page/vip/goods.vue')
const stores = () => import(/* webpackChunkName:'stores'*/ '../page/vip/stores.vue')
const newStore = () => import(/* webpackChunkName:'newStore'*/ '../page/vip/newStore.vue')
const custom = () => import(/* webpackChunkName:'custom'*/ '../page/custom/index.vue')
const customMessage = () => import(/* webpackChunkName:'customMessage'*/ '../page/custom/customMessage.vue')
const notic = () => import(/* webpackChunkName:'notic'*/ '../page/vip/notic.vue')
const noticMessage = () => import(/* webpackChunkName:'noticMessage'*/ '../page/vip/noticMessage.vue')
const change = () => import(/* webpackChunkName:'change'*/ '../page/vip/change.vue')
const newGoods = () => import(/* webpackChunkName:'newGoods'*/ '../page/vip/newGoods.vue')
const ordersMessage = () => import(/* webpackChunkName:'ordersMessage'*/ '../page/store/ordersMessage.vue')
const exchange = () => import(/* webpackChunkName:'exchange'*/ '../page/store/exchange.vue')
const task = () => import(/* webpackChunkName:'task'*/ '../page/task/task.vue')
const comment = () => import(/* webpackChunkName:'comment'*/ '../page/task/comment.vue')
const send = () => import(/* webpackChunkName:'send'*/ '../page/task/send.vue')
const sendOne = () => import(/* webpackChunkName:'sendOne'*/ '../page/task/send/sendOne.vue')
const sendTwo = () => import(/* webpackChunkName:'sendTwo'*/ '../page/task/send/sendTwo.vue')
const sendThree = () => import(/* webpackChunkName:'sendThree'*/ '../page/task/send/sendThree.vue')
const sendFour = () => import(/* webpackChunkName:'sendFour'*/ '../page/task/send/sendFour.vue')
const sendFive = () => import(/* webpackChunkName:'sendFive'*/ '../page/task/send/sendFive.vue')
const sendType = () => import(/* webpackChunkName:'sendType'*/ '../page/task/send/sendType.vue')
//使用路由
Vue.use(VueRouter);

const routes=[{
    path: '/login',
    component :login
  },{
    path: '/register',
    component :register
  },{
    path: '/first',
    component :first,
    children:[{
    path: '/home',
    component: home
    },{
      path: '/homes',
      component :homes
    },{
      path: '/custom',
      name:'custom',
      component :custom
    },{
      path: '/customMessage',
      name: 'customMessage',
      component :customMessage
    },{
      path: '/store',
      component :store,
      children:[{
        path: 'orders',
        name:'orders',
        component :orders
      },{
        path: 'ordersMessage',
        component :ordersMessage
      },{
        path: 'exchange',
        component :exchange
      },{
        path: 'product',
        component :product,
        children:[{
          path: 'wait',
          component :wait
        },{
          path: 'result',
          component :result
        },{
          path: 'not',
          component :not
        },{
          path: 'back',
          component :back
        },{
          path: 'miss',
          component :miss
        },{
          path: 'overtime',
          component :overtime
        }]
      },{
        path: 'recharge',
        component :recharge
      }]
    },{
      path: '/vipMessage',
      component :vipMessage
    },{
      path: '/stores',
      component :stores
    },{
      path: '/newStore',
      component :newStore
    },{
      path: '/notic',
      component :notic
    },{
      path: '/noticMessage',
      name:'noticMessage',
      component :noticMessage
    },{
      path: '/goods',
      component :goods
    },{
      path: '/change',
      component :change
    },{
      path: '/newGoods',
      component :newGoods
    },{
      path: '/task',
      name:'task',
      component :task
    },{
      path: '/comment',
      name:'comment',
      component :comment
    },{
      path: '/send',
      name:'send',
      component :send,
      children:[{
        path: '',
        name:'sendOne',
        component :sendOne,
      },{
        path: 'sendTwo',
        name:'sendTwo',
        component :sendTwo,
      },{
        path: 'sendThree',
        name:'sendThree',
        component :sendThree,
      },{
        path: 'sendFour',
        name:'sendFour',
        component :sendFour,
      },{
        path: 'sendFive',
        name:'sendFive',
        component :sendFive,
      },{
        path: 'sendType',
        name:'sendType',
        component :sendType,
      }]
    }]
  },{
    path: '/',
    redirect: '/login'
  }
]

var router=new VueRouter({
  base:'/task_program/bussiness',
  routes
})

//=====导出router

export default router
