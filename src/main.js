import Vue from 'vue';
// import Vuex from 'vuex';
// import io from "socket.io-client";
import store from './store'

import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
