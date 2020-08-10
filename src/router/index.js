import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../components/Home.vue';
import Game from '../components/Game.vue';
import noURL from '../components/404.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:room(\\w{3})',
    name: 'Game',
    component: Game
  },
  {
    path: '*',
    name: '404',
    component: noURL
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
