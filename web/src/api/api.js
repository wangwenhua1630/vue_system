 import fetch from '../util/fetch';
var qs = require('qs');
// 首页
export function homes(){
	 return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Index/index',
        method: 'post'
    }); 
}
// 首页任务分配
export function user_jie(){
   return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Index/user_jies',
        method: 'post'
    }); 
}
// 首页自动接单
export function she_zhi(){
   return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Index/she_zhi',
        method: 'post'
    }); 
}
// 咨询详情
export function message_info(id){
  const data=qs.stringify({
    id
  })
   return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Info/message_info',
        method: 'post',
        data
    }); 
}
// 申诉详情
export function complain_info(id){
  const data=qs.stringify({
    id
  })
   return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Info/shen_info',
        method: 'post',
        data
    }); 
}
// 个人中心
export function main(){
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Center/index',
        method: 'post'
    }); 
}
// 签到页面
export function qian(){
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Qian/index',
        method: 'post'
    }); 
}
// 签到
export function qianBtn(covers,lei_qian_day,lian_qian){
    const data=qs.stringify({
      covers,
      lei_qian_day,
      lian_qian 
    })
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Qian/qian',
        method: 'post',
         data
    }); 
}
//修改的签到接口
 export function qianBtns(){
   return fetch({
     url: '/bozhi_handphp/index.php?s=/Little/Qian/qians',
   });
 }
// 资金管理展示
export function moneys_guan(){
   return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Moneys/index',
        method: 'post'
    }); 
}
// 资金管理提现记录展示
export function moneys_ti(type){
   const data=qs.stringify({
      type
    })
   return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Moneys/user_ti',
        method: 'post',
        data
    }); 
}
// 资金管理下拉加载
export function moneys_la(type,currpage){
    const data=qs.stringify({
      type,
      currpage
    })
   return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Moneys/logs_la',
        method: 'post',
        data
    }); 
}
// 资金提现申请展示
export function out_balance_info(){
   return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Moneys/out_balance_info',
        method: 'post'
    }); 
}
// 资金提现申请
export function out_balance_moneys(password,ti_moneys){
    const data=qs.stringify({
      password,
      ti_moneys
    })
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Moneys/out_balance_moneys',
        method: 'post',
        data
    }); 
}
// 推保证金
export function out_bao_moneys(password){
   const data=qs.stringify({
      password
    })
   return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Moneys/out_bao_moneys',
        method: 'post',
        data
    }); 
}
// 任务查看
export function lookTask(){
   return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Task/index',
        method: 'post'
    }); 
}
// 任务查看状态
export function taskStatus(type,status){
    const data=qs.stringify({
      type,
      status
    })
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Task/task_info',
        method: 'post',
        data
    }); 
}
// 任务查看状态下拉加载
export function taskStatus_la(type,status,currpage){
    const data=qs.stringify({
      type,
      status,
      currpage
    })
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Task/task_info_la',
        method: 'post',
        data
    }); 
}
// 申诉记录，表单状态
export function complain(){
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Back/index',
        method: 'post'
    }); 
}
// 申诉记录
export function complainList(type){
    const data=qs.stringify({
      type
    })
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Back/logs',
        method: 'post',
        data
    }); 
}
// 申诉记录,下拉加载
export function complainList_la(type,currpage){
    const data=qs.stringify({
      type,
      currpage
    })
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Back/logs_la',
        method: 'post',
        data
    }); 
}
// 申诉记录，表单提交
export function complain_ti(appeal_id,content,img,moneys){
    const data=qs.stringify({
      appeal_id,
      content,
      img,
      moneys
    })
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Back/info_ti',
        method: 'post',
        data
    }); 
}
// 推荐分享
export function sharePeople(){
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Codes/index',
        method: 'post'
    }); 
}
// 推荐分享,下拉加载
export function sharePeople_la(currpage){
    const data=qs.stringify({
      currpage
    })
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Codes/index_la',
        method: 'post',
        data
    }); 
}
// 推荐分享二维码
export function shareEr(){
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Codes/user_erweima',
        method: 'post'
    }); 
}

// 任务详情
export function taskInfo(id,type){
    const data=qs.stringify({
      id,
      type
    })
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Task/info',
        method: 'post',
        data
    }); 
}
// 评价任务提交
export function task_jie(id,type,img){
    const data=qs.stringify({
      id,
      type,
      img
    })
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Task/task_jie',
        method: 'post',
        data
    }); 
}
// 放弃任务
export function task_out(id){
    const data=qs.stringify({
      id,
    })
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Task/task_out',
        method: 'post',
        data
    }); 
}
// 开始任务
export function task_begin(id){
    const data=qs.stringify({
      id,
    })
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Task/task_overs',
        method: 'post',
        data
    }); 
}
// 开始任务第一步
export function task_one(id){
    const data=qs.stringify({
      id,
    })
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Task/task_one',
        method: 'post',
        data
    }); 
}
// 开始任务第一步店铺验证
export function task_one_check(id,name,command){
    const data=qs.stringify({
      id,
      name,
      command
    })
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Task/task_one_check',
        method: 'post',
        data
    }); 
}
// 开始任务第二步
export function task_two(id){
    const data=qs.stringify({
      id,
    })
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Task/task_two',
        method: 'post',
        data
    }); 
}
// 开始任务第二步图片保存
export function task_two_save(task_img,collect_car_img,pay_img,id){
    const data=qs.stringify({
      task_img,
      collect_car_img,
      pay_img,
      id
    })
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Task/task_two_save',
        method: 'post',
        data
    }); 
}
// 开始任务第三步
export function task_three(id){
    const data=qs.stringify({
      id,
    })
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Task/task_three',
        method: 'post',
        data
    }); 
}
// 开始任务第三步提交商品编号
export function task_three_save(id,trade_no,count_moneys){
    const data=qs.stringify({
      id,
      trade_no,
      count_moneys
    })
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Task/task_three_save',
        method: 'post',
        data
    }); 
}
// 任务纠错
export function task_mistake(){
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Task/task_mistake',
        method: 'post'
    }); 
}
// 任务纠错提交
export function task_mistake_save(id,content,img,mistake_id,out){
    const data=qs.stringify({
      id,
      content,
      img,
      mistake_id,
      out
    })
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Task/task_mistake_save',
        method: 'post',
        data
    }); 
}
// 新手教学
export function study(){
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Center/study',
        method: 'post'
    }); 
}
// 新手教学详情
export function studyDetail(id){
    const data=qs.stringify({
      id,
    })
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Center/study_info',
        method: 'post',
        data
    }); 
}




// 消息管理
export function Infomations(type){
    const data=qs.stringify({
      type
    })
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Infomation/index',
        method: 'post',
        data
    }); 
}
// 消息管理下拉加载
export function Infomations_la(type,currpage){
    const data=qs.stringify({
      type,
      currpage
    })
    return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Infomation/info_la',
        method: 'post',
        data
    }); 
}

// 个人资料
export function mainMessage(){
	 return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Perfect/index',
        method: 'post'
    }); 
}
// 个人资料上传
export function info_save(avatar,sex,birthday,province,area,city,jobs,moneys,pay_type,pay,tao_account){
	 const data = qs.stringify({
      avatar,
      sex,
      birthday,
      province,
      area,
      city,
      jobs,
      moneys,
      pay_type,
      pay,
      tao_account
    });
	 return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Perfect/info_save',
        method: 'post',
        data
    }); 
}
// 资金绑定展示
export function user_pay(){
	 return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Perfect/user_pay',
        method: 'post'
    }); 
}
// 资金绑定
export function card_save(bank_card,bank_name,bank_phone,bank_area,pay_name,pay_nums,pay_phone,bank_of_name){
	 const data = qs.stringify({
      bank_card,
      bank_name,
      bank_phone,
      bank_area,
      pay_name,
      pay_nums,
      pay_phone,
      bank_of_name
    });
	 return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Perfect/card_save',
        method: 'post',
        data
    }); 
}
// 认证资料绑定展示
export function user_img(type){
	 const data = qs.stringify({
	 	type
    });
	 return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Perfect/user_img',
        method: 'post',
        data
    }); 
}
// 认证资料绑定
export function img_save(one,two,type){
	 const data = qs.stringify({
	 	one,
	 	two,
	 	type
    });
	 return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Perfect/img_save',
        method: 'post',
        data
    }); 
}
// 规则协议
export function rules_description(type){
  const data = qs.stringify({
    type
  });
   return fetch({
        url: '/bozhi_handphp/index.php?s=/Little/Login/rules_description',
        method: 'post',
        data
    }); 
}

//选择平台
 export function choosePlatform(account_type){
    //Perfect/account_list    account_type
   const data = qs.stringify({
     account_type
   });
   return fetch({
     url: '/bozhi_handphp/index.php?s=/Little/Perfect/account_list',
     method: 'post',
     data
   });
 }
 //切换账户
 export function chooseUser(account_type,hand_detail_id){
   const data = qs.stringify({
     account_type,
     hand_detail_id
   });
   return fetch({
     url: '/bozhi_handphp/index.php?s=/Little/Perfect/account_chage',
     method: 'post',
     data
   });
 }
 //填写资料
 export function chooseUserInfo(hand_detail_id){
  const data=qs.stringify({
    hand_detail_id
  })
   return fetch({
     url: '/bozhi_handphp/index.php?s=/Little/Perfect/account_info',
     method:'post',
     data
   });
 }
 // 账号资料上传
 export function userInfoSave(account_type,tao_account,sex,birthday,province,area,city,pay_type,one,two,three,hand_detail_id){
   const data = qs.stringify({
     account_type,
     tao_account,
     sex,
     birthday,
     province,
     area,
     city,
     pay_type,
     one,
     two,
     three,
     hand_detail_id
   });
   return fetch({
     url: '/bozhi_handphp/index.php?s=/Little/Perfect/account_save',
     method: 'post',
     data
   });
 }

