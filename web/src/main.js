// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import 'lib-flexible'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import Toasts from './components/toasts/toasts.js';
import msgBox from './components/msgBox/msgBox.js';
import axios from 'axios';
axios.defaults.withCredentials=true


Vue.use(Mint)
Vue.use(Toasts);
Vue.use(msgBox);
Vue.use(require('vue-wechat-title'))

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
