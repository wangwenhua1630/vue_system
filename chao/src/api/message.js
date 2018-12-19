import fetch from '../until/fetch';
var qs = require('qs');
// 发布公告信息列表
export function messageList(flag,minCreateAt,maxCreateAt,currentPage,size) {
	const data = qs.stringify({
    	flag,minCreateAt,maxCreateAt,currentPage,size
    });
    return fetch({
    	url: '/sd_admin/admin/affiche/list',
    	method: 'post',
    	data
    });  		
}
// 信息详情
export function Listinfo(id) {
	const data = qs.stringify({
    	id
    });
    return fetch({
    	url: '/sd_admin/admin/affiche/get',
    	method: 'post',
    	data
    });  		
}
// 删除信息
export function delList(id,pay) {
	const data = qs.stringify({
    	id,pay
    });
    return fetch({
    	url: '/sd_admin/admin/affiche/delete',
    	method: 'post',
    	data
    });  		
}
// 发送信息
export function sendList(title,content,flag) {
	const data = qs.stringify({
    	title,content,flag
    });
    return fetch({
    	url: '/sd_admin/admin/affiche/send/msg',
    	method: 'post',
    	data
    });  		
}


// 商家超管信息查询
export function businessList(account,minCreateAt,maxCreateAt,currentPage,size,flag) {
    const data = qs.stringify({
       account,minCreateAt,maxCreateAt,currentPage,size,flag
    });
    return fetch({
        url: '/sd_admin/admin/merchant/message/list',
        method: 'post',
        data
    });         
}
// 商家超管投诉信息查询
export function businessTou(account,identifying,minCreateAt,maxCreateAt,currentPage,size) {
    const data = qs.stringify({
       account,identifying,minCreateAt,maxCreateAt,currentPage,size
    });
    return fetch({
        url: '/sd_admin/admin/merchant/message/list/complain',
        method: 'post',
        data
    });         
}
// 任务转接
export function businessZhuans(ids,adminId) {
    const data = {
       ids,adminId
    };
    return fetch({
        url: '/sd_admin/admin/merchant/message/transfer/user',
        method: 'post',
        data
    });         
}
// 商家投诉处理
export function businessResove(msgId,flag,pay) {
    const data = qs.stringify({
       msgId,flag,pay
    });
    return fetch({
        url: '/sd_admin/admin/merchant/message/complain',
        method: 'post',
        data
    });         
}
// 商家转账信息查询
export function businessZhuanList(account,type,minCreateAt,maxCreateAt,currentPage,size) {
    const data = qs.stringify({
       account,type,minCreateAt,maxCreateAt,currentPage,size
    });
    return fetch({
        url: '/sd_admin/admin/merchant/message/list/transfer',
        method: 'post',
        data
    });         
}
// 处理刷手已退款
export function businessTui(msgId,flag,pay) {
    const data = qs.stringify({
       msgId,flag,pay
    });
    return fetch({
        url: '/sd_admin/admin/merchant/message/again/refund/money',
        method: 'post',
        data
    });         
}
// 处理商家重新转账
export function businessAain(msgId,operPassword,pay) {
    const data = qs.stringify({
       msgId,operPassword,pay
    });
    return fetch({
        url: '/sd_admin/admin/merchant/message/again/transfer',
        method: 'post',
        data
    });         
}
// *****商家信息列表
export function businessMuchList(account,minCreateAt,maxCreateAt,currentPage,size,flag) {
    const data = qs.stringify({
       account,minCreateAt,maxCreateAt,currentPage,size,flag
    });
    return fetch({
        url: '/sd_admin/admin/merchant/message/list',
        method: 'post',
        data
    });         
}
// 商家单量调整
export function businessDanchange(msgId,operPassword,flag,cause) {
    const data = qs.stringify({
       msgId,operPassword,flag,cause
    });
    return fetch({
        url: '/sd_admin/admin/merchant/message/change/num',
        method: 'post',
        data
    });         
}
// 商家保证金充值
export function businessBaoChong(msgId,operPassword) {
    const data = qs.stringify({
       msgId,operPassword
    });
    return fetch({
        url: '/sd_admin/admin/merchant/message/add/deposit',
        method: 'post',
        data
    });         
}
// 商家保证金退款
export function businessBaoTui(msgId,operPassword) {
    const data = qs.stringify({
       msgId,operPassword
    });
    return fetch({
        url: '/sd_admin/admin/merchant/message/retreat/deposit',
        method: 'post',
        data
    });         
}
// 商家充值
export function businessAddmoney(msgId,operPassword) {
    const data = qs.stringify({
       msgId,operPassword
    });
    return fetch({
        url: '/sd_admin/admin/merchant/message/add/money',
        method: 'post',
        data
    });         
}
// 商家店铺审核
export function businessStorehe(msgId,operPassword,flag,cause) {
    const data = qs.stringify({
       msgId,operPassword,flag,cause
    });
    return fetch({
        url: '/sd_admin/admin/merchant/message/info/audit',
        method: 'post',
        data
    });         
}
// 商家店铺审核详情
export function businessStoreInfo(id) {
    const data = qs.stringify({
       id
    });
    return fetch({
        url: '/sd_admin/admin/merchant/message/store/id',
        method: 'post',
        data
    });         
}

// 刷手投诉信息查询
export function handTou(minCreateAt,maxCreateAt,currentPage,size) {
    const data = qs.stringify({
       minCreateAt,maxCreateAt,currentPage,size
    });
    return fetch({
        url: '/sd_admin/admin/hand/message/error',
        method: 'post',
        data
    });         
}
// 刷手转账信息查询
export function handZhuan(account,type,minCreateAt,maxCreateAt,currentPage,size) {
    const data = qs.stringify({
      account,type,minCreateAt,maxCreateAt,currentPage,size
    });
    return fetch({
        url: '/sd_admin/admin/hand/message/transfer/problem',
        method: 'post',
        data
    });         
}
// 刷手佣金未转账
export function handYong(id,flag,pay) {
    const data = qs.stringify({
      id,flag,pay
    });
    return fetch({
        url: '/sd_admin/admin/hand/message/admin/not/transfer',
        method: 'post',
        data
    });         
}
// 刷手商家未转账
export function handStore(id,flag,pay) {
    const data = qs.stringify({
      id,flag,pay
    });
    return fetch({
        url: '/sd_admin/admin/hand/message/merchant/not/transfer',
        method: 'post',
        data
    });         
}
// 刷手无法体现
export function handTi(id,adminContent,pay) {
    const data = qs.stringify({
      id,adminContent,pay
    });
    return fetch({
        url: '/sd_admin/admin/hand/message/withdraw/deposit',
        method: 'post',
        data
    });         
}
// 刷手多退少补
export function handBu(id,flag,pay) {
    const data = qs.stringify({
      id,flag,pay
    });
    return fetch({
        url: '/sd_admin/admin/hand/message/consent/transfer',
        method: 'post',
        data
    });         
}
// 刷手保证金信息查询
export function handBaolist(account,type,minCreateAt,maxCreateAt,currentPage,size) {
    const data = qs.stringify({
      account,type,minCreateAt,maxCreateAt,currentPage,size
    });
    return fetch({
        url: '/sd_admin/admin/hand/message/list',
        method: 'post',
        data
    });         
}
// 刷手退保证金
export function handBaoTui(type,flag,id,pay) {
    const data = qs.stringify({
      type,flag,id,pay
    });
    return fetch({
        url: '/sd_admin/admin/hand/message/consent',
        method: 'post',
        data
    });         
}
// 刷手保证金转接
export function handBaoJie(adminId,ids) {
    const data = {
      adminId,ids
    };
    return fetch({
        url: '/sd_admin/admin/hand/message/transfer/user',
        method: 'post',
        data
    });         
}