import fetch from '../until/fetch';
var qs = require('qs');
// 刷手管理列表
export function manage(handLevel,account,smallDay,bigDay,status,complainStatus,currentPage,size) {
	const data = qs.stringify({
    	handLevel,account,smallDay,bigDay,status,complainStatus,currentPage,size
    });
    return fetch({
    	url: '/sd_admin/admin/hand/list/manage',
    	method: 'post',
    	data
    });  		
}
// 刷手等级查询
export function grade() {
    return fetch({
    	url: '/sd_admin/admin/hand/grade',
    	method: 'post'
    });  		
}
// 批量冻结账号
export function cold(ids,flag,pay) {
	const data = {
    	ids,flag,pay
    };
    return fetch({
    	url: '/sd_admin/admin/hand/cold',
    	method: 'post',
    	data
    });  		
}
// 发送私信
export function messages(id,content,title) {
	const data = qs.stringify({
    	id,content,title
    });
    return fetch({
    	url: '/sd_admin/admin/hand/send/message',
    	method: 'post',
    	data
    });  		
}
// 查询任务转介列表
export function admins() {
    return fetch({
    	url: '/sd_admin/admin/hand/transfer/admin',
    	method: 'post'
    });  		
}
// 刷手审核列表
export function audit(flag,account,status,minCreateAt,maxCreateAt,currentPage,size) {
	const data = qs.stringify({
    	flag,account,status,minCreateAt,maxCreateAt,currentPage,size
    });
    return fetch({
    	url: '/sd_admin/admin/hand/list/audit',
    	method: 'post',
    	data
    });  		
}
// 刷手通过审核
export function handSuceess(ids,flag,pay,cause) {
	const data ={
    	ids,flag,pay,cause
    };
    return fetch({
    	url: '/sd_admin/admin/hand/admin/audit',
    	method: 'post',
    	data
    });  		
}
// 刷手转介客服
export function handZhuan(ids,adminId) {
	const data ={
    	ids,adminId
    };
    return fetch({
    	url: '/sd_admin/admin/hand/transfer',
    	method: 'post',
    	data
    });  		
}
// 刷手删除
export function handDels(id,pay) {
    const data =qs.stringify({
        id,pay
    });
    return fetch({
        url: '/sd_admin/admin/hand/delete',
        method: 'post',
        data
    });         
}
// =====================商家
// 商家管理删除
export function businessDels(id,pay) {
    const data =qs.stringify({
        id,pay
    });
    return fetch({
        url: '/sd_admin/admin/merchant/delete',
        method: 'post',
        data
    });         
}
// 商家管理列表
export function businessList(account,minCreateAt,maxCreateAt,maxCommission,accountMoney,num,minNumDate,maxNumDate,currentPage,size){
	const data = qs.stringify({
    	account,minCreateAt,maxCreateAt,maxCommission,accountMoney,num,minNumDate,maxNumDate,currentPage,size
    });
    return fetch({
    	url: '/sd_admin/admin/merchant/manage/info',
    	method: 'post',
    	data
    });  		
}
// 批量冻结账号
export function businesscold(merchantIds,flag,operPassword) {
	const data = {
    	merchantIds,flag,operPassword
    };
    return fetch({
    	url: '/sd_admin/admin/merchant/manage/status',
    	method: 'post',
    	data
    });  		
}
// 发送私信
export function businessmessages(jieId,content,title) {
	const data = qs.stringify({
    	jieId,content,title
    });
    return fetch({
    	url: '/sd_admin/admin/merchant/manage/private/message',
    	method: 'post',
    	data
    });  		
}
// 调整单量
export function businessnum(storeId,numId,pay) {
	const data = qs.stringify({
    	storeId,numId,pay
    });
    return fetch({
    	url: '/sd_admin/admin/merchant/manage/store/num',
    	method: 'post',
    	data
    });  		
}
// 调整单量查询
export function businessdan(merchantId) {
	const data = qs.stringify({
    	merchantId
    });
    return fetch({
    	url: '/sd_admin/admin/merchant/store/userId',
    	method: 'post',
    	data
    });  		
}
// 商家店铺资料
export function businessInfo(merchantId,flag) {
	const data = qs.stringify({
    	merchantId,flag
    });
    return fetch({
    	url: '/sd_admin/admin/merchant/manage/account/store',
    	method: 'post',
    	data
    });  		
}
// 商家审核列表
export function businessInfomerchant(account,signStatus,mixCreateAt,maxCreateAt,currentPage,size) {
	const data = qs.stringify({
    	account,signStatus,mixCreateAt,maxCreateAt,currentPage,size
    });
    return fetch({
    	url: '/sd_admin/admin/merchant/list',
    	method: 'post',
    	data
    });  		
}
// 批量审核商家信息
export function businessHe(ids,status,operPassword,cause) {
    const data ={
       ids,status,operPassword,cause
    };
    return fetch({
        url: '/sd_admin/admin/merchant/list/audit',
        method: 'post',
        data
    });         
}
// 查询任务转介列表
export function businessadmins() {
    return fetch({
        url: '/sd_admin/admin/merchant/transfer/admin',
        method: 'post'
    });         
}
// 商家转介客服
export function businessZhuan(ids,adminId) {
    const data ={
        ids,adminId
    };
    return fetch({
        url: '/sd_admin/admin/merchant/transfer',
        method: 'post',
        data
    });         
}
//刷手多刷手管理
export function accounts(currentPage,size,status,accountType,handAccount,minCreateAt,maxCreateAt) {
  const data =qs.stringify({
    currentPage,size,status,accountType,handAccount,minCreateAt,maxCreateAt
  });
  return fetch({
    url: '/sd_admin/admin/hand/details',
    method: 'post',
    data
  });
}
//刷手多刷手管理审核
export function accountsShen(id,status,pay,cause) {
  const data =qs.stringify({
    id,status,pay,cause
  });
  return fetch({
    url: '/sd_admin/admin/hand/put/detailStatus',
    method: 'post',
    data
  });
}
//刷手多刷手管理资料查询审核
export function accountsCha(id) {
  const data =qs.stringify({
    id
  });
  return fetch({
    url: '/sd_admin/admin/hand/detail/id',
    method: 'post',
    data
  });
}
