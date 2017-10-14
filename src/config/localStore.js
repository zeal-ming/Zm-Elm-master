/**
 * Created by intern on 2017/9/12.
 */


// export default {
//
//     setData: function (key, value) {
//         localStorage.setItem(key,value);
//     },
//
//     getData: function(){
//         localStorage.getItem(key)
//     }
//
// }


// export const setData = (key, value) => {
//     if (typeof value !== 'string') {
//         localStorage.setItem(key, JSON.stringify(value));
//     } else {
//         localStorage.setItem(key, value);
//     }
// };
// export const getData = (key) => localStorage.getItem(JSON.parse(key));

export const setStore = (key, value) => {

    if(!key) return;
    if(typeof value !== 'string'){
        value = JSON.stringify(value);
    }
    window.localStorage.setItem(key, value);
};

export const getStore = key => {

   const value = window.localStorage.getItem(key);
   return JSON.parse(value);
};