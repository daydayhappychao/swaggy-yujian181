import Vue from 'vue';
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import App from './App';
import router from './routers';
import './index.scss';

Vue.use(ElementUI);
Vue.use(VueRouter);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
