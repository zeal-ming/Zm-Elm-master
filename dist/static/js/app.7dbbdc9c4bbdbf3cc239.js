webpackJsonp([6],{"+3fV":function(t,n){},"+Waz":function(t,n,e){"use strict";var i=e("Xxa5"),s=e.n(i),a=e("exGp"),o=e.n(a),r=e("mzkE"),c=e("UAgs"),l=(e.n(c),e("r2zp")),u=e("21Sx"),d=e("hbxb"),f=e("UtkO");n.a={name:"msite",components:{rainFooter:r.a,saleList:f.a},data:function(){return{address:null,weather:null,location:null,hotWord:null,sort:null,position:{startX:"",moveX:"",touchEl:"",moveDistance:"",touchPageSibling:"",isActive:!0},scrollY:""}},mixins:[d.a],methods:{initData:function(){var t=this;e.i(u.c)(this.location.latitude,this.location.longitude).then(function(n){t.address=n}).catch(function(t){console.log("没有获取到值"),console.log(t)}),e.i(u.d)(this.location.latitude,this.location.longitude).then(function(n){t.weather=n}).catch(function(t){console.log(t)}),e.i(u.e)(this.location.latitude,this.location.longitude).then(function(n){t.hotWord=n}).catch(function(t){console.log(t)}),e.i(u.f)(this.location.latitude,this.location.longitude).then(function(n){console.log("getSort",n),t.sort=n}).then(function(t){console.log(t)})},touchStart:function(t){this.position.startX=t.changedTouches[0].clientX,console.log("起始距离",this.position.startX),this.position.touchEl=t.target.offsetParent,this.position.touchPageSibling=this.position.touchEl.nextElementSibling||this.position.touchEl.previousElementSibling,console.log("触碰节点",this.position.touchEl),console.log("兄弟元素",this.position.touchPageSibling)},touchMove:function(t){this.position.moveX=t.changedTouches[0].clientX;var n=this.position.moveX-this.position.startX;this.position.moveDistance=n,n>0?(this.position.touchEl.style.transform="translate("+n+"px)",this.position.touchPageSibling.style.transform="translate("+(-750+n)+"px)"):(this.position.touchEl.style.transform="translate("+n+"px)",this.position.touchPageSibling.style.transform="translate("+(750+n)+"px)"),console.log("touchMove")},touchEnd:function(t){console.log("touchEnd"),console.log(this.position.moveDistance),this.position.moveDistance>375||this.position.moveDistance<-375?(this.position.touchEl.style.transform="translate(750px)",this.position.touchPageSibling.style.transform="translate(0px)",this.position.isActive=!this.position.isActive):(this.position.touchEl.style.transform="translate(0px)",this.position.touchPageSibling.style.transform="translate(750px)"),this.position.moveDistance=0}},mounted:function(){var t=this;return o()(s.a.mark(function n(){var i;return s.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,e.i(u.g)();case 3:i=n.sent,t.location={latitude:i.coords.latitude,longitude:i.coords.longitude},e.i(l.a)("location",t.location),n.next=12;break;case 8:n.prev=8,n.t0=n.catch(0),console.log(n.t0),t.location=e.i(l.b)("location");case 12:t.$store.commit("SAVE_LOCATION",t.location);case 13:case"end":return n.stop()}},n,t,[[0,8]])}))()},watch:{location:function(t){e.i(l.a)("location",t),this.initData()}}}},"/myI":function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{attrs:{id:"saleList"}},[e("h3",{staticClass:"index-title"},[t._v("推荐商家")]),t._v(" "),t._l(t.list,function(n){return e("div",{staticClass:"index-container"},[e("router-link",{staticClass:"shop",attrs:{to:{path:"/shop",query:{id:n.id}}}},[e("div",{staticClass:"index-logo"},[e("div",{staticClass:"logo-img"},[e("img",{attrs:{src:t.getImgUrl(n.image_path,"130x130")}})])])]),t._v(" "),e("div",{staticClass:"index-main"},[e("div",{staticClass:"index-line"},[e("h3",[t._v(t._s(n.name))])]),t._v(" "),e("div",{staticClass:"index-line"},[e("star",{attrs:{score:n.rating}}),t._v(" "),e("div",{staticClass:"index-rateWrap"},[e("span",[t._v(t._s(n.rating))]),t._v(" "),e("span",[t._v("月售"+t._s(n.recent_order_num)+"单")])]),t._v(" "),n.delivery_mode?e("div",{staticClass:"index-delivery"},[e("span",[t._v(t._s(n.delivery_mode.text))])]):t._e()],1),t._v(" "),e("div",{staticClass:"index-line"},[e("div",{staticClass:"index-moneylimit"},[e("span",[t._v("¥"+t._s(n.float_minimum_order_amount)+"起送")]),t._v(" "),n.piecewise_agent_fee.description?e("span",[t._v(t._s(n.piecewise_agent_fee.description))]):t._e()]),t._v(" "),e("div",{staticClass:"index-timedistance"},[e("span",[t._v(t._s(t.mToKm(n.distance)))]),t._v(" "),e("span",[t._v("|")]),t._v(" "),e("span",[t._v(t._s(n.order_lead_time+"分钟"))])])]),t._v(" "),e("div",{staticClass:"dotted"}),t._v(" "),e("div",{staticClass:"index-activities"},[e("activity",{attrs:{activities:n.activities}}),t._v(" "),e("div",{staticClass:"index-btn",on:{click:t.toggle}},[e("span",[t._v(t._s(n.activities.length)+"个活动")]),t._v(" "),e("i",{staticClass:"fa fa-caret-down"})])],1)])],1)})],2)},s=[],a={render:i,staticRenderFns:s};n.a=a},"0Aim":function(t,n){},"21Sx":function(t,n,e){"use strict";e.d(n,"g",function(){return o}),e.d(n,"c",function(){return r}),e.d(n,"d",function(){return c}),e.d(n,"e",function(){return l}),e.d(n,"f",function(){return u}),e.d(n,"h",function(){return d}),e.d(n,"b",function(){return f}),e.d(n,"a",function(){return v});var i=e("//Fk"),s=e.n(i),a=e("KOga"),o=function(){return navigator.geolocation?new s.a(function(t,n){navigator.geolocation.getCurrentPosition(t,n,{timeout:1e4})}):s.a.reject("浏览器不支持地理定位")},r=function(t,n){return e.i(a.a)("/bgs/poi/reverse_geo_coding/",{latitude:t,longitude:n})},c=function(t,n){return e.i(a.a)("/bgs/weather/current/",{latitude:t,longitude:n})},l=function(t,n){return e.i(a.a)("/shopping/v3/hot_search_words/",{latitude:t,longitude:n})},u=function(t,n){return e.i(a.a)("/shopping/v2/entries",{latitude:t,longitude:n,"templates[]":"main_template"})},d=function(t,n,i){return e.i(a.a)("/shopping/restaurants",{latitude:t,longitude:n,offset:i,limit:20,"extras[]":"activities",terminal:"h5"})},f=function(t){return e.i(a.a)("/shopping/v2/menu",{restaurant_id:t})},v=function(t,n,i){return e.i(a.a)("/shopping/restaurant/"+i+"?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&extras[]=qualification&latitude="+t+"&longitude="+n)}},"8Mze":function(t,n,e){"use strict";function i(t){e("EzNW")}var s=e("gDWM"),a=e("fr5Q"),o=e("VU/8"),r=i,c=o(s.a,a.a,r,null,null);n.a=c.exports},CZXL:function(t,n,e){"use strict";e("GHJ9");n.a={name:"rainelm"}},EzNW:function(t,n){},GHJ9:function(t,n,e){"use strict";function i(t){e("+3fV")}Object.defineProperty(n,"__esModule",{value:!0});var s=e("+Waz"),a=e("V83J"),o=e("VU/8"),r=i,c=o(s.a,a.a,r,null,null);n.default=c.exports},Hl8z:function(t,n){},JJCo:function(t,n,e){"use strict";function i(t){e("fHwF")}var s=e("CZXL"),a=e("mt3n"),o=e("VU/8"),r=i,c=o(s.a,a.a,r,null,null);n.a=c.exports},JKEc:function(t,n,e){"use strict";function i(t){e("liFj")}var s=e("XFAn"),a=e("wdvn"),o=e("VU/8"),r=i,c=o(s.a,a.a,r,null,null);n.a=c.exports},KOga:function(t,n,e){"use strict";var i=e("Xxa5"),s=e.n(i),a=e("pFYg"),o=e.n(a),r=e("//Fk"),c=e.n(r),l=e("mvHQ"),u=e.n(l),d=e("fZjL"),f=e.n(d),v=e("exGp"),h=e.n(v),p=this;n.a=function(){var t=h()(s.a.mark(function t(){var n,e,i,a,r,l=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",d=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},v=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"GET";return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(v=v.toUpperCase(),n="",e="",f()(d).forEach(function(t){n+=t+"="+d[t]+"&"}),""!==n?(n=n.substr(0,n.lastIndexOf("&")),e=l+"?"+n):e=l,!window.fetch){t.next=28;break}i={credentials:"include",method:v,headers:{Accept:"application/json","Content-Type":"application/json"},mode:"cors",cache:"force-cache"},t.t0=v,t.next="GET"===t.t0?10:"POST"===t.t0?12:14;break;case 10:return l=e,t.abrupt("break",14);case 12:return Object.defineProperty(i,"body",{value:u()(d)}),t.abrupt("break",14);case 14:return t.prev=14,t.next=17,fetch(l,i);case 17:return a=t.sent,console.log("数据回来了"),r=a.json(),t.abrupt("return",r);case 23:t.prev=23,t.t1=t.catch(14),console.log(t.t1);case 26:t.next=30;break;case 28:return console.log("不支持fetch"),t.abrupt("return",new c.a(function(t,n){var i=void 0;i=new XMLHttpRequest;var s="";switch(v){case"GET":l=e;break;case"POST":s=u()(d)}i.open(v,l,!0),i.setRequestHeader("Content-type","application/json"),i.setRequestHeader("Accept","application/json"),i.send(s),i.onreadystatechange=function(){if(4===i.readyState&&200===i.status){var e=i.response;"object"!==(void 0===e?"undefined":o()(e))&&(e=JSON.parse(e),t(e))}else n(i)}}));case 30:case"end":return t.stop()}},t,p,[[14,23]])}));return function(){return t.apply(this,arguments)}}()},KWv7:function(t,n,e){"use strict";var i=e("JJCo"),s=function(){return new Promise(function(t){t()}).then(e.bind(null,"GHJ9"))},a=function(){return e.e(1).then(e.bind(null,"o66X"))},o=function(){return e.e(3).then(e.bind(null,"1SgU"))},r=function(){return e.e(2).then(e.bind(null,"5/rT"))},c=function(){return e.e(0).then(e.bind(null,"tZM3"))},l=function(){return e.e(4).then(e.bind(null,"QlWu"))};n.a=[{path:"/",component:i.a,redirect:"/msite",children:[{path:"/msite",component:s},{path:"/discover",component:a},{path:"/order",component:o},{path:"/profile",component:r},{path:"/shop",component:c},{path:"login",component:l}]}]},NHnr:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e("7+uW"),s=e("YaEn"),a=(e("JJCo"),e("UAgs")),o=(e.n(a),e("SgXG")),r=(e.n(o),e("l+I4"));i.a.config.productionTip=!1,new i.a({el:"#elm",router:s.a,store:r.a})},SgXG:function(t,n){},UAgs:function(t,n){!function(t,n){function e(){var e=Math.floor(t.devicePixelRatio)||1,i=1/e,s=n.createElement("meta");s.setAttribute("name","viewport"),s.setAttribute("content","width=device-width,initial-scale="+i+",minimum-scale="+i+",maximum-scale="+i+",user-scalable=no"),n.head.appendChild(s);var a=n.documentElement;a.setAttribute("data-dpr",e);var o=75;o=a.clientWidth<1242?a.clientWidth/10:108,a.style.fontSize=o+"px",n.body.style.fontSize=12*e+"px"}t.addEventListener?(t.addEventListener("orientationchange",e,!1),n.addEventListener("DOMContentLoaded",e,!1)):(t.attachEvent("resize",e),n.onreadystatechange=function(){"complete"==n.readyState&&e()})}(window,document)},"UTg/":function(t,n,e){"use strict";var i,s=e("bOdI"),a=e.n(s),o=e("fZjL"),r=e.n(o),c=e("Zw6s");n.a=(i={},a()(i,c.a,function(t,n){t.location=n}),a()(i,c.b,function(t,n){var e=n.shopId,i=n.foodId,s=n.name,a=n.original_price,o=n.price,c=n.spec,l=n.index1,u=n.index2,d=t.carList,f=d[e]=d[e]||{};f[i]?f[i].count+=1:f[i]={name:s,original_price:a,price:o,spec:c,count:1,index1:l,index2:u};var v={};r()(d).forEach(function(t){v[t]=d[t]}),t.carList=v}),a()(i,c.c,function(t,n){var e=n.shopId,i=n.foodId,s=t.carList,a=s[e];a[i].count--,0===a[i].count&&delete a[i],console.log("car",s);var o={};r()(s).forEach(function(t){o[t]=s[t]}),t.carList=o}),a()(i,c.d,function(t,n){var e=n.shopId;t.carList[e]=null,delete t.carList[e],console.log("cleat_cart:",t.carList)}),i)},UtkO:function(t,n,e){"use strict";function i(t){e("0Aim")}var s=e("eEZb"),a=e("/myI"),o=e("VU/8"),r=i,c=o(s.a,a.a,r,null,null);n.a=c.exports},V83J:function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{attrs:{id:"msite"}},[e("header",{staticClass:"content"},[e("div",{staticClass:"smallContent"},[t.address?e("div",{staticClass:"left"},[e("i",{staticClass:"fa fa-map-marker"}),t._v(" "),e("span",[t._v(t._s(t.address.name))]),t._v(" "),e("i",{staticClass:"fa fa-caret-down"})]):t._e(),t._v(" "),t.weather?e("aside",[t._m(0),t._v(" "),e("img",{attrs:{src:"https://fuss10.elemecdn.com/2/52/5383cfd55c8ba454449f63f54ce2apng.png?imageMogr/thumbnail/!69x69r/gravity/Center/crop/69x69/"}})]):t._e()])]),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),e("div",{staticClass:"lunbo"},[t.sort?e("div",{staticClass:"entry",on:{touchstart:t.touchStart,touchmove:t.touchMove,touchend:t.touchEnd}},[e("div",{staticClass:"list1"},t._l(t.sort[0].entries,function(n,i){return i<8?e("a",{attrs:{href:"#"}},[e("img",{attrs:{src:t.getImgUrl2(n.image_hash,"90x90")}}),t._v(" "),e("p",[t._v(t._s(n.name))])]):t._e()})),t._v(" "),e("div",{staticClass:"list2"},t._l(t.sort[0].entries,function(n,i){return i>7?e("a",{attrs:{href:"#"}},[e("img",{attrs:{src:t.getImgUrl2(n.image_hash,"90x90")}}),t._v(" "),e("p",[t._v(t._s(n.name))])]):t._e()}))]):t._e(),t._v(" "),e("div",{staticClass:"dots"},[e("i",{staticClass:"fa fa-circle dot",class:{active:t.position.isActive}}),t._v(" "),e("i",{staticClass:"fa fa-circle dot",class:{active:!t.position.isActive}})])]),t._v(" "),t.location?e("sale-List",{attrs:{latitude:t.location.latitude,longitude:t.location.longitude}}):t._e(),t._v(" "),t._m(3),t._v(" "),e("rain-footer")],1)},s=[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"weather"},[e("h2",[t._v("26")]),t._v(" "),e("p",[t._v("多云天")])])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"search"},[e("a",{attrs:{href:"#"}},[e("i",{staticClass:"fa fa-search"}),t._v(" "),e("span",[t._v("搜索商家、商品名称")])])])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"hot-word"},[e("a",{attrs:{href:"#"}},[t._v("锅包肉")]),t._v(" "),e("a",{attrs:{href:"#"}},[t._v("锅包肉")]),t._v(" "),e("a",{attrs:{href:"#"}},[t._v("锅包肉")]),t._v(" "),e("a",{attrs:{href:"#"}},[t._v("锅包肉")]),t._v(" "),e("a",{attrs:{href:"#"}},[t._v("锅包肉")]),t._v(" "),e("a",{attrs:{href:"#"}},[t._v("锅包肉")])])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"loaded"},[e("i",{staticClass:"fa fa-spinner fa-spin"})])}],a={render:i,staticRenderFns:s};n.a=a},XFAn:function(t,n,e){"use strict";var i=e("8Mze");n.a={name:"activity",props:["activities"],components:{star:i.a}}},YaEn:function(t,n,e){"use strict";(function(t){var i=e("7+uW"),s=e("/ocq"),a=e("KWv7");i.a.use(s.a),n.a=new s.a({mode:"history",base:t,routes:a.a})}).call(n,"/")},Zw6s:function(t,n,e){"use strict";e.d(n,"a",function(){return i}),e.d(n,"b",function(){return s}),e.d(n,"c",function(){return a}),e.d(n,"d",function(){return o});var i="SAVE_LOCATION",s="ADD_CAR",a="REDUCE_CAR",o="CLEAR_CAR"},ce18:function(t,n,e){"use strict";n.a={name:"footer"}},eEZb:function(t,n,e){"use strict";var i=e("21Sx"),s=e("hbxb"),a=e("8Mze"),o=e("JKEc");n.a={name:"saleList",props:["latitude","longitude"],mixins:[s.a],data:function(){return{list:[],offset:0,isBottom:!0}},components:{star:a.a,activity:o.a},methods:{toggle:function(t){var n=t.target.parentNode.previousElementSibling.children[2];console.log("actel",n),n.classList.toggle("toggle")},countStart:function(t){return 100*parseFloat(t/5).toFixed(2)+"%"},mToKm:function(t){if(t>1e3){return parseFloat(t/1e3).toFixed(2)+"km"}return t+"m"},windowScroll:function(){var t=this;if(document.body.scrollTop+window.innerHeight>=document.body.scrollHeight){if(console.log(this.isBottom),!this.isBottom)return;console.log("触发事件"),this.offset+=20,e.i(i.h)(this.latitude,this.longitude,this.offset).then(function(n){t.list=t.list.concat(n),t.isBottom=!0}).catch(function(t){return console.log(t)})}}},beforeDestroy:function(){window.removeEventListener("scroll",this.windowScroll,!1)},created:function(){window.addEventListener("scroll",this.windowScroll,!1)},mounted:function(){var t=this;e.i(i.h)(this.latitude,this.longitude,this.offset).then(function(n){return t.list=t.list.concat(n)}).catch(function(t){return console.log(t)})},watch:{offset:function(){console.log("watch"),this.windowScroll()}}}},fHwF:function(t,n){},fr5Q:function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"star"},[e("div",{staticClass:"star-dark"},t._l(5,function(t){return e("i",{staticClass:"fa fa-star"})})),t._v(" "),e("div",{staticClass:"star-light",style:{width:t.countStar(t.score)}},t._l(5,function(t){return e("i",{staticClass:"fa fa-star"})}))])},s=[],a={render:i,staticRenderFns:s};n.a=a},gDWM:function(t,n,e){"use strict";n.a={name:"star",props:["score"],methods:{countStar:function(t){return console.log("score",this.score),100*parseFloat(t/5).toFixed(2)+"%"}}}},hbxb:function(t,n,e){"use strict";e.d(n,"a",function(){return i});var i={methods:{getImgUrl:function(t,n){var e=t.substring(0,1),i=t.substring(1,3),s="";return s="jpeg"===t.substring(t.length-4)?t.substring(t.length-4):t.substring(t.length-3),"https://fuss10.elemecdn.com/"+e+"/"+i+"/"+t.substr(3)+"."+s+"?imageMogr/thumbnail/!"+n+"r/gravity/Center/crop/"+n+"/"},getImgUrl2:function(t,n){var e=t.substring(0,1),i=t.substring(1,3),s=t.substring(t.length-4),a=t.substr(3),o="https://fuss10.elemecdn.com/"+e+"/"+i+"/"+a+"."+s+"?imageMogr/thumbnail/!"+n+"r/gravity/Center/crop/"+n+"/";return o},getBackgroundImgUrl:function(t){var n=t.substring(0,1),e=t.substring(1,3),i="";return i="jpeg"===t.substring(t.length-4)?t.substring(t.length-4):t.substring(t.length-3),"url('https://fuss10.elemecdn.com/"+n+"/"+e+"/"+t.substr(3)+"."+i+"?imageMogr/format/webp/thumbnail/!40p/blur/50x40/')"}}}},"l+I4":function(t,n,e){"use strict";var i=e("NYxO"),s=e("7+uW"),a=e("UTg/");s.a.use(i.a);var o={location:null,carList:{}};n.a=new i.a.Store({state:o,mutations:a.a})},liFj:function(t,n){},mt3n:function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{attrs:{id:"rain-elm"}},[e("router-view")],1)},s=[],a={render:i,staticRenderFns:s};n.a=a},mzkE:function(t,n,e){"use strict";function i(t){e("Hl8z")}var s=e("ce18"),a=e("srFF"),o=e("VU/8"),r=i,c=o(s.a,a.a,r,null,null);n.a=c.exports},r2zp:function(t,n,e){"use strict";e.d(n,"a",function(){return a}),e.d(n,"b",function(){return o});var i=e("mvHQ"),s=e.n(i),a=function(t,n){t&&("string"!=typeof n&&(n=s()(n)),window.localStorage.setItem(t,n))},o=function(t){var n=window.localStorage.getItem(t);return JSON.parse(n)}},srFF:function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("footer",[e("router-link",{attrs:{to:"/msite"}},[e("i",{staticClass:"fa fa-edge"}),t._v(" "),e("span",[t._v("外卖")])]),t._v(" "),e("router-link",{attrs:{to:"/discover"}},[e("i",{staticClass:"fa fa-safari"}),t._v(" "),e("span",[t._v("发现")])]),t._v(" "),e("router-link",{attrs:{to:"/order"}},[e("i",{staticClass:"fa fa-file-text-o"}),t._v(" "),e("span",[t._v("订单")])]),t._v(" "),e("router-link",{attrs:{to:"/profile"}},[e("i",{staticClass:"fa fa-user-o"}),t._v(" "),e("span",[t._v("我的")])])],1)},s=[],a={render:i,staticRenderFns:s};n.a=a},wdvn:function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"index-activitityList"},[t._l(t.activities,function(n,i){return i<2?e("div",[e("div",{staticClass:"index-oneAct"},[e("i",{staticClass:"act-icon",style:{background:"#"+n.icon_color}},[e("span",[t._v(t._s(n.icon_name))])]),t._v(" "),e("span",[t._v(t._s(n.description))])])]):t._e()}),t._v(" "),e("div",{staticClass:"toggle"},t._l(t.activities,function(n,i){return i>1?e("div",{staticClass:"index-oneAct"},[e("i",{staticClass:"act-icon",style:{background:"#"+n.icon_color}},[e("span",[t._v(t._s(n.icon_name))])]),t._v(" "),e("span",[t._v(t._s(n.description))])]):t._e()}))],2)},s=[],a={render:i,staticRenderFns:s};n.a=a}},["NHnr"]);
//# sourceMappingURL=app.7dbbdc9c4bbdbf3cc239.js.map