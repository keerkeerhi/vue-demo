// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

// 入口文件为 src/App.vue 文件 所以要引用
import App from './App';

// 引用路由配置文件
import router from './router';

// 组件之间数据传递
import Vuex from 'vuex';

// axios 官方推荐API
import axios from 'axios';

// 引入element-ui组件库
import ElementUI from 'element-ui';

// 光引用不成，还得使用
Vue.use(Vuex);
Vue.prototype.$http = axios;
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
