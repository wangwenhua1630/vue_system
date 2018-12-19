import axios from 'axios';

import router from '../router/index.js'
import {Toast,Indicator,MessageBox} from 'mint-ui';
import 'mint-ui/lib/style.css';
import msgBox from "@/components/msgBox/msgBox";
// import store from '../store';

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 100000 // 请求超时时间
});
service.defaults.withCredentials = true; //cookie信息
// request拦截器(axios请求拦截器)
service.interceptors.request.use(config => {
  console.log(config)
  return config;
}, error => {
  console.log(error);
  Promise.reject(error);
})

// respone拦截器(axios响应拦截器)
service.interceptors.response.use(
  response => {
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    const res = response.data;
    if(res.user_pan=='1'){
      Toast('您的账号已被冻结')
      Indicator.close();
      setTimeout(function(){
        router.push({
            path: '/login'
        })
      },500)
      return Promise.reject('error');
    }else if(res.user_pan=='2'){
      Toast('您还未完善信息')
      Indicator.close();
      setTimeout(function(){
        router.push({
            path: '/mainMessage'
        })
      },500)
       return response.data;
    }else if(res.user_pan=='3'){
      Toast('您的信息还在审核中')
      Indicator.close();
      setTimeout(function(){
        router.push({
            path: '/mainMessage'
        })
      },500)
       return response.data;
    }else if(res.user_pan=='4'){
      // Toast('您的信息未通过审核，未通过原因为:'+res.cause);
      MessageBox('提示', '您的信息未通过审核，未通过原因为:'+res.cause);
      Indicator.close();
      setTimeout(function(){
        router.push({
            path: '/mainMessage'
        })
      },500)
       return response.data;
    }else if(res.user_pan=='5'){
      Toast('请重新登录')
      Indicator.close();
      setTimeout(function(){
        router.push({
            path: '/login'
        })
      },500)
      return Promise.reject('error');
    }else{
       return response.data;
    }
  },
  error => {
    console.log('err' + error); // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
