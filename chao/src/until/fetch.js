import axios from 'axios';
import {
  Message, MessageBox
} from 'element-ui';
import router from '../router/router.js'
import store from '../store';

// 创建axios实例
const roots=process.env.API_ROOT
const service = axios.create({
  baseURL:roots, // api的base_url
  timeout: 50000 // 请求超时时间
});
service.defaults.withCredentials = true;
// request拦截器(axios请求拦截器)
service.interceptors.request.use(config => {

  // Do something before request is sent
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
    if(response.data.permission==0){
      MessageBox.alert('您没有操作权限', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        // store.dispatch('logOut').then(() => {
        //   location.reload(); // 为了重新实例化vue-router对象 避免bug
        // });
      })
      return Promise.reject('error');
    }else if(response.data.loginStatus==0){
       MessageBox.confirm('您已被登出', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        router.push('/login')
      })
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
