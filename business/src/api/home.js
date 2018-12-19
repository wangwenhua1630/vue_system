import fetch from '../until/fetch';
var qs = require('qs');
// 数据加载
export function homesMessage(
    ) {
    return fetch({
        url: '/sd-web/home/pageInfo',
        method: 'get'
    });         
}
// tab选择
export function previousTasks(
		flag
    ) {
    return fetch({
        url: '/sd-web/home/previousTask?flag='+flag,
        method: 'get'
    });         
}
// 公告
export function businessInfo(
        flag
    ) {
    var data=qs.stringify({
       flag
    })
    return fetch({
        url: '/sd-web/home/notice',
        method: 'post',
        data
    });         
}