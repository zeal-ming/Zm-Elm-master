/**
 * Created by intern on 2017/9/22.
 */

import Vuex from 'vuex';
import Vue from 'vue';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
    location: null,
    carList: {}     //加入购物车的商品列表
};

export default new Vuex.Store({
    state : state,
    mutations: mutations
});


