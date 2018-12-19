import Vue from 'vue'
import VueRouter from "vue-router";

const first = () => import(/* webpackChunkName:'first'*/ '../page/first/first.vue')
const messageBox = () => import(/* webpackChunkName:'messageBox'*/ '../page/messageBox/message.vue')
const main = () => import(/* webpackChunkName:'main'*/ '../page/main/main.vue')
const qian = () => import(/* webpackChunkName:'qian'*/ '../page/qian/qian.vue')
const moneyGuan = () => import(/* webpackChunkName:'moneyGuan'*/ '../page/moneyGuan/moneyGuan.vue')
const complain = () => import(/* webpackChunkName:'complain'*/ '../page/complain/complain.vue')
const withdraw = () => import(/* webpackChunkName:'withdraw'*/ '../page/withdraw/withdraw.vue')
const share = () => import(/* webpackChunkName:'share'*/ '../page/share/share.vue')
const study = () => import(/* webpackChunkName:'study'*/ '../page/study/study.vue')
const details = () => import(/* webpackChunkName:'details'*/ '../page/details/details.vue')
const detail = () => import(/* webpackChunkName:'detail'*/ '../page/detail/detail.vue')
const complain_detail = () => import(/* webpackChunkName:'complain_detail'*/ '../page/complain_detail/complain_detail.vue')
const rules = () => import(/* webpackChunkName:'rules'*/ '../page/rules/rules.vue')
const mainMessage = () => import(/* webpackChunkName:'mainMessage'*/ '../page/mainMessage/mainMessage.vue')
const moneyBind = () => import(/* webpackChunkName:'moneyBind'*/ '../page/moneyBind/moneyBind.vue')
const prove = () => import(/* webpackChunkName:'prove'*/ '../page/prove/prove.vue')
const proveTwo = () => import(/* webpackChunkName:'proveTwo'*/ '../page/prove/proveTwo.vue')
const proveThree = () => import(/* webpackChunkName:'proveThree'*/ '../page/prove/proveThree.vue')
const proveFour = () => import(/* webpackChunkName:'proveFour'*/ '../page/prove/proveFour.vue')
const proveFive = () => import(/* webpackChunkName:'proveFive'*/ '../page/prove/proveFive.vue')
const register = () => import(/* webpackChunkName:'register'*/ '../page/register/register.vue')
const login = () => import(/* webpackChunkName:'login'*/ '../page/login/login.vue')
const forget = () => import(/* webpackChunkName:'forget'*/ '../page/forget/forget.vue')
const homes = () => import(/* webpackChunkName:'homes'*/ '../page/homes/homes.vue')
const taskInfo = () => import(/* webpackChunkName:'taskInfo'*/ '../page/taskInfo/taskInfo.vue')
const taskOne = () => import(/* webpackChunkName:'taskOne'*/ '../page/taskStep/taskOne.vue')
const taskTwo = () => import(/* webpackChunkName:'taskTwo'*/ '../page/taskStep/taskTwo.vue')
const taskThree = () => import(/* webpackChunkName:'taskThree'*/ '../page/taskStep/taskThree.vue')
const taskBox = () => import(/* webpackChunkName:'taskBox'*/ '../page/taskBox/taskBox.vue')
const taskComment = () => import(/* webpackChunkName:'taskComment'*/ '../page/taskComment/taskComment.vue')
const overdue = () => import(/* webpackChunkName:'overdue'*/ '../page/overdue/overdue.vue')
const miss = () => import(/* webpackChunkName:'miss'*/ '../page/miss/miss.vue')
const dialog = () => import(/* webpackChunkName:'dialog'*/ '../page/dialog/dialog.vue')
const xuan = () => import(/* webpackChunkName:'xuan'*/ '../page/xuan/xuan.vue')
const change=()=>import('../page/xuan/change.vue')
const infoMessage=()=>import('../page/xuan/infoMessage.vue')
Vue.use(VueRouter)

const routes=[{
    path: '/first',
    component :first,
    children:[{
      path:'/main',
      component:main,
      name:'个人中心'
    },{
      path:'/homes',
      component:homes,
      name:'首页'
    }]
	},{
    path: '/taskInfo',
    component :taskInfo,
    name:'任务详情'
	},{
    path: '/taskOne',
    component :taskOne,
    name:'开始任务1'
  },{
    path: '/dialog',
    component :dialog,
    name:'弹框'
  },{
    path: '/taskTwo',
    component :taskTwo,
    name:'开始任务2'
  },{
    path: '/taskThree',
    component :taskThree,
    name:'开始任务3'
  },{
    path: '/taskBox',
    component :taskBox,
    name:'任务查看'
  },{
    path: '/taskComment',
    component :taskComment,
    name:'评价任务'
  },{
    path: '/overdue',
    component :overdue,
    name:'过期任务'
  },{
    path: '/messageBox',
    component :messageBox,
    name:'消息提醒'
  },{
    path: '/miss',
    component :miss,
    name:'纠错任务'
  },{
    path: '/qian',
    component :qian,
    name:'每日签到'
  },{
    path: '/xuan',
    component :xuan,
    name:'选择平台'
  },{
    path: '/change',
    component :change,
    name:'切换账户'
  },{
    path: '/infoMessage',
    component :infoMessage,
    name:'填写资料'
  },{
    path: '/moneyGuan',
    component :moneyGuan,
    name:'资金管理'
  },{
    path: '/complain',
    component :complain,
    name:'我要申诉'
  },{
    path: '/withdraw',
    component :withdraw,
    name:'申请提现'
  },{
    path: '/share',
    component :share,
    name:'推荐分享'
  },{
    path: '/study',
    component :study,
    name:'基础教学'
  },{
    path: '/details',
    component :details,
    name:'详情查看'
  },{
    path: '/complain_detail',
    component :complain_detail,
    name:'申诉详情'
  },{
    path: '/detail',
    component :detail,
    name:'新手引导'
  },{
    path: '/rules',
    component :rules,
    name:'规则协议'
  },{
    path: '/mainMessage',
    component :mainMessage,
    name:'个人资料'
  },{
    path: '/moneyBind',
    component :moneyBind,
    name:'资金绑定'
  },{
    path: '/prove',
    component :prove,
    name:'认证资料'
  },{
    path: '/proveTwo',
    component :proveTwo,
    name:'认证资料'
  },{
    path: '/proveThree',
    component :proveThree,
    name:'认证资料'
  },{
    path: '/proveFour',
    component :proveFour,
    name:'认证资料'
  },{
    path: '/proveFive',
    component :proveFive,
    name:'认证资料'
  },{
    path: '/register',
    component :register,
    name:'注册'
  },{
    path: '/login',
    component :login,
    name:'登录'
  },{
    path: '/forget',
    component :forget,
    name:'忘记密码'
  },{
    path: '/',
    redirect: '/login'
  }
]


var router=new VueRouter({
  base:'/task_program/web',
  routes
})

//=====导出router

export default router
