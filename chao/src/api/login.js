 import fetch from '../until/fetch';
var qs = require('qs');
export function login(username, password) {
	const data = qs.stringify({
    	username,
    	password
    });
    return fetch({
    	url: '/sd_admin/admin/login',
    	method: 'post',
    	data
    });  		
}

// 退出登录
export function logOut() {
    return fetch({
    	url: '/sd_admin/logout',
    	method: 'get'
    });  		
}