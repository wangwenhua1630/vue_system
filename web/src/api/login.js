 import fetch from '../util/fetch';
var qs = require('qs');
// 注册之前，推荐人id
export function register_rules() {
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Login/register_rules',
        method: 'post'
    });         
}
// 注册
export function register(key,phone_codes,phone,password) {
    const data = qs.stringify({
       key,
       phone_codes,
       phone,
       password
    });
    return fetch({
    	url: '/bozhi_handphp/index.php?s=/Little/Login/user_register',
    	method: 'post',
        data
    });  		
}
// 短信验证码
export function register_key(type,phone,phone_codes) {
    const data =qs.stringify({
       type,
       phone,
       phone_codes,
    });
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Login/user_checks',
        method: 'post',
        data
    });         
}
// 登录
export function login(phone,password) {
    const data = qs.stringify({
       phone,
       password
    });
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Login/user_login',
        method: 'post',
        data
    });         
}
// 忘记密码
export function user_find(key,phone,password) {
    const data = qs.stringify({
       key,
       phone,
       password
    });
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Login/user_find',
        method: 'post',
        data
    });         
}
// 检查登录
export function check_login() {
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Login/check_login',
        method: 'post'
    });         
}
// 退出登录
export function login_out() {
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Login/user_out',
        method: 'post'
    });         
}
