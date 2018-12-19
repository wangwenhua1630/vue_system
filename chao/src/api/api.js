 import fetch from '../until/fetch';
var qs = require('qs');
//  首页参数
export function homeMessage() {
    return fetch({
    	url: '/sd_admin/admin/home/page/count',
    	method: 'get'
    });
}

// 任务管理
export function taskList(
		taskType,
    	handTaskStatus,
    handStatus,
    	idNum,
    	orderId,
    	goodNickname,
    	minBeginAt,
    	maxBeginAt,
    	account,
    	storeName,
        handAccount,
    handTaoAccount,
    	flag,
    	currentPage,
    	size){
	const data = qs.stringify({
    	taskType,
    	handTaskStatus,
    handStatus,
    	idNum,
    	orderId,
    	goodNickname,
    	minBeginAt,
    	maxBeginAt,
    	account,
    	storeName,
        handAccount,
    handTaoAccount,
    	flag,
    	currentPage,
    	size
    });
    return fetch({
    	url: '/sd_admin/admin/task/list',
    	method: 'post',
    	data
    });
}
//买号详情
 export function maiList(id,handDetailId){
    const data=qs.stringify({
      id,handDetailId
    })
   return fetch({
     url: '/sd_admin/handInfo/get/handInfo?id='+id+'&handDetailId='+handDetailId,
     // method: 'post',
     // data
   })
 }
 //选择多个或全部取消发布
 export function cancelFabu(type,ids,pay,handTaskStatus,account){
   const data ={
     type,ids,pay,handTaskStatus,account
   } ;
   return fetch({
     url: '/sd_admin/admin/task/put/handTaskStatus',
     method: 'post',
     data
   });
 }
 // 取消发布
 export function cancelTask(
   id,
   pay
 ) {
   const data = qs.stringify({
     id,
     pay
   });
   return fetch({
     url: '/sd_admin/admin/task/cancelTask',
     method: 'post',
     data
   });
 }
 //下载
 export function down(
   taskType,
   handTaskStatus,
   idNum,
   orderId,
   goodNickname,
   minBeginAt,
   maxBeginAt,
   account,
   storeName,
   handAccount,
   handTaoAccount,
   flag,
   currentPage,
   size){
   const data = qs.stringify({
     taskType,
     handTaskStatus,
     idNum,
     orderId,
     goodNickname,
     minBeginAt,
     maxBeginAt,
     account,
     storeName,
     handAccount,
     handTaoAccount,
     flag,
     currentPage,
     size
   });
   return fetch({
     url: '/sd_admin/admin/task/export',
     method: 'post',
     data
   });
 }
// 删除任务
export function taskDel(id,operPassword) {
	const data = qs.stringify({
    	id,
    	operPassword
    });
    return fetch({
    	url: '/sd_admin/admin/task/delete',
    	method: 'post',
    	data
    });
}
// 暂停任务
export function taskStope(id,operPassword) {
	const data = qs.stringify({
    	id,
    	operPassword
    });
    return fetch({
    	url: '/sd_admin/admin/task/stop/id',
    	method: 'post',
    	data
    });
}
// 报错任务查看
export function taskCuo(id) {
    const data = qs.stringify({
        id
    });
    return fetch({
        url: '/sd_admin/admin/task/mistake/logs',
        method: 'post',
        data
    });
}

// 任务评价管理
export function commentList(
      handStatus,
    	idNum,
    	orderId,
    	goodNickname,
    	minBeginAt,
    	maxBeginAt,
    	goodStatus,
    	addStatus,
    	account,
    	storeName,
    	handAccount,
    	flag,
    	currentPage,
    	size){
	const data = qs.stringify({
      handStatus,
    	idNum,
    	orderId,
    	goodNickname,
    	minBeginAt,
    	maxBeginAt,
    	goodStatus,
    	addStatus,
    	account,
    	storeName,
    	flag,
    	currentPage,
    	size
    });
    return fetch({
    	url: '/sd_admin/admin/task/evaluate/list',
    	method: 'post',
    	data
    });
}
 //查看图片
 export function kanImg(id,status){
   const data=qs.stringify({
     id,status
   });
   return fetch({
     url:'/sd_admin/admin/task/evaluate/pic',
     method:'post',
     data
   })}
//时间格式
 export function formatDate(dates){
   var result=[];
   result[0]=dates.getFullYear();  //得到年份
   result[1]=dates.getMonth()+1;   //得到月份
   result[1]<10&&(result[1]="0"+result[1]);
   result[2]=dates.getDate();       //得到日期
   result[2]<10&&(result[2]="0"+result[2]);
   result[3]=dates.getHours();    //得到小时
   result[3]<10&&(result[3]="0"+result[3]);
   result[4]=dates.getMinutes();   //得到分钟
   result[4]<10&&(result[4]="0"+result[4]);
   result[5]=dates.getSeconds();    //得到秒
   result[5]<10&&(result[5]="0"+result[5]);
   result=result.join("");
   var reg=/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
   return result.replace(reg,"$1-$2-$3 $4:$5:$6");
 };


// 查询管理员角色
export function allUser(roleId,realName,username,currentPage,size) {
	const data = qs.stringify({
    	roleId,
    	realName,
    	username,
    	currentPage,
    	size
    });
    return fetch({
    	url: '/sd_admin/admin/all/user',
    	method: 'post',
    	data
    });
}
// 角色列表
export function role() {
    return fetch({
    	url: '/sd_admin/admin/roles',
    	method: 'get',
    });
}
// 删除角色
export function deleateUser(id,operPassword) {
	const data = qs.stringify({
    	id,
    	operPassword
    });
    return fetch({
    	url: '/sd_admin/admin/delete/user',
    	method: 'post',
    	data
    });
}
// 添加角色成员
export function addRole(roleId,realName,username,password,operPassword) {
	const data = qs.stringify({
    	roleId,
    	realName,
    	username,
    	password,
    	operPassword
    });
    return fetch({
    	url: '/sd_admin/admin/save/user',
    	method: 'post',
    	data
    });
}


// 查询支付宝，银行卡，修改记录
export function changeSearch(currentPage,size) {
    const data = qs.stringify({
        currentPage,size
    });
    return fetch({
        url: '/sd_admin/admin/account',
        method: 'post',
        data
    });
}

// 添加支付宝信息
export function alipay(id,alipayAccount,alipayNickname,pay) {
    const data = qs.stringify({
        id,
        alipayAccount,
        alipayNickname,
        pay
    });
    return fetch({
        url: '/sd_admin/admin/alipay',
        method: 'post',
        data
    });
}

// 添加银行信息
export function addBank(id,bankType,bankCard,bankSubBranch,bankAccountName,bankIdCard,bankPhone,pay) {
    const data = qs.stringify({
        id,
        bankType,
        bankCard,
        bankSubBranch,
        bankAccountName,
        bankIdCard,
        bankPhone,
        pay
    });
    return fetch({
        url: '/sd_admin/admin/bank',
        method: 'post',
        data
    });
}


// 平台资金流水
export function superWater(account,waterStatus,waterType,inCome,minCreateAt,maxCreateAt,currentPage,size) {
    const data = qs.stringify({
        account,waterStatus,waterType,inCome,minCreateAt,maxCreateAt,currentPage,size
    });
    return fetch({
        url: '/sd_admin/admin/water',
        method: 'post',
        data
    });
}
// 平台资金流水收支情况
export function superWaters() {
    return fetch({
        url: '/sd_admin/admin/status',
        method: 'post'
    });
}
// 商家资金流水
export function bussinessWater(account,minCreateAt,maxCreateAt,currentPage,size) {
    const data = qs.stringify({
        account,minCreateAt,maxCreateAt,currentPage,size
    });
    return fetch({
        url: '/sd_admin/admin/capital/merchant/water',
        method: 'post',
        data
    });
}
// 刷手资金流水
export function handWater(account,minCreateAt,maxCreateAt,currentPage,size) {
    const data = qs.stringify({
        account,minCreateAt,maxCreateAt,currentPage,size
    });
    return fetch({
        url: '/sd_admin/admin/capital/hand/money',
        method: 'post',
        data
    });
}


// 查询所有的转账信息列表
export function findAllTransfer(transferType,transferStatus,idNum,minClosingAt,maxClosingAt,currentPage,size) {
    const data = qs.stringify({
        transferType,transferStatus,idNum,minClosingAt,maxClosingAt,currentPage,size
    });
    return fetch({
        url: '/sd_admin/admin/capital/findAllTransfer',
        method: 'post',
        data
    });
}
// 上传图片
export function uploadImg(id,file) {
    const data = qs.stringify({
        id,file
    });
    return fetch({
        url: '/sd_admin/admin/capital/upload/img',
        method: 'post',
        data
    });
}

// 一键转账成功
export function transferSuccess(transferStatus,flag,ids,pay,causeFailure) {
    const data ={
        transferStatus,flag,ids,pay,causeFailure
    };
    return fetch({
        url: '/sd_admin/admin/capital/transferSuccess',
        method: 'post',
        data
    });
}


// 未到账反馈，失败原因
export function transferError(id,prolem,pay) {
    const data =qs.stringify({
        id,prolem,pay
    });
    return fetch({
        url: '/sd_admin/admin/capital/transfer/no',
        method: 'post',
        data
    });
}



// 个人资料显示
export function mainInfo() {
    return fetch({
        url: '/sd_admin/admin/current/user',
        method: 'post',
    });
}
// 修改登录密码
export function loginPassword(username,password,newPassword) {
    const data =qs.stringify({
        username,password,newPassword
    });
    return fetch({
        url: '/sd_admin/admin/password',
        method: 'post',
        data
    });
}
// 修改操作密码
export function caoPassword(username,password,operPassword,newOperPassword) {
    const data =qs.stringify({
        username,password,operPassword,newOperPassword
    });
    return fetch({
        url: '/sd_admin/admin/operpassword',
        method: 'post',
        data
    });
}
