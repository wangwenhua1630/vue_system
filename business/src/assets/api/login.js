 import fetch from '../until/fetch';
var qs = require('qs');
export function beforeLog() {
    return fetch({
        url: '/sd-web/authentication',
        method: 'get',
    });         
}
export function login(account, password,flag) {
	const data = qs.stringify({
    	account,
    	password,
    	flag
    });
    return fetch({
    	url: '/sd-web/merchant/login',
    	method: 'post',
    	data
    });  		
}
export function logOut() {
    return fetch({
        url: '/sd-web/logout',
        method: 'get',
    });         
}
export function logYan(account) {
    const data = qs.stringify({
        account,
    });
    return fetch({
        url: '/sd-web/register_mer/code',
        method: 'post',
        data
    });         
}


export function register(account,password,authCode){
    const data = qs.stringify({
        account,
        password,
        authCode
    });
    return fetch({
        url: '/sd-web/register_mer/ins_mer',
        method: 'post',
        data
    });         
}