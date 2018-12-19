import fetch from '../until/fetch';
var qs = require('qs');
// 刷手设置展示
export function handSelf(){
    return fetch({
    	url: '/sd_admin/admin/sys/hand',
    	method: 'post'
    });  		
}
// 刷手设置
export function handSelfs(flag,pay,handBaoMoneys){
	const data = qs.stringify({
    	flag,pay,handBaoMoneys
    });
    return fetch({
    	url: '/sd_admin/admin/sys/hand/deposit',
    	method: 'post',
    	data
    });  		
}
// 新手设置详情
export function handNewmessage(id){
	const data = qs.stringify({
    	id
    });
    return fetch({
    	url: '/sd_admin/admin/sys/hand/get',
    	method: 'post',
    	data
    });  		
}
// 新手指导查询
export function handSelflook(){
    return fetch({
    	url: '/sd_admin/admin/sys/hand/course',
    	method: 'post'
    });  		
}
// 新手指导修改
export function handSelfChange(id,url,content,title){
	const data = qs.stringify({
    	id,
    	url,
    	content,
    	title
    });
    return fetch({
    	url: '/sd_admin/admin/sys/hand/save',
    	method: 'post',
    	data
    });  		
}

// 商家单量查询
export function businessChange(){
    return fetch({
    	url: '/sd_admin/admin/sys/num/list',
    	method: 'post'
    });  		
}
// 商家单量调整
export function businessChanges(num,price,id,pay){
	const data = qs.stringify({
    	num,price,id,pay
    });
    return fetch({
    	url: '/sd_admin/admin/sys/num/save',
    	method: 'post',
    	data
    });  		
}
// 商家单量删除
export function businessDel(id,pay){
	const data = qs.stringify({
    	id,
    	pay
    });
    return fetch({
    	url: '/sd_admin/admin/sys/num/delete',
    	method: 'post',
    	data
    });  		
}
// 查看店铺列表
export function storeType(){
    return fetch({
    	url: '/sd_admin/admin/sys/category/list',
    	method: 'post'
    });  		
}
// 删除店铺列表
export function storeDel(id,pay){
	const data = qs.stringify({
    	id,
    	pay
    });
    return fetch({
    	url: '/sd_admin/admin/sys/category/delete',
    	method: 'post',
    	data
    });  		
}
// 增加店铺列表
export function storeAdd(name){
	const data = qs.stringify({
    	name
    });
    return fetch({
    	url: '/sd_admin/admin/sys/category/save',
    	method: 'post',
    	data
    });  		
}
// 增加商家公告
export function addBusinessinfo(title,content,type,id){
    const data = qs.stringify({
        title,content,type,id
    });
    return fetch({
        url: '/sd_admin/admin/sys//save/notice',
        method: 'post',
        data
    });         
}
// 显示商家公告
export function businessinfos(flag){
    const data = qs.stringify({
       flag
    });
    return fetch({
        url: '/sd_admin/admin/sys/notice',
        method: 'post',
        data
    });         
}

//修改刷手单量
export function shuaGai(num){
  const data = qs.stringify({
    num
  });
  return fetch({
    url: '/sd_admin/admin/sys/handNum',
    method: 'post',
    data
  });
}
//修改淘宝、京东、拼多多账号绑定数量
export function tjpGai(handTaoCount,handJdCount,handPddCount){
  const data = qs.stringify({
    handTaoCount,handJdCount,handPddCount
  });
  return fetch({
    url: '/sd_admin/admin/sys/put/handAccountCount',
    method: 'post',
    data
  });
}
//给刷手群发短信
export function sendMsgShua(msg,pay){
  const data = qs.stringify({
    msg,pay
  });
  return fetch({
    url: '/sd_admin/send/msg',
    method: 'post',
    data
  });
}
//获取刷手等级
export function shuaHuo(){
    return fetch({
      url:'sd_admin/handInfo/get/grades'
    })
}
//修改刷手等级
export function shuaDen(id,moneysColdDays){
  const data = qs.stringify({
    id,moneysColdDays
  });
  return fetch({
    url: '/sd_admin/handInfo/put/grades',
    method: 'post',
    data
  });
}
//显示商家佣金
export function ruleFind(){
  return fetch({
    url: '/sd_admin/admin/sys/get/commissionsRule',
  });
}
//修改商家佣金
export function ruleAdd(minPrice,maxPrice,merchantCommission,handCommission){
  const data = qs.stringify({
    minPrice,maxPrice,merchantCommission,handCommission
  });
  return fetch({
    url: '/sd_admin/admin/sys/post/commissionsRule',
    method:'post',
    data
  });
}

//修改商家佣金
export function ruleUpdate(id,minPrice,maxPrice,merchantCommission,handCommission){
  const data = qs.stringify({
    id,minPrice,maxPrice,merchantCommission,handCommission
  });
  return fetch({
    url: '/sd_admin/admin/sys/post/commissionsRule',
    method:'post',
    data
  });
}
//删除商家佣金
export function ruleDel(id,pay){
  const data = qs.stringify({
    id,pay
  });
  return fetch({
    url: '/sd_admin/admin/sys/delete/commissionsRule',
    method:'post',
    data
  });
}
//刷手banner显示
export function bannerSelect(){
  return fetch({
    url: '/sd_admin/admin/sys/banners',
  });
}
//刷手banner新增\修改
export function bannerAdd(img,id){
  const data = qs.stringify({
    img,id
  });
  return fetch({
    url:'/sd_admin/admin/sys/post/banner',
    method:'post',
    data
  })
}
//刷手banner删除
export function bannerDel(id){
  const data = qs.stringify({
    id
  });
  return fetch({
    url:'/sd_admin/admin/sys/delete/banner',
    method:'post',
    data
  })
}
