import Vue from 'vue';
import Vuex from 'vuex';
import {login,logOut,register} from '../api/login';
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
		// 注册
		register({
	      commit
	    }, userInfo){
			 return new Promise((resolve, reject) => {
		        register(userInfo.username, userInfo.loginPassword,userInfo.yan).then(response => {
		          const data = response;
		          if(data.msg==1||data.msg==4){
	 				resolve();
		          }else if(data.msg==2){
		          	Message .error('账号已存在');
		          }else if(data.msg==3){
		          	Message .error('请输入正确的手机号');
		          }else if(data.msg==4){
		          	Message .error('密码长度应在6-20位之间');
		          }else if(data.msg==5){
		          	Message .error('验证码已过期');
		          }else if(data.msg==6){
		          	Message .error('验证码或手机号错误');
		          }
		        }).catch(error => {
		          reject(error);
		        });
		      });
		},
		// 登录
	    login({
	      commit
	    }, userInfo) {
	    	let flag
	    	if(localStorage.getItem('userInfo')!=null){
	    		let userInfos =JSON.parse(localStorage.getItem('userInfo'))
	    		flag=true
	    	}else{
	    		flag=false
	    	}
	      return new Promise((resolve, reject) => {
	        login(userInfo.username, userInfo.password,flag).then(response => {
	          const data = response;
	          if(data.msg==1||data.msg==4){
 				resolve();
 				if(userInfo.checked){
 					localStorage.setItem('userInfo',JSON.stringify(userInfo));
 				}
	          }else if(data.msg==2){
	          	Message .error('账号或密码错误');
	          }else if(data.msg==3){
	          	Message .error('请输入正确的手机号');
	          }
	        }).catch(error => {
	          reject(error);
	        });
	      });
	    },
	    // 登出
	    logOut({commit}){
	    	return new Promise((resolve, reject) => {
	        logOut().then(response => {
	          const data = response;
	           resolve();
	        }).catch(error => {
	          reject(error);
	        });
	      });
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
