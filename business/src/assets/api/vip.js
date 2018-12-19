import fetch from '../until/fetch';
var qs = require('qs');
export function vipMessagess(
    nature,
    type,
    name,
    tbAccount,
    categoryId,
    tbkOpenState,
    nctbOpenState,
    shippersName,
    shippersPhone,
    shippersCity,
    shippersProvince,
    shippersDistrict,
    shippersAddress,
    deposit,
    bankType,
    subBranchName,
    bankCard,
    bankName,
    idCard,
    bankPhone,
    alipayAccount,
    alipayName,
    cardFront,
    cardReverse,
    storeStaffPic,
    storeHomePic,
    pay,
    accountId
    ) {
	const data = qs.stringify({
    	nature,
        type,
        name,
        tbAccount,
        categoryId,
        tbkOpenState,
        nctbOpenState,
        shippersName,
        shippersPhone,
        shippersCity,
        shippersProvince,
        shippersDistrict,
        shippersAddress,
        deposit,
        bankType,
        subBranchName,
        bankCard,
        bankName,
        idCard,
        bankPhone,
        alipayAccount,
        alipayName,
        cardFront,
        cardReverse,
        storeStaffPic,
        storeHomePic,
        pay,
        accountId
    });
    return fetch({
    	url: '/sd-web/store/addStoreInfo',
    	method: 'post',
    	data
    });  		
}
export function vipBank(
    bankType,
    subBranchName,
    bankCard,
    bankName,
    idCard,
    bankPhone
    ) {
    const data = qs.stringify({
        bankType,
        subBranchName,
        bankCard,
        bankName,
        idCard,
        bankPhone,
    });
    return fetch({
        url: '/sd-web/account/changeBankInfo',
        method: 'post',
        data
    });         
}
export function vipZhi(
        account,
        password,
        pay,
        newPay,
    ) {
    const data = qs.stringify({
        account,
        password,
        pay,
        newPay,
    });
    return fetch({
        url: '/sd-web/register_mer/addPayPassword',
        method: 'post',
        data
    });         
}
// 资料审核状态
export function vipStatus(
    ) {
    return fetch({
        url: '/sd-web/account/findAccountStatus',
        method: 'post'
    });         
}
// 改支付宝信息
export function vipZhiChange(
        alipayAccount,
        alipayName,
    ) {
    const data = qs.stringify({
        alipayAccount,
        alipayName,
    });
    return fetch({
        url: '/sd-web/account/changeAlipayInfo',
        method: 'post',
        data
    });         
}
// 店铺列表
export function storeList(){
    return fetch({
        url: '/sd-web/store/findAllByUserId',
        method: 'post'
    });  
}
// 店铺列表1
export function storeLists(){
    return fetch({
        url: '/sd-web/store/findStoreNotDel',
        method: 'post'
    });  
}
// 商品列表
export function prodeuceList(goodId,storeId,goodName,currentPage,size){
    const data = qs.stringify({
        goodId,
        storeId,
        goodName,
        currentPage,
        size
    });
    return fetch({
        url: '/sd-web/goods/findAllGoodsLike',
        method: 'post',
        data
    });  
}
// 添加商品
export function addGoods(storeId,goodId,url,goodName,goodNickname,img,mobileImg){
    const data = qs.stringify({
        storeId,
        goodId,
        url,
        goodName,
        goodNickname,
        img,
        mobileImg
    });
    return fetch({
        url: '/sd-web/goods/addGoods',
        method: 'post',
        data
    });  
}
// 删除商品
export function prodeuceDel(ids){
    return fetch({
        url: '/sd-web/goods/deleteGoods',
        method: 'post',
        data:ids
    });  
}
// 调整单量
export function tiao(storeId,numId){
     const data = qs.stringify({
        storeId,
        numId
    });
    return fetch({
        url: '/sd-web/store/changeStoreNum',
        method: 'post',
        data
    });  
}
// 单量查询
export function danSearch(storeId,num,needMoney){
    return fetch({
        url: '/sd-web/store/findSysTaskNum',
        method: 'post'
    });  
}
// 修改发货地址
export function changeShipperInfo(id,shippersName,shippersPhone,shippersProvince,
        shippersCity,
        shippersDistrict,shippersAddress){
     const data = qs.stringify({
        id,shippersName,shippersPhone,shippersProvince,
        shippersCity,
        shippersDistrict,shippersAddress
    });
    return fetch({
        url: '/sd-web/store/changeShipperInfo',
        method: 'post',
        data
    });  
}
// 修改淘宝客推广状态
export function changeTbkOpenState(id,tbkOpenState){
     const data = qs.stringify({
        id,tbkOpenState
    });
    return fetch({
        url: '/sd-web/store/changeTbkOpenState',
        method: 'post',
        data
    });  
}
// 修改农村淘宝推广状态
export function changeNctbOpenState(id,nctbOpenState){
     const data = qs.stringify({
        id,nctbOpenState
    });
    return fetch({
        url: '/sd-web/store/changeNctbOpenState',
        method: 'post',
        data
    });  
}
// 修改店铺名称
export function changeStoreName(id,name){
     const data = qs.stringify({
        id,name
    });
    return fetch({
        url: '/sd-web/store/changeStoreName',
        method: 'post',
        data
    });  
}
// 店铺删除
export function deleteStore(id){
     const data = qs.stringify({
        id
    });
    return fetch({
        url: '/sd-web/store/deleteStore',
        method: 'post',
        data
    });  
}
// 增加店铺
export function addStore(
        nature,
        type,
        name,
        tbAccount,
        categoryId,
        tbkOpenState,
        nctbOpenState,
        shippersName,
        shippersPhone,
        shippersProvince,
        shippersCity,
        shippersDistrict,
        shippersAddress,
        storeStaffPic,
        storeHomePic
    ){
     const data =qs.stringify({
        nature,
        type,
        name,
        tbAccount,
        categoryId,
        tbkOpenState,
        nctbOpenState,
        shippersName,
        shippersPhone,
        shippersProvince,
        shippersCity,
        shippersDistrict,
        shippersAddress,
        storeStaffPic,
        storeHomePic
    });
    return fetch({
        url: '/sd-web/store/addStore',
        method: 'post',
        data
    });  
}
// 保证金退款
export function returnDeposit(pay){
     const data = qs.stringify({
        pay
    });
    return fetch({
        url: '/sd-web/account/returnDeposit',
        method: 'post',
        data
    });  
}


// 系统通知
export function noticMessage(flag,currentPage,size){
     const data = qs.stringify({
        flag,currentPage,size
    });
    return fetch({
        url: '/sd-web/message/list',
        method: 'post',
        data
    });  
}
// 系统通知详情
export function noticMessageget(id){
     const data = qs.stringify({
        id
    });
    return fetch({
        url: '/sd-web/message/get',
        method: 'post',
        data
    });  
}
// 店铺类目
export function storeLei(){
    return fetch({
        url: '/sd-web/store/category',
        method: 'post'
    });  
}
//授权
export function quanShou(id,message,qi) {
  const data = qs.stringify({
    id,message,qi
  });
  return fetch({
    url:'http://www.rwgh66.com/bozhi_handphp/index.php/Home/Taobao/info.html',
    method:'post',
    data
  })
}
