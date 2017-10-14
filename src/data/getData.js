/**
 * Created by intern on 2017/9/8.
 */

import fetch from '@/config/fetch';


// 获取定位
export const getPosition = function () {

    return  navigator.geolocation ? new Promise(function (resolve, reject) {

        navigator.geolocation.getCurrentPosition(resolve, reject, {timeout:10000});

    }) : Promise.reject('浏览器不支持地理定位');

};
//https://localhost:8081/bgs/poi/reverse_geo_coding?latitude=38.8843824&longitude=121.53394559999998

//获取地址
export const getAddress = (latitude, longitude) => fetch('/bgs/poi/reverse_geo_coding/', {latitude, longitude});

// 获取天气
export const getWeather = (latitude, longitude) => fetch('/bgs/weather/current/',{latitude,longitude});

//获取热门词汇
export const  getHotWord = (latitude, longitude) => fetch('/shopping/v3/hot_search_words/',{
    latitude, longitude
});

//获取分类
export const getSort = (latitude, longitude) => fetch('/shopping/v2/entries',{latitude,longitude,'templates[]':'main_template'});

//获取商家列表
// https://mainsite-restapi.ele.me/shopping/restaurants?latitude=38.88628159999999&longitude=121.5361539&offset=0&limit=20&extras[]=activities&terminal=h5

export const getList = (latitude, longitude, offset) => fetch('/shopping/restaurants',{
    latitude, longitude,offset,"limit":20,"extras[]":'activities','terminal':'h5'
});

//获取某商家的数据
// https://mainsite-restapi.ele.me/shopping/v2/menu?restaurant_id=1283010
export const getShopContent = restaurant_id => fetch('/shopping/v2/menu',{restaurant_id});

//获取商家头部信息
// https://mainsite-restapi.ele.me/shopping/restaurant/761918?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&extras[]=qualification&latitude=38.88773&longitude=121.54015

export const getShopHead = (latitude, longitude, id) => fetch('/shopping/restaurant/'+id+'?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&extras[]=qualification' + '&latitude=' + latitude + '&longitude=' + longitude
);


