import Alert from './toasts.vue';
var Toasts={}

Toasts.install=function(Vue,options){
	if(document.getElementsByClassName('alert').length){
		return
	}	
	let toastsTpl=Vue.extend(Alert) //创建vue实例
	let $vm=new toastsTpl() //实例化vue实例
	let tpl=$vm.$mount().$el //将此实例挂载到元素上
	document.body.appendChild(tpl) //添加到页面上

	// 在vue的原型上添加实例方法，方便全局调用
	Vue.prototype.$toasts=(msg,duration=1500)=>{
		$vm.message=msg
		$vm.show=true
		setTimeout(function(){
			$vm.show=false
		},duration)
	}
}

export default Toasts
