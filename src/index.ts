import Vue from 'vue';
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import App from './App';
import router from './routers';
import axionConfig from './config/axiosConfig';


import './index.scss';

Vue.use(ElementUI);
Vue.use(VueRouter);

const entity = new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

axionConfig(entity);

