import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import App from './App.vue'
const mock = false;
if(mock){
  require('./mock/api');
}
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 8000; 
//拦截器
axios.interceptors.response.use(function(response){
  let res = response.data;
  let path = location.hash;
  if(res.code == 200){
    return res.data;
  }else if(res.code == 401){
    if (path != '#/index'){
      window.location.href = '/#/login';
    }
    localStorage.removeItem("Authorization")
    Message.warning(res.msg);
    return Promise.reject(res);
  }else{
    Message.warning(res.msg);
    return Promise.reject(res);
  }
},(error)=>{
  let res = error.response;
  Message.error(res.data.message);
  return Promise.reject(error);
});

axios.interceptors.request.use((request)=>{
  request.headers.common = {
    'Authorization' : localStorage.getItem('Authorization'),
  };
  return request;
});

Vue.use(VueAxios,axios);
Vue.use(VueCookie);
Vue.use(VueLazyLoad,{
  loading:'/imgs/loading-svg/loading-bars.svg'
})
Vue.prototype.$message = Message;
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
