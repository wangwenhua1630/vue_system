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
const miss = () => import(/* webpackChunkName:'miss'*/ '../page/store/product/miss/miss.vue')
const login = () => import(/* webpackChunkName:'login'*/ '../page/login/login.vue')
const register = () => import(/* webpackChunkName:'register'*/ '../page/register/register.vue')
const recharge = () => import(/* webpackChunkName:'recharge'*/ '../page/store/recharge/recharge.vue')
const vipMessage = () => import(/* webpackChunkName:'vipMessage'*/ '../page/vip/vipMessage.vue')
const shuaMessage = () => import(/* webpackChunkName:'shuaMessage'*/ '../page/vip/shuaMessage.vue')
const storeMessage = () => import(/* webpackChunkName:'storeMessage'*/ '../page/vip/storeMessage.vue')
const storeInfo = () => import(/* webpackChunkName:'storeInfo'*/ '../page/vip/storeInfo.vue')
const goods = () => import(/* webpackChunkName:'goods'*/ '../page/vip/goods.vue')
const stores = () => import(/* webpackChunkName:'stores'*/ '../page/vip/stores.vue')
const newStore = () => import(/* webpackChunkName:'newStore'*/ '../page/vip/newStore.vue')
const ordersMessage = () => import(/* webpackChunkName:'ordersMessage'*/ '../page/store/ordersMessage.vue')
const exchange = () => import(/* webpackChunkName:'exchange'*/ '../page/store/exchange.vue')
const task = () => import(/* webpackChunkName:'task'*/ '../page/task/task.vue')
const comment = () => import(/* webpackChunkName:'comment'*/ '../page/task/comment.vue')
const taskOld = () => import(/* webpackChunkName:'taskOld'*/ '../page/task/taskOld.vue')
const commentOld = () => import(/* webpackChunkName:'commentOld'*/ '../page/task/commentOld.vue')
const role = () => import(/* webpackChunkName:'role'*/ '../page/role/role.vue')
const messageNotic = () => import(/* webpackChunkName:'messageNotic'*/ '../page/message/messageNotic.vue')
const noticMessage = () => import(/* webpackChunkName:'noticMessage'*/ '../page/message/noticMessage.vue')
const messageFa = () => import(/* webpackChunkName:'messageFa'*/ '../page/message/messageFa.vue')
const messageStore = () => import(/* webpackChunkName:'messageStore'*/ '../page/message/messageStore.vue')
const innerStore = () => import(/* webpackChunkName:'innerStore'*/ '../page/message/innerStore.vue')
const innerHand = () => import(/* webpackChunkName:'innerHand'*/ '../page/message/innerHand.vue')
const tou = () => import(/* webpackChunkName:'tou'*/ '../page/message/innerStore/tou.vue')
const bao = () => import(/* webpackChunkName:'bao'*/ '../page/message/innerStore/bao.vue')
const zhuan = () => import(/* webpackChunkName:'zhuan'*/ '../page/message/innerStore/zhuan.vue')
const dan = () => import(/* webpackChunkName:'dan'*/ '../page/message/innerStore/dan.vue')
const chong = () => import(/* webpackChunkName:'chong'*/ '../page/message/innerStore/chong.vue')
const shen = () => import(/* webpackChunkName:'shen'*/ '../page/message/innerStore/shen.vue')
const tiXian = () => import(/* webpackChunkName:'tiXian'*/ '../page/message/innerStore/tiXian.vue')
const shua_tou = () => import(/* webpackChunkName:'shua_tou'*/ '../page/message/innerHand/shua_tou.vue')
const shua_zhuan = () => import(/* webpackChunkName:'shua_zhuan'*/ '../page/message/innerHand/shua_zhuan.vue')
const shua_bao = () => import(/* webpackChunkName:'shua_bao'*/ '../page/message/innerHand/shua_bao.vue')
const shua_xian = () => import(/* webpackChunkName:'shua_xian'*/ '../page/message/innerHand/shua_xian.vue')
const self = () => import(/* webpackChunkName:'self'*/ '../page/self/self.vue')
const selfMessage = () => import(/* webpackChunkName:'self'*/ '../page/self/selfMessage.vue')
const selfXin = () => import(/* webpackChunkName:'selfXin'*/ '../page/self/selfXin.vue')
const storeDan = () => import(/* webpackChunkName:'storeDan'*/ '../page/self/storeDan.vue')
const storeLei = () => import(/* webpackChunkName:'storeLei'*/ '../page/self/storeLei.vue')
const storeYao = () => import(/* webpackChunkName:'storeYao'*/ '../page/self/storeYao.vue')
const businessNotic = () => import(/* webpackChunkName:'businessNotic'*/ '../page/self/businessNotic.vue')
const businessNoticBox = () => import(/* webpackChunkName:'businessNoticBox'*/ '../page/self/businessNoticBox.vue')
const mainMessage = () => import(/* webpackChunkName:'mainMessage'*/ '../page/self/mainMessage.vue')
const shuaDenji=()=>import('../page/self/shuaDenji.vue')
const businessRules=()=>import('../page/self/businessRules.vue')
const shuaBanner=()=>import('../page/self/shuaBanner.vue')
const multipleAccounts=()=>import('../page/vip/multipleAccounts.vue')
//使用路由
Vue.use(VueRouter);

const routes=[{path: '/login', component :login},
               {path: '/register', component :register},
               {path: '/first', component :first,
                        children:[{path: '/home', component: home},
                                    {path: '/homes', component :homes},
                                    {path: '/role', name:'role', component :role},
                                    {path: '/store', component :store,
                                            children:[{path: 'orders', name:'orders', component :orders},
                                                        {path: 'ordersMessage', component :ordersMessage},
                                                        {path: 'exchange', component :exchange},
                                                        {path: 'product', component :product,
                                                                  children:[{path: 'wait', component :wait},
                                                                              {path: 'result', component :result},
                                                                              {path: 'not', component :not},
                                                                               {path: 'miss', component :miss}
                                                                               ]},
                                                        {path: 'recharge', component :recharge}
                                                                              ]},
                                    {path: '/vipMessage', component :vipMessage},
                                    {path: '/multipleAccounts', component :multipleAccounts},
                                    {path: '/shuaMessage', component :shuaMessage},
                                    {path: '/storeMessage', component :storeMessage},
                                    {path: '/storeInfo', component :storeInfo},
                                    {path: '/stores',name:'stores', component :stores},
                                    {path: '/newStore', component :newStore},
                                    {path: '/goods',name:'goods', component :goods},
                                    {path: '/task', name:'task', component :task},
                                    {path: '/comment', name:'comment', component :comment},
                                    {path: '/taskOld', name:'taskOld', component :taskOld},
                                    {path: '/commentOld', name:'commentOld', component :commentOld},
                                    {path: '/messageNotic', name:'messageNotic', component :messageNotic},
                                    {path: '/noticMessage', name:'noticMessage', component :noticMessage},
                                    {path: '/messageFa', name:'messageFa', component :messageFa},
                                    {path: '/messageStore', name:'messageStore', component :messageStore},
                                    {path: '/self', component :self},
                                    {path: '/selfXin', component :selfXin},
                                    {path: '/selfMessage', name:'selfMessage', component :selfMessage},
                                    {path: '/storeDan', component :storeDan},
                                    {path: '/storeLei', component :storeLei},
                                    {path: '/storeYao', component :storeYao},
                                    {path: '/businessNotic', name:'businessNotic', component :businessNotic},
                                    {path: '/businessNoticBox', component :businessNoticBox},
                                    {path: '/businessRules', component :businessRules},
                                    {path:'/shuaDenji',component:shuaDenji},
                                    {path:'/shuaBanner',component:shuaBanner},
                                    {path: '/mainMessage', component :mainMessage},
                                    {path: '/innerStore', name:'innerStore', component :innerStore,
                                            children:[{path: 'tou', component :tou},
                                                        {path: 'bao', component :bao},
                                                        {path: 'tiXian', component :tiXian},
                                                        {path: 'zhuan', component :zhuan},
                                                        {path: 'dan', component :dan},
                                                        {path: 'chong', component :chong},
                                                        {path: 'shen', component :shen}]},
                                    {path: '/innerHand', name:'innerHand', component :innerHand,
                                            children:[{path: 'shua_tou', component :shua_tou},
                                                        {path: 'shua_zhuan', component :shua_zhuan},
                                                        {path: 'shua_bao', component :shua_bao},
                                                        {path: 'shua_xian', component :shua_xian}]
                                    }
                                   ]},
               {path: '/', redirect: '/login'}
]

var router=new VueRouter({
  routes,
  base:'/bozhi_webapp/super'
})

//=====导出router

export default router
