import axios from 'axios';
import router from '../router/router.js'
import {
  Message, MessageBox
} from 'element-ui';
import store from '../store';

const roots=process.env.API_ROOT
// 创建axios实例
const service = axios.create({
  baseURL: roots, // api的base_url
  timeout: 50000, // 请求超时时间
  withCredentials: true
});
service.defaults.withCredentials = true;
// request拦截器(axios请求拦截器)
service.interceptors.request.use(config => {
  // Do something before request is sent
  console.log(config)
  if (store.getters.token) {
    config.headers['Authorization'] = 111; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改,看后台能否获取
  }
  return config;
}, error => {
  // Do something with request error
  console.log(error); // for debug
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
    if(res.login_status=='0'){
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        store.dispatch('logOut').then(() => {
           router.push({
            path: '/login'
          })
          //location.reload(); // 为了重新实例化vue-router对象 避免bug
        });
      })
      return Promise.reject('error');
    }else if(res.msg==10){
      MessageBox.confirm('您的账号已被冻结', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{})
    }else if(res.account_status==0){
       MessageBox.confirm('您的账号还未审核', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        router.push('/vipMessage')
      }).catch(error=>{
         router.push('/vipMessage')
      })
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
