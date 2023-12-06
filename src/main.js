import Vue from 'vue';
import { BootstrapVue, IconsPlugin, CarouselPlugin } from 'bootstrap-vue';
import App from './App.vue';

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(CarouselPlugin);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
