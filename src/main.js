/**
 * Created by rain on 2017/9/5.
 */

import Vue from 'vue';
import router from './router';
import rainElm from './rainElm';
import './config/rem.js'; //引入rem布局
import './scss/index.scss'; //引入样式表
import store from './vuex';

Vue.config.productionTip = false;

new Vue({
  el:'#elm',
  router,   //this.$router
  store   //this.$store
});
