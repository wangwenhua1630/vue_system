import fetch from '../until/fetch';
var qs = require('qs');

// 任务处罚列表
export function fa( 
		  currentPage,
		  size,
          problemIdentifying,
	      idNum,
	      orderId,
	      workOtherStatus){
	const data = qs.stringify({
		  currentPage,
		  size,
          problemIdentifying,
	      idNum,
	      orderId,
	      workOtherStatus
    });
    return fetch({
        url: '/sd-web/workOther/findPunishList',
        method: 'post',
        data
    });    
}
// 任务处罚列表详情
export function findMsgById( 
		 id){
	const data = qs.stringify({
		 id
    });
    return fetch({
        url: '/sd-web/workOther/findMsgById',
        method: 'post',
        data
    });    
}
// 多退少补列表
export function tuiBu( 
		  currentPage,
		  size,
	      idNum,
	      orderId,
	      workOtherStatus,
	      minCreateAt,
	      maxCreateAt){
	const data = qs.stringify({
		  currentPage,
		  size,
	      idNum,
	      orderId,
	      workOtherStatus,
	      minCreateAt,
	      maxCreateAt
    });
    return fetch({
        url: '/sd-web/workOther/findOrRefundedList',
        method: 'post',
        data
    });    
}
// 同意或者拒绝
export function consentOrRefusal( 
		 id,
		 workOtherStatus,
		 refuseDispose,
		 merchantPic){
	const data = qs.stringify({
		 id,
		 workOtherStatus,
		 refuseDispose,
		 merchantPic
    });
    return fetch({
        url: '/sd-web/workOther/consentOrRefusal',
        method: 'post',
        data
    });    
}
// 上传凭证
export function uploadMerchantPic( 
		 id,
		 merchantPic){
	const data = qs.stringify({
		 id,
		 merchantPic
    });
    return fetch({
        url: '/sd-web/workOther/uploadMerchantPic',
        method: 'post',
        data
    });    
}