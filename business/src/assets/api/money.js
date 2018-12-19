import fetch from '../until/fetch';
var qs = require('qs');
// 修改支付宝昵称
export function zhiName(
       alipayName
    ) {
    const data = qs.stringify({
        alipayName
    });
    return fetch({
        url: '/sd-web/account/changeAlipayName',
        method: 'post',
        data
    });         
}
// 页面数据
export function moneys(){
	 return fetch({
        url: '/sd-web/account/findBusinessAccountByUserId',
        method: 'get'
    }); 
}
// 充值
export function recharge(
      deposit,
      voucherPic,
      pay
    ) {
    const data = qs.stringify({
          deposit,
	      voucherPic,
	      pay
    });
    return fetch({
        url: '/sd-web/account/recharge',
        method: 'post',
        data
    });         
}
// 退款
export function tui(pay){
	 const data = qs.stringify({
	      pay
    });
    return fetch({
        url: '/sd-web/account/refund',
        method: 'post',
        data
    });    
}
// 兑换发布点
export function exchange(money,type,pay){
	const data = qs.stringify({
	      money,type,pay
    });
    return fetch({
        url: '/sd-web/account/issueExchange',
        method: 'post',
        data
    });  
}
// 转账信息
export function zhuan(currentPage,size,transferStatus,idNum,minClosingAt,maxClosingAt){
    const data = qs.stringify({
          currentPage,size,transferStatus,idNum,minClosingAt,maxClosingAt
    });
    return fetch({
        url: '/sd-web/capital/findAllTransfer',
        method: 'post',
        data
    });  
}
// 转账成功、失败
export function zhuanStatus(transferStatus,flag,ids,pay,causeFailure){
     const data ={
          transferStatus,flag,ids,pay,causeFailure
    };
    return fetch({
        url: '/sd-web/capital/transferSuccess',
        method: 'post',
        data
    });  
}
// 资金流水
export function waterList(currentPage,size,minCreateAt,maxCreateAt,capitalType,idNum){
     const data =qs.stringify({
         currentPage,size,minCreateAt,maxCreateAt,capitalType,idNum
    });
    return fetch({
        url: '/sd-web/capital/waterList',
        method: 'post',
        data
    });  
}
// 消费详情
export function consumptionDetails(currentPage,size,minPayAt,maxPayAt){
     const data = qs.stringify({
        currentPage,size,minPayAt,maxPayAt
    });
    return fetch({
        url: '/sd-web/capital/consumptionDetails',
        method: 'post',
        data
    });  
}
// 客服介入
export function customerServiceIn(id,handProblem,transferPic){
     const data = qs.stringify({
        id,handProblem,transferPic
    });
    return fetch({
        url: '/sd-web/capital/customerServiceIn',
        method: 'post',
        data
    });  
}
// 未到账反馈，上传凭证
export function transferNotarize(id,transferPic){
     const data = qs.stringify({
        id,transferPic
    });
    return fetch({
        url: '/sd-web/capital/transferNotarize',
        method: 'post',
        data
    });  
}
