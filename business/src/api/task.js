import fetch from '../until/fetch';
var qs = require('qs');
// 未来7日单量
export function sevenDay(
       id
    ) {
    const data = qs.stringify({
       id
    });
    return fetch({
        url: '/sd-web/store/findNum',
        method: 'post',
        data
    });
}
// 查询满足发布条件
export function searchTask(){
    return fetch({
        url: '/sd-web/task/getMerchantStatus',
        method: 'post'
    });
}
// 查询店铺复购条件
export function searchReplay(){
    return fetch({
        url: '/sd-web/task/findCycleList',
        method: 'post'
    });
}
// 查询店铺复购人数
export function searchReplaynum(taskId,cycleId,flag){
  const data = qs.stringify({
       taskId,cycleId,flag
    });
    return fetch({
        url: '/sd-web/task/replay/user',
        method: 'post',
        data
    });
}
// 发布任务第一步
export function addTask(
  storeTypeId,
       storeId,
       goodId,
       taskType
    ) {
    const data = qs.stringify({
      storeTypeId,
       storeId,
       goodId,
       taskType
    });
    return fetch({
        url: '/sd-web/task/addTask',
        method: 'post',
        data
    });
}
// 发布任务第二步
export function saveTaskAndRequire(
       dto,
       require1,
       require2,
       require3,
       require4,
       require5
    ) {
    const data ={
       dto,
       require1,
       require2,
       require3,
       require4,
       require5
    };
    return fetch({
        url: '/sd-web/task/saveTaskAndRequire',
        method: 'post',
        data
    });
}
//发布任务第三步获取单任务佣金
export function getSingleMoneys(goodPrice){
  // const data=qs.stringify({
  //   goodPrice
  // })
  return fetch({
    url: '/sd-web/task/commission?goodPrice='+goodPrice,
  })
}
// 发布任务第三步
export function saveTaskAndPrice(
       task,
       costPrice,
       prices,
       // timingAt,
       beginTime,
       issueType,
       endTime,
       overTime
    ) {
    const data = {
       task,
       costPrice,
       prices,
       // timingAt,
       beginTime,
       issueType,
       endTime,
       overTime
    };
    return fetch({
        url: '/sd-web/task/saveTaskAndPrice',
        method: 'post',
        data
    });
}
// 发布任务第四步
export function saveTaskAndCondition(
       task,
       sex,
       age,
       province,
       city
    ) {
    const data = {
       task,
       sex,
       age,
       province,
       city
    };
    return fetch({
        url: '/sd-web/task/saveTaskAndCondition',
        method: 'post',
        data
    });
}
// 立即发布任务
export function issueNow(
      taskIdDto,
      pay
    ) {
    const data =qs.stringify({
      taskIdDto,
      pay
    }) ;
    return fetch({
        url: '/sd-web/task/issueNow',
        method: 'post',
        data
    });
}
//选择多个或全部取消发布
export function cancelFabu(type,ids,pay,handTaskStatus){
  const data ={
    type,ids,pay,handTaskStatus
  } ;
  return fetch({
    url: '/sd-web/task/put/handTaskStatus',
    method: 'post',
    data
  });
}
// 任务管理
export function findAllTaskByUserId(
	   currentPage,
       size,
       taskType,
       handStatus,
       handTaskStatus,
       idNum,
       orderId,
       goodNickname,
     handTaoAccount,
     handAccount,
     storeName,
       minBeginAt,
       maxBeginAt
    ) {
    const data = qs.stringify({
       currentPage,
       size,
       taskType,
      handStatus,
       handTaskStatus,
       idNum,
       orderId,
       goodNickname,
      handTaoAccount,
      handAccount,
      storeName,
       minBeginAt,
       maxBeginAt
    });
    return fetch({
        url: '/sd-web/task/findAllTaskByUserId',
        method: 'post',
        data
    });
}
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
//淘宝买号详情
export function maiList(id,handDetailId){
  const data=qs.stringify({
    id,handDetailId
  })
  return fetch({
    url: '/sd-web/handInfo/get/handInfo?id='+id+'&handDetailId='+handDetailId,
  })
}
//下载
export function down(
  currentPage,
  size,
  taskType,
  handTaskStatus,
  idNum,
  orderId,
  goodNickname,
  handTaoAccount,
  handAccount,
  storeName,
  minBeginAt,
  maxBeginAt
) {
  const data = qs.stringify({
    currentPage,
    size,
    taskType,
    handTaskStatus,
    idNum,
    orderId,
    goodNickname,
    handTaoAccount,
    handAccount,
    storeName,
    minBeginAt,
    maxBeginAt
  });
  return fetch({
    url: '/sd-web/task/export',
    method: 'post',
    data
  });
}
// 取消发布
export function cancelTask(
	   handTaskIdDto,
       pay
    ) {
    const data = qs.stringify({
       handTaskIdDto,
       pay
    });
    return fetch({
        url: '/sd-web/task/cancelTask',
        method: 'post',
        data
    });
}
// 任务报错查看
export function taskCuo(
     id
    ) {
    const data = qs.stringify({
       id
    });
    return fetch({
        url: '/sd-web/task/mistake/logs',
        method: 'post',
        data
    });
}
// 任务评价管理
export function findHandTaskInfo(
	   currentPage,
       size,
        handStatus,
       idNum,
       orderId,
       goodNickname,
       minBeginAt,
       maxBeginAt,
       goodStatus,
       addStatus
    ) {
    const data = qs.stringify({
       currentPage,
       size,
       idNum,
       orderId,
       goodNickname,
       minBeginAt,
       maxBeginAt,
       goodStatus,
       addStatus
    });
    return fetch({
        url: '/sd-web/task/findHandTaskInfo',
        method: 'post',
        data
    });
}
export function findHandTaskInfo1(
  currentPage,
  size,
  handStatus,
  idNum,
  orderId,
  goodNickname,
  minPayAt,
  maxPayAt,
  goodStatus,
  addStatus
) {
  const data = qs.stringify({
    currentPage,
    size,
    handStatus,
    idNum,
    orderId,
    goodNickname,
    minPayAt,
    maxPayAt,
    goodStatus,
    addStatus
  });
  return fetch({
    url: '/sd-web/task/findHandTaskInfo',
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
    url:'/sd-web/task/evaluate/pic',
    method:'post',
    data
  })}
// 客服介入工单提交
export function customerServiceIn(
    handTaskIdDto,
    problemIdentifying,
    goodSubPrice,
    illegalContent,
    pic1,pic2,pic3,pic4,merchantPic
    ) {
    const data = qs.stringify({
       handTaskIdDto,
       problemIdentifying,
       goodSubPrice,
       illegalContent,
       pic1,pic2,pic3,pic4,merchantPic
    });
    return fetch({
        url: '/sd-web/task/customerServiceIn',
        method: 'post',
        data
    });
}
// 客服介入工单信息查看
export function findErrorMsgByBandTaskId(
      id
    ) {
    const data = qs.stringify({
       id
    });
    return fetch({
        url: '/sd-web/task/findErrorMsgByBandTaskId',
        method: 'post',
        data
    });
}
// 设置好评信息
export function setGoodEvaluate(
      handTaskIdDto,
      pay,
      evaluateType,
      goodEvaluate,
      goodEvaluatePic
    ) {
    const data = qs.stringify({
       handTaskIdDto,
       pay,
       evaluateType,
       goodEvaluate,
       goodEvaluatePic
    });
    return fetch({
        url: '/sd-web/task/setGoodEvaluate',
        method: 'post',
        data
    });
}
// 设置追评信息
export function setAddEvaluate(
      handTaskIdDto,
      pay,
      evaluateType,
      addEvaluate,
      goodEvaluatePic
    ) {
    const data = qs.stringify({
       handTaskIdDto,
       pay,
       evaluateType,
       addEvaluate,
       goodEvaluatePic
    });
    return fetch({
        url: '/sd-web/task/setAddEvaluate',
        method: 'post',
        data
    });
}
// 取消评价
export function cancelEvaluate(
      handTaskIdDto,
      pay,
      status
    ) {
    const data = qs.stringify({
       handTaskIdDto,
       pay,
       status
    });
    return fetch({
        url: '/sd-web/task/cancelEvaluate',
        method: 'post',
        data
    });
}
// 一键审核
export function auditHandTasks(
      ids
    ) {
    const data = {
       ids
    };
    return fetch({
        url: '/sd-web/task/auditHandTasks',
        method: 'post',
        data
    });
}
// 单条审核
export function auditHandTask(
      id,
      status
    ) {
    const data = qs.stringify({
       id,
       status
    });
    return fetch({
        url: '/sd-web/task/auditHandTask',
        method: 'post',
        data
    });
}
//查看图片
export function pic(
      id,
      status
    ) {
    const data = qs.stringify({
       id,
       status
    });
    return fetch({
        url: '/sd-web/task/handEvaluate/pic',
        method: 'post',
        data
    });
}


// 查询商家状态
export function bussinessStatus(){
    return fetch({
        url: '/sd-web/merchant/getStatus',
        method: 'post'
    });
}

// 标记信息
export function taskBiao(
     id,nick,memo,flag
    ) {
    const data = qs.stringify({
       id,nick,memo,flag
    });
    return fetch({
        url: '/sd-web/task/merchant/sign',
        method: 'post',
        data
    });
}
// 标记信息1
export function taskBiaos(
     memo,flag
    ) {
    const data = qs.stringify({
      memo,flag
    });
    return fetch({
        url: '/sd-web/task/save/memo',
        method: 'post',
        data
    });
}
