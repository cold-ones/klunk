import Vue from 'vue';
import Vuex from 'vuex';
import io from "socket.io-client";

import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(Vuex);

var ip = process.env.VUE_APP_IP || '127.0.0.1';
var port = process.env.VUE_APP_PORT || '3000';

const store = new Vuex.Store({
  state: {
    socket: io(`${ip}:${port}`),
  },
})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
