import msgboxs from './msgBox.vue';

let msgBox={}

msgBox.install=function(Vue,options){
	let msgboxInstance=Vue.extend(msgboxs)
	let currentMsg
	// 实例化vue
	const instance=()=>{
		currentMsg=new msgboxInstance()
		let msgboxEl=currentMsg.$mount().$el
		document.body.appendChild(msgboxEl);
	}
	
	Vue.prototype.$msgbox=(options=>{
		if(!currentMsg){
			instance()
		}
		currentMsg.msgboxShow=true
		currentMsg.title=options.title
		currentMsg.message=options.message
		if(currentMsg.showCancelBtn==true||currentMsg.showCancelBtn==''){
			currentMsg.showCancelBtn=true
			currentMsg.cancelText='取消'
		}else{
			currentMsg.showCancelBtn=options.showCancelBtn
			currentMsg.cancelText=options.cancelText
		}
		if(currentMsg.showConfirmBtn==true||currentMsg.showConfirmBtn==''){
			currentMsg.showConfirmBtn=true;
			currentMsg.confirmText='确认'
		}else{
			currentMsg.showConfirmBtn=options.showConfirmBtn
			currentMsg.confirmText=options.confirmText
		}
		currentMsg.showInp=options.showInp
		currentMsg.inpValue=options.inpValue
		currentMsg.model=options
	})
}

export default msgBox
