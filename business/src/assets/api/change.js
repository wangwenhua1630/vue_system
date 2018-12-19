import fetch from '../until/fetch';
var qs = require('qs');
export function loginChange(account, password,newPassword) {
	const data = qs.stringify({
    	account,
    	password,
    	newPassword
    });
    return fetch({
    	url: '/sd-web/register_mer/changePassword',
    	method: 'post',
    	data
    });  		
}
export function payChange(account,password,pay,newPay) {
	const data = qs.stringify({
    	account,
    	password,
    	pay,
    	newPay
    });
    return fetch({
    	url: '/sd-web/register_mer/addPayPassword',
    	method: 'post',
    	data
    });  		
}