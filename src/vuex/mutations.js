/**
 * Created by intern on 2017/9/27.
 */

import {
    SAVE_LOCATION,
    ADD_CAR,
    REDUCE_CAR,
    CLEAR_CAR,

} from './mutation-types';

//记录突变的状态,作用:把外面组件常用的变量往state里面存储,以供组件间共享
export default {

    //保存定位信息
    [SAVE_LOCATION](state, location){
        state.location = location;
    },

    //增加商品到购物车
    [ADD_CAR](state, {shopId, foodId, name, original_price, price, spec, index1, index2}){

        let car = state.carList;

        let shop = car[shopId] = (car[shopId] || {});

        // console.log('shop:', shop);
        if(shop[foodId]) {

            shop[foodId].count += 1;

        } else {

            shop[foodId] = {
                name,
                original_price,
                price,
                spec,
                count: 1,
                index1,
                index2,
            }

        }

        let carCopy = {};

        Object.keys(car).forEach(function (foodId) {

            carCopy[foodId] = car[foodId];

        });

        state.carList = carCopy;
    },

    //从购物车中减少商品
    [REDUCE_CAR](state, {shopId, foodId}){

        let car = state.carList;
        let shop = car[shopId];

        shop[foodId].count-- ;

        //如果购物车中某个食品的数量为0,则删除该食品
        if(shop[foodId].count === 0){
            delete shop[foodId];
        }

        //如果购物车所有的食品都被删除
        console.log('car', car);

        // if(!car[shopId]){
        //     console.log('jajajaj');
        //     delete car[shopId];
        // }

        let carCopy = {};

        Object.keys(car).forEach(function (foodId) {
            carCopy[foodId] = car[foodId];
        });

        state.carList = carCopy;
    },

    //清空购物车
    [CLEAR_CAR](state, {shopId}){

        state.carList[shopId] = null;
        delete state.carList[shopId];
        console.log('cleat_cart:',state.carList);

    }

}