import Vue from 'vue';
import Vuex from 'vuex';
import {login} from '../api/login';
import getters from './getter';
import { Message } from 'element-ui';
Vue.use(Vuex);

const store = new Vuex.Store({
	state:{
		count:10,
		show:false,
		another:5,
		produect_title:'',
		task_type:'',
		userInfo:'',
		token:'',
	},
	mutations:{
		// 加
		ADDMENT(state){
			state.count++
		},
		//减
		JIANMENT(state){
			state.count--
		},
		//接受参数
		JIAMENT(state,value){
			state.count=state.count+value.cevalue+value.anothers
		},
		// 显示waiting...
		SHOWWAIT(state){
			state.show=true
		},
		// 隐藏waiting...
		HIDEWAIT(state){
			state.show=false
		},
		// 发布任务商品标题
		CHOOSE(state,title){
			state.produect_title=title
		},
		// 发布任务类型
		CHANGETYPE(state,types){
			state.task_type=types
		},
		// 存储用户信息
		GETUSERINFO(state,userInfo){
			state.userInfo=userInfo
		},
		// 存储用户唯一值
		GETTOKEN(state,token){
			state.token=token
		}
	},
	actions:{
		choose({commit},title){
			commit('CHOOSE',title)
		},
		changeType({commit},types){
			commit('CHANGETYPE',types)
		},
	    gettoken({commit},token){
			commit('GETTOKEN',token)
	    },
		addment({commit}){
			commit('ADDMENT')
		},
		jianment({commit}){
			commit('JIANMENT')
		},

		jiament({commit},value){
			commit('SHOWWAIT')
			let cevalue=parseInt(value.jiament)
			let anothers=parseInt(value.another)
			setTimeout(function(){
				if(isNaN(cevalue)){
					alert('不是一个数字')
				}else{
					commit('HIDEWAIT')
					commit('JIAMENT',{cevalue,anothers})
				}
			},2000)
		}
	},
	getters
});

export default store
