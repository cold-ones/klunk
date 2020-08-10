import Vue from 'vue';
import Vuex from 'vuex';
import io from "socket.io-client";

Vue.use(Vuex);

var ip = process.env.VUE_APP_IP || '127.0.0.1';
var port = process.env.VUE_APP_PORT || '3000';

const store = new Vuex.Store({
    state: {
        socket: io(`${ip}:${port}`)
    },
    getters: {
        socket(state) {
            return state.socket;
        }
    },
    actions: {},
    mutations: {}

})
export default store;