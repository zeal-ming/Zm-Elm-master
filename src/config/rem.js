// ;(function () {
//     /*
//      设置viewport
//      计算1rem的值
//      */
//     var recalculate = function () {
//
//         //获取dpr
//         var dpr = Math.floor(window.devicePixelRatio) || 1;
//
//         //获取html元素
//         var html = document.documentElement;
//
//         var scale = 1 / dpr;
//
//         //创建meta
//         var metaEl = document.createElement('meta');
//         metaEl.setAttribute('name', 'viewport');
//         metaEl.setAttribute('content', 'width=device-width,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale + ',user-scalable=no');
//
//         document.head.appendChild(metaEl);
//
//         html.setAttribute('data-dpr', dpr);
//
//         //计算1rem的值
//         var rem = 75;
//
//         if (html.clientWidth < 1284) {
//
//             rem = html.clientWidth / 10;
//
//         } else {
//             rem = 108;
//         }
//
//         //设置根元素的字体大小
//         html.style.fontSize = rem + 'px';
//
//         //设置页面的默认字体大小
//         document.body.style.fontSize = 12 * dpr + 'px';
//     };
//
//     //设置监听事件
//     if(document.addEventListener){
//         document.addEventListener('DOMContentLoaded',recalculate,false);
//         window.addEventListener('orientationchange',recalculate,false);
//     } else {
//         window.attachEvent('resize',recalculate);
//         document.onreadystatechange=function () {
//             if(document.readyState === 'complete'){
//                 recalculate();
//             }
//         }
//     }
//
// })(window, document);

;(function (window,document) {

    function recalculate() {

        let dpr = Math.floor(window.devicePixelRatio) || 1;

        let scale = 1 / dpr;

        let metaEl = document.createElement('meta');

        metaEl.setAttribute('name','viewport');
        metaEl.setAttribute('content','width=device-width,initial-scale='+scale+',minimum-scale='+scale+",maximum-scale="+scale+",user-scalable=no");

        document.head.appendChild(metaEl);

        let html = document.documentElement;
        html.setAttribute('data-dpr',dpr);

        let rem = 75;

        if(html.clientWidth < 1242) {
            rem = html.clientWidth / 10;
        } else {
            rem = 108;
        }

        html.style.fontSize = rem + 'px';

        document.body.style.fontSize = dpr * 12 + 'px';
    }

    if(window.addEventListener) {
        window.addEventListener('orientationchange',recalculate,false);
        document.addEventListener('DOMContentLoaded',recalculate,false);
    } else {
        window.attachEvent('resize',recalculate);
        document.onreadystatechange = function () {
            if(document.readyState == 'complete'){
                recalculate();
            }
        }
    }
})(window,document)


