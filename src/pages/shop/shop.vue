<!--TODO html-->
<template>
    <div id="shop">
        <div class="index-root">
            <div class="index-scroll" ref="indexScroll">
                <!--TODO 1 商家头部-->
                <div class="top">

                    <!--TODO V-IFZUOY作用: 反正数据没回来就是用,导致的错误-->
                    <div class="shop-header" v-if="shopHead">
                        <div class="shop-header-background"
                             :style="{backgroundImage: getBackgroundImgUrl(shopHead['image_path'])}">
                            <div class="meng"></div>
                        </div>

                        <!--TODO $router是Vue实例的一个属性, 不是自带的,是创建实例时添加的,作用是操作路由相关的逻辑-->
                        <!--TODO go(-1)是router对象的方法,作用是返回上一页-->
                        <div class="shop-header-arrow" @click="$router.go(-1)">
                            <i class="fa fa-angle-left"></i>
                        </div>
                        <div class="shop-header-main">

                            <!--TODO 这里的getImgUrl 写在计算属性里比写在方法里更好 具体介绍,请查看教程-->
                            <img v-bind:src="getImgUrl(shopHead['image_path'],'130x130')">
                            <div class="shop-header-content">
                                <h2 class="shop-header-shopName">{{shopHead['name']}}</h2>
                                <p class="shop-header-deliver">
                                        <span class="shop-header-deliverItem">
                                        </span>
                                    <span class="shop-header-deliverItem">
                                            {{shopHead['order_lead_time']}}分钟送达
                                        </span>
                                    <span class="shop-header-deliverItem">
                                            {{shopHead['piecewise_agent_fee']['description']}}
                                        </span>
                                </p>
                                <div class="shop-header-notice">
                                    <span>公告:</span>
                                    <span>{{shopHead.promotion_info}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="shop-header-activities">
                            <div class="act-container" v-if="shopHead['activities']">
                                <i>
                                    <span :style="{background:'#'+shopHead['activities'][0]['icon_color']}">{{shopHead['activities'][0]['icon_name']}}</span>
                                </i>
                                <span>{{shopHead['activities'][0]['description']}}</span>
                            </div>
                            <div class="act-item" @click="showAct()">{{shopHead['activities'].length}}个活动</div>
                        </div>
                    </div>

                    <transition name="fade">
                        <div class="activity" v-if="show">
                            <!--这里有一个组件,不知是啥东东-->
                            <div class="act-con">
                                <div class="act-con-container">
                                    <h2>{{shopHead['name']}}</h2>

                                    <p>
                                        <star :score="shopHead['rating']"></star>
                                    </p>
                                    <h3>优惠信息</h3>
                                    <div class="act-component">
                                        <activity :activities="shopHead['activities']"></activity>
                                    </div>

                                    <h3>
                                        <span>商家公告</span>
                                    </h3>

                                    <div>
                                        {{shopHead['promotion_info']}}
                                    </div>

                                </div>
                                <div class="act-con-close" @click="showAct()">
                                    <span>x</span>
                                </div>
                            </div>
                        </div>
                    </transition>

                </div>
                <!--TODO 1 商品头部-->

                <!--TODO 2 菜单栏-->
                <div class="bar">
                    <div class="bar-item" :class="{'bar-act': isGoods}" @click="showGoods()">
                        <span>商品</span>
                    </div>
                    <div class="bar-item" :class="{'bar-act': isComment}" @click="showComment()">
                        <span>评价</span>
                    </div>
                    <div class="bar-item" :class="{'bar-act': isShop}" @click="showShop()">
                        <span>店铺</span>
                    </div>
                </div>
                <!--TODO 2 菜单栏-->

                <!--TODO 3 商品 可以合并成1个DIV-->
                <div class="bar-goods" :style="isGoods ? height : disHeight">
                    <!--TODO 3.1 内容区域-->
                    <div class="menuview-main">
                        <!--TODO 3.1.1 左边栏目-->
                        <ul class="menuview-menuNav" ref="menuNav" @click="changeBorder()">

                            <li class="menuview-menuNav-item" v-for="(item,index) in shopContent"
                                :attr-index="index" :class="(index==superIndex? 'menuview-act' : '')">{{item['name']}}

                                <span class="dingweiRed" v-show="barCount[index]">{{barCount[index]}}</span>
                            </li>

                        </ul>

                        <!--TODO 3.1.2 右边商品区域-->
                        <div class="menuview-goods">

                            <!--TODO 显示商品区-->
                            <div class="scroll" @scroll="windowScroll" ref="scroll">
                                <dl v-for="(item1, index1) in shopContent">
                                    <!--TODO 商品标题-->
                                    <dt>
                                    <div class="category-title">
                                        <strong>{{item1['name']}}</strong>
                                        <span>{{item1['description']}}</span>
                                    </div>
                                    </dt>

                                    <!--TODO 商品详细信息-->
                                    <dd v-for="(item2, index2) in item1['foods']">

                                        <!--<h2>{{item2}}</h2>-->
                                        <div class="food-panel">
                                            <div v-if="item2['image_path']" class="main-img">
                                                <img v-bind:src="getImgUrl(item2['image_path'],'140x140')">
                                            </div>

                                            <div class="food-details">

                                                <header><span>{{item2['name']}}</span></header>
                                                <p class="detail-description">{{item2.description}}</p>

                                                <p class="detail-sales">
                                                    <span>月售{{item2.month_sales}}份</span>
                                                    <span>好评率{{item2.satisfy_rate+'%'}}</span>
                                                </p>

                                                <div class="details-money" v-if="foodSum.length">
                                                    <div class="car-money">
                                                        <span>¥</span>
                                                        <span v-if="item2['specfoods']">{{item2['specfoods']['0']['price']}}</span>
                                                    </div>

                                                    <div class="cart-button-add">

                                                        <span class="reduce" v-show="foodSum[index1][index2]"
                                                              @click="reduceCount(index1,index2, $event)">-</span>
                                                        <strong v-show="foodSum[index1][index2]" style="color: black;">{{foodSum[index1][index2]}}</strong>
                                                        <a v-if="!item2['specifications'].length" class="" ref="cart">
                                                            <span class="add" @click="addCount(index1,index2, $event)">+</span>

                                                        </a>

                                                        <a v-if="item2['specifications'].length" href="javascript:"
                                                           class="cart-button-choose" @click="closeBtn(index1, index2)">选规格</a>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </dd>

                                </dl>
                            </div>

                            <!--TODO 点击规格后的弹出框-->
                            <div class="alert-con">

                                <transition name="zoom">
                                    <div class="alert-specifications" v-if="isBtn">
                                        <h1>{{shopContent[index3]['foods'][index4]['name']}}</h1>
                                        <div class="specifications">
                                            <h2>
                                                {{shopContent[index3]['foods'][index4]['specifications'][0]['name']}}</h2>
                                            <a href="#"
                                               v-for="(item, index) in shopContent[index3]['foods'][index4]['specifications'][0]['values']"
                                               @click="changePrice(shopContent[index3]['foods'][index4]['specfoods'][index]['price'],index)"
                                               :style="index==speIndex? {color:'#3199e8'}: '' ">{{item}}</a>
                                        </div>
                                        <div class="price-choose">
                                            <p>
                                                <span>¥</span>
                                                <span v-if="foodPrice">{{foodPrice}}</span>
                                                <span v-else>
                                                    {{shopContent[index3]['foods'][index4]['specfoods'][0]['price']}}
                                                </span>
                                            </p>
                                            <a href="#" @click="chooseDone()">选好了</a>
                                        </div>

                                        <a href="#" @click="closeBtn" class="btn">
                                            x
                                        </a>
                                    </div>
                                </transition>

                                <transition name="fade">
                                    <div class="back" v-show="isBtn"></div>
                                </transition>

                            </div>

                        </div>
                    </div>

                </div>
                <div class="bar-comment" :style="isComment ? height : disHeight">
                    <h2>bar-comment</h2>
                </div>
                <div class="bar-shop" :style="isShop ? height: disHeight">
                    <h2>bar-shop</h2>
                </div>
                <!--TODO 3 商品-->

                <!--TODO 4 底部固定定位的购物车-->
                <div class="fixed-bottom">
                    <!--TODO 4.1 底部固定定位 可以和5合并-->
                    <div class="bottom-cart" @click="showCart">
                        <div class="cart-price">
                            <div class="cart-price-left" @animationend="removeAnimation" :class="{
'car-icon-animation':isAnimation}">
                                <i class="fa fa-shopping-cart"></i>
                                <span v-if="cartFoodSum"> {{cartFoodSum}}</span>

                                <!--TODO 4.1.1 掉落的小球-->
                                <div class="ball-container">
                                    <transition-group tag="div" name="drop"
                                                      v-on:before-enter="beforeEnter"
                                                      v-on:enter="enter"
                                                      v-on:after-enter="afterEnter">

                                        <div class="ball" v-for="(ball, index) in balls" v-show="ball.show"
                                             :key="index">
                                            <div class="inner inner-hook" ref="innerHook"></div>
                                        </div>

                                    </transition-group>
                                </div>
                                <!--TODO 4.1.1 掉落的小球结束-->

                            </div>
                            <div class="cart-price-right">
                                <p v-if="shopCarList">¥{{cartPriceSum}}</p>
                                <p v-else>¥0</p>
                                <p v-if="shopHead">{{shopHead['piecewise_agent_fee']['description']}}</p>
                            </div>
                        </div>
                        <!--<router-link :to="{path:'/shop',query:{id:item['id']}}" class="shop">-->

                        <router-link :to="{path:'/order',query:{shopId:shopId}}">去结算</router-link>
                    </div>
                    <!--TODO 4.1 底部固定定位 结束-->

                    <!--TODO 4.2 底部购物车-->
                    <div class="cart-con" v-if="shopCarList">

                        <transition name="dropUp">
                            <div class="show-cart" v-show="isCart">
                                <div class="cart-left">
                                    <span>购物车</span>
                                    <a href="#" @click="clickClear">清空</a>
                                </div>

                                <ul class="list">
                                    <li v-for="(food, foodId) in shopCarList" :key="foodId">
                                        <span class="list-title">{{food.name}}</span>
                                        <span class="list-price">
                                            <span class="origin-price" v-if="food.original_price">
                                                ¥{{food.original_price}}
                                            </span>
                                            <span>
                                                ¥{{food.price}}
                                            </span>
                                        </span>

                                        <span class="list-add">
                                            <span class="reduce" @click="reduceCount(food.index1, food.index2)">-</span>
                                            <span>{{food.count}}</span>
                                            <span class="add" @click="addCount(food.index1, food.index2)">+</span>
                                        </span>
                                    </li>

                                </ul>
                            </div>
                        </transition>

                        <transition name="fade">
                            <div class="backcolor" v-show="isCart">
                            </div>
                        </transition>

                    </div>
                    <!--TODO 4.2 底部购物车 结束-->
                </div>
                <!--TODO 4 底下固定定位的购物车 结束-->

            </div>
        </div>
    </div>
</template>
<!--TODO html-->

<!--TODO JS-->
<script type="text/ecmascript-6">

    import {
        getShopHead,
        getList,
        getShopContent
    } from '@/data/getData';

    import star from '@/components/start.vue';
    import activity from '@/components/activity.vue';
    import {mixin} from '@/config/getImgUrl';
    import {mapState, mapMutations} from 'vuex';
    import {setStore} from '../../config/localStore';
    export default {
        name: 'shop',

//       TODO 1 data(VUE)
        data: function () {
            return {
                shopHead: null,
                shopContent: null,
                show: false,
                isGoods: true,
                isShop: false,
                isComment: false,
                disHeight: {
                    height: 1252 + 'px',
                    display: 'none'
                },
                height: {
                    height: 1252 + 'px'
                },

                superIndex: 0, //利用索引实现左右联动
                heightArr: [],
                scrollHeight: 0, //记录menu滚动的高度

                foodSum: [],   //存储食物数量的数组

                isBtn: false, //弹出框

                barCount: [], //右侧边框的数量数组

                index3: '', //点击选规格时,判断选取的是哪一下标
                index4: '',

                foodPrice: '', //食物的价格

                speIndex: 0, //点击规格时,判断点击的是哪一个

                ballPlus: null,  //获取当前点击的元素
                ballShow: null,  //是否有小球掉落

                balls: [
                    {show: false},
                    {show: false},
                    {show: false},
                    {show: false},
                    {show: false},
                    {show: false}
                ],

                dropBalls: [],

                isAnimation: true,

                isCart: false,   //是否拉出购物车

                shopId: this.$route.query.id,

            }
        },

        mixins: [mixin],

        //     TODO 2 STAR component
        components: {
            star,       //TODO 2.1 STAR component
            activity    //TODO 2.2 activity component
        },

//      TODO 3 methods(VUE)
        methods: {

//            TODO 3.1 showAct(): 点击商家头部的活动,会弹出信息(黑框)
            showAct: function () {
                this.show = !this.show;
            },

//            TODO 3.2 获取
            showCart(){


                this.isCart = !this.isCart;
            },  //点击底部购物车,从底部往上拉出购物车中所有的商品
//            TODO 3.3
            changePrice(price, index){

                this.foodPrice = price;

                this.speIndex = index;
            },

            removeAnimation(){
                this.isAnimation = false;
            },

            closeBtn(index1, index2){

                this.index3 = index1;
                this.index4 = index2;

                this.isBtn = !this.isBtn;
                this.speIndex = 0; //点击关闭时,把之前的选择清除
            },

            chooseDone(){                           //点击选好了按钮触发的事件

                let arr = this.foodSum[this.index3];
                arr[this.index4] += 1;
                this.$set(this.foodSum, this.index3, arr);
                this.isBtn = !this.isBtn;
                //console.log(this.foodSum[this.index3]);
            },

            showGoods(){
                this.isGoods = true;
                this.isComment = false;
                this.isShop = false;
            },

            showComment(){
                this.isComment = true;
                this.isGoods = false;
                this.isShop = false;
            },

            showShop(){

                this.isShop = true;
                this.isGoods = false;
                this.isComment = false;
            },

            changeBorder(event){

                event = event || window.event;

                //获取父元素
                let rootEl = event.currentTarget;

                //获取点击的元素,索引
                let index = event.target.getAttribute('attr-index');

                console.log('rootEl', rootEl);

                //移除先前的样式
                rootEl.children[this.superIndex].classList.remove('menuview-act');

                //添加点击后的响应样式
                rootEl.children[index].classList.add('menuview-act');

                this.superIndex = index;

                //获取顶部距离
                this.getScrollTop();

            },

            getScrollTop(){

                let el = this.$refs.scroll;  //获取对象

                el.scrollTop = 0;

                //遍历数组获取响应的高度
                for (let i = 0; i < this.superIndex; i++) {

                    el.scrollTop += el.children[i].offsetHeight;

                }

            },

            windowScroll(){

                let el = this.$refs.scroll;

                //获取当前的索引后,映射左边的变化
                let ul = this.$refs.menuNav;

//                console.log('ul',ul);
//                console.log(el);

                //this.$refs.indexScroll.scrollTop = el.scrollTop;

                let scrollLength = el.scrollTop;  //身体右侧菜单栏滚动的高度
//                console.log(scrollLength);

                this.$refs.indexScroll.scrollTop += scrollLength - this.scrollHeight; //this.scrollHeight之前的滚动过的高度

                this.scrollHeight = scrollLength;

                //console.log('滚动高度',el.scrollTop);
                // console.log('当前高度',el.children[this.superIndex].scrollHeight);

                for (let i = 0; i < this.heightArr.length; i++) {

                    if (el.scrollTop < this.heightArr[i]) {

                        //根据this.superIndex,切换类
                        ul.children[this.superIndex].classList.remove('menuview-act');
                        ul.children[i].classList.add('menuview-act');

                        this.superIndex = i;
                        break;
                    }
                }

                this.computedHeight();

            },

            //增加食物数量
            //注意,形参,实参都不写event的时候,默认传入event对象,形参写event时,实参必须写$event,函数里面才能使用event对象
            addCount(index1, index2, event){

                let arr = this.foodSum[index1];

                arr[index2] += 1;

                // 只有这么写才可以触发数组的响应式
                this.$set(this.foodSum, index1, arr);

                // this.ballPlus = event.currentTarget; //点击加号时获取当前点击的元素
                // this.ballShow = true;   //显示动画小球
                //存储当前点击的元素
                if (event) {
                    this.drop(event.currentTarget);
                }


                //点击加号时,向listCar添加一条相关食物信息
                let food = this.shopContent[index1].foods[index2].specfoods[this.speIndex];
                // console.log(food);
                this.addFood(food.food_id, food.name, food.original_price, food.price, food.specs,index1,index2);
            },

            drop(el) {

               // 调用此函数表示已经点击,可以让小球开始掉落
                for(let i = 0; i < this.balls.length; i++){
                    let ball = this.balls[i];

                    if(!ball.show) {
                        ball.show = true;
                        ball.el = el;
                        this.dropBalls.push(ball);
                        return;
                    }

                }


            },

            //减少食物数量
            reduceCount(index1, index2, event){

                let arr = this.foodSum[index1];

                arr[index2] -= 1;
                // 只有这么写才可以触发数组的响应式
                this.$set(this.foodSum, index1, arr);

                //点击减号时减少购物车中的商品
                let food = this.shopContent[index1].foods[index2].specfoods[this.speIndex];
//                console.log('reFood',food);
                this.reduceFood(food.food_id);
            },

            //计算高度
            computedHeight(){

                let el = this.$refs.scroll;

                let heightSum = 0;

                //计算每一阶段的高度,存入数组当中
                for (let item of el.children) {

                    heightSum += item.offsetHeight;

                    this.heightArr.push(heightSum);
                }

            },

            //对获取的数据初始化
            dataInit(){

                //TODO 获取数据, 会调用beforeUpdate, updated重新编译模板
                getShopHead('38.8850242', '121.5332321', this.$route.query.id).then(res => {
                    this.shopHead = res;

                }).catch(err => {
                    console.log(err)
                });

                getShopContent(this.$route.query.id).then(res => {

                    //定义一个数据接收res

                    this.shopContent = res;

                    // console.log('初始化数组前,对象的值为:',this.shopContent);

                    //初始化一个二位数组
                    for (let i = 0; i < this.shopContent.length; i++) {

                        //向数组里添加foods数组,使之变成二位数组

                        let arr = new Array(this.shopContent[i]['foods'].length);

                        arr.fill(0);

                        this.foodSum[i] = arr;

                    }

                    //   console.log('数组的值',this.foodSum);
//                    for (let i = 0; i < this.foodSum.length; i++) {
//                        //let foods = this.foodSum[i];
//
//                            for (let j = 0; j < this.foodSum[i].length; j++) {
//
//                                console.log('初始化成功');
//
//                                this.foodSum[i][j] = 0;
//                            }
//                        }

                    //  console.log('初始化数组后,对象的值为:',this.shopContent);


                }).catch(err => {
                    console.log(err)
                });
                //TODO 获取数据, 会调用beforeUpdate, updated重新编译模板


                console.log('还在created里');

            },

            //过渡钩子函数
            beforeEnter(el) {
//                 //获取元素在屏幕中的位置
//                let rect = this.ballPlus.getBoundingClientRect();
//                console.log(rect);
//                let x = rect.left - 32;
//                let y = -(window.innerHeight - rect.top - 100);
//                console.log(y);
//
//                //外层 元素控制y轴方向的过渡
//
//                el.style.webkitTransform = 'translate3d(0, ' +y+'px, 0)';
//                el.style.transform = 'translate3d(0, ' +y+'px, 0)';
//
//                // 获取里层元素
//                let inner = el.getElementsByClassName('inner-hook')[0];
//                // 里层元素控制x轴方向的过渡
//                inner.style.webkitTransform = 'translate3d('+x+'px, 0, 0)';
//                inner.style.transform = 'translate3d('+x+'px, 0, 0)';
                let count = this.balls.length;

                while (count--) {

                    let ball = this.balls[count];
                    if (ball.show) {
                        let rect = ball.el.getBoundingClientRect();
                        console.log(rect);
                        let x = rect.left - 74;
                        let y = -(window.innerHeight - rect.top - 141);

                        // 外层元素控制y轴方向的过渡
                        el.style.webkitTransform = 'translate3d(0, ' + y + 'px, 0)';
                        el.style.transform = 'translate3d(0, ' + y + 'px, 0)';

                        // 获取里层元素
                        let inner = el.getElementsByClassName('inner-hook')[0];
                        // 里层元素控制x轴方向的过渡
                        inner.style.webkitTransform = 'translate3d(' + x + 'px, 0, 0)';
                        inner.style.transform = 'translate3d(' + x + 'px, 0, 0)';

                    }
                }

            },

            enter(el) {

                let rel = el.offsetHeight;
                this.$nextTick(function () {

                    el.style.webkitTransform = 'translate3d(0, 0, 0)';
                    el.style.transform = 'translate3d(0, 0, 0)';

                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = 'translate3d(0, 0, 0)';
                    inner.style.transform = 'translate3d(0, 0, 0)';
                });

            },

            afterEnter(el) {

                let ball = this.dropBalls.shift();

                if (ball) {
                    ball.show = false;
                }

                this.isAnimation = true;
            },

//          点击+号时,往state.carList中添加商品
            addFood(foodId, name, original_price, price, spec, index1, index2){
                this.$store.commit('ADD_CAR', {shopId: this.shopId, foodId, name, original_price, price, spec, index1, index2});
            },

            reduceFood(foodId){
                console.log('shopCarList:',this.shopCarList);
                this.$store.commit('REDUCE_CAR', {shopId: this.shopId, foodId})
            },

            //清空购物车
            clickClear(){
                this.$store.commit('CLEAR_CAR',{shopId: this.shopId});

                //自己不成熟的写法
//                this.foodSum = null;
//                this.carList[this.shopId] = null;
//                if (this.foodSum) {
//                    for (let i = 0; i < this.foodSum.length; i++) {
//                        for (let j = 0; j < this.foodSum[i].length; j++) {
//                            let arr = this.foodSum[i];
//
//                            arr[j] = 0;
//                            // 只有这么写才可以触发数组的响应式
//                            this.$set(this.foodSum, i, arr);
//                        }
//                    }
//                }


            },


        },

//       TODO 4 created(VUE)
        created(){

            console.log('----------created-----------');
            //TODO 4.1 初始化数据
            this.dataInit();

            // 进来时存储店家id
            setStore('shopId',this.shopId);
            console.log('this.shopContent', this.shopContent);

        },

//      TODO 5 mouted(VUE)
        mounted: function () {
            //初始化二位数组
            console.log('---------mounted------------');
            console.log('this.foodSum', this.foodSum);
            console.log('this.shopContent', this.shopContent);

            this.dataInit();

        },

//      TODO 6 computed(VUE)
        computed: {

            ...mapState(['location','carList']),

//            location: function () {
//                return this.$store.state.location;
//            },
//
//            carList: function () {
//                return this.$store.state.carList;
//            },

            //当前的商家列表
            shopCarList(){
//                console.log('carList:',this.carList[this.shopId]);
                return this.carList[this.shopId];
            },

            //计算购物车的总价
            cartPriceSum(){

                let price = 0;
                if (this.shopCarList) {
                    Object.values(this.shopCarList).forEach(function (food) {
                            price += food.count * Math.round(food.price * 100);
                    });
                }


                return price / 100;
            },

            //计算购物车食品的数量
            cartFoodSum() {

                let count = 0;

                if (this.shopCarList) {

                    Object.values(this.shopCarList).forEach(function (food) {
                            count += food.count;

                    });
                }


                return count;
            }


        },

//       TODO 7 watch(VUE)
        watch: {

            foodSum: function () {

                let count = [];

                let sum = 0;

                for (let i = 0; i < this.foodSum.length; i++) {

                    let arr = this.foodSum[i];

                    for (let j = 0; j < arr.length; j++) {

                        sum += arr[j];
                    }

                    count.push(sum);

                    sum = 0;
                }

                this.barCount = count;


            }
//            shopContent: function () {
//
//                console.log('----------进入watch-----------');
//                console.log('this.foodSum',this.foodSum);
//                console.log('this.shopContent', this.shopContent);
//
//                //初始化一个二位数组
//                for (let i = 0; i < this.shopContent.length; i++) {
//
//                    //向数组里添加foods数组,使之变成二位数组
//                    this.foodSum.push(this.shopContent[i]['foods']);
//
//                }
//
//
//                console.log('this.foodSum,hahah',this.foodSum);
//
//
//                for (let i = 0; i < this.foodSum.length; i++) {
//                        for (let j = 0; j < this.foodSum[i].length; j++) {
//
//                            console.log('初始化成功');
//
//                            this.foodSum[i][j] = 0;
//                        }
//                    }
//
//                //通过获取的数据计算高度
//              //  this.computedHeight();
//            }
        },


    }

</script>
<!--TODO JS-->

<!--TODO CSS-->
<style type="text/scss" lang="scss">

    /*TODO scss是css预处理器, 它可以在css代码使用变量,方法等,比如:将pxToRem()*/
    /*TODO lang=scss的作用: 项目编译时,可以使用scss处理器将scss处理成浏览器可以识别的css代码*/
    /*TODO 不写lang=scss,而使用了scss语法,编译时会出错,提示没有找到识别语法的依赖包*/
    /*TODO 在vue中使用scss需要下载相关的依赖包,在package文件中的devDependencies(开发环境)选项中,进入依赖包版本,在控制台运行npm install*/
    /*TODO type='text/scss'的作用: 让编译器识别scss语法,但是不写,也不影响运行*/
    /*TODO scss语法 导入mixin里面的相关方法,混合器等*/
    @import "../../scss/mixin";

    //TODO 渐变过渡元素
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.5s
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    //TODO 渐变过渡

    .zoom-enter-active, .zoom-leave-active {
        transition: all 0.3s ease-in-out;
    }

    .zoom-enter, .zoom-leave-to {
        transform: scale(0);
    }

    .zoom-enter-to, .zoom-leave {
        transform: scale(1);
    }

    #shop {

        height: 100%;
        color: rgb(51, 51, 51);
        font-size: pxToRem(24px);
        line-height: pxToRem(28.8px);

        .index-root {
            height: 100%;
            width: 100%;
            overflow-x: hidden;

            .index-scroll {
                height: 100%;
                width: 100%;
                overflow-y: auto;

                //TODO 1 头部数据
                .top {

                    width: 100%;
                    .shop-header {

                        color: rgb(255, 255, 255);
                        position: relative;
                        font-size: pxToRem(22px);
                        line-height: pxToRem(26.4px);
                        padding-bottom: pxToRem(60px);

                        //背景定位
                        .shop-header-background {

                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100%;
                            background-repeat: no-repeat;
                            background-size: cover;

                            .meng {
                                width: 100%;
                                height: 100%;
                                background-color: rgba(119, 103, 137, 0.47);
                            }

                        }

                        .shop-header-arrow {
                            position: relative;
                            @include property-of-rem('padding', 8px, 20px);
                            font-size: pxToRem(50px);
                            a {
                                display: inline-block;
                                i {
                                    height: pxToRem(50px);
                                    width: pxToRem(50px);

                                }
                            }

                        }

                        .shop-header-main {
                            @include flex-content();
                            position: relative;
                            @include property-of-rem('padding', 10px, 30px, 0px);
                            img {
                                height: pxToRem(130px);
                                width: pxToRem(130px);
                                margin-right: pxToRem(20px);

                            }

                            .shop-header-content {
                                width: pxToRem(538px);

                                h2 {
                                    font-size: pxToRem(35px);
                                    line-height: 42px;
                                    text-overflow: ellipsis;
                                    overflow: hidden;
                                    white-space: nowrap;
                                    font-weight: bold;
                                }

                                p {
                                    height: pxToRem(50px);
                                    width: pxToRem(50px);
                                    white-space: nowrap;

                                    span {
                                        line-height: pxToRem(24px);
                                        white-space: nowrap;
                                    }

                                }

                                .shop-header-notice {

                                    overflow: hidden;
                                    white-space: nowrap;
                                    -ms-text-overflow: ellipsis;
                                    text-overflow: ellipsis;
                                    line-height: pxToRem(40px);
                                    height: pxToRem(40px);
                                }
                            }
                        }

                        .shop-header-activities {
                            position: absolute;
                            left: pxToRem(30px);
                            right: pxToRem(30px);
                            bottom: pxToRem(10px);

                            .act-container {
                                @include flex-content($just-content: left);
                                font-size: pxToRem(22px);
                                line-height: pxToRem(36px);
                                padding-right: pxToRem(96px);
                                i {
                                    font-style: normal;
                                    @include flex-content($just-content: center);
                                    text-align: center;
                                    width: pxToRem(28px);
                                    margin-right: pxToRem(12px);

                                }

                                span {
                                    overflow: hidden;
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                }

                            }

                            .act-item {
                                position: absolute;
                                right: 0;
                                top: pxToRem(5px);

                            }
                        }
                    }

                    //设置过渡
                    .fade-enter-active, .fade-leave-active {
                        transition: opacity 0.5s;

                    }

                    .fade-enter, .fade-leave-to {
                        opacity: 0;
                    }

                    //点击活动显示商家信息
                    .activity {

                        height: 100%;
                        width: 100%;
                        position: fixed;
                        left: 0;
                        top: 0;
                        z-index: 100;
                        background-color: #262626;
                        padding-top: pxToRem(88px);

                        .act-con {

                            position: absolute;
                            width: 100%;
                            .act-con-container {
                                width: 100%;
                                position: absolute;
                                left: 0;
                                top: 0;
                                color: #ffffff;
                                overflow: auto;

                                h2 {
                                    font-size: pxToRem(36px);
                                    line-height: pxToRem(43.2px);
                                    text-align: center;

                                }

                                p {
                                    width: pxToRem(219px);
                                    margin-left: 50%;
                                    transform: translateX(-50%);

                                    i {
                                        font-size: pxToRem(45px);
                                    }
                                }

                                .act-component {
                                    margin-left: pxToRem(100px);
                                }

                                ul {
                                    line-height: pxToRem(28.8px);
                                    font-size: pxToRem(24px);
                                    li {
                                        text-align: left;
                                        margin-bottom: pxToRem(14px);
                                        display: list-item;
                                        i {
                                            text-align: center;
                                            span {
                                                list-style: none;
                                            }
                                        }

                                    }

                                }

                                h3 {

                                    background-position-x: 50%;
                                    background-position-y: 50%;
                                    background-size: 100% 1px;
                                    @include property-of-rem('margin', 60px, 0px, 40px);
                                    text-align: center;

                                }

                                div {

                                    line-height: pxToRem(28.8px);
                                    font-size: pxToRem(24px);
                                }
                            }

                            .act-con-close {
                                position: fixed;
                                left: 0;
                                right: 0;
                                color: #ffffff;
                                bottom: pxToRem(50px);
                                text-align: center;
                                border: 1px solid #888;
                                height: pxToRem(50px);
                                width: pxToRem(50px);
                                border-radius: 50%;
                                margin: auto;
                                span {
                                    font-size: pxToRem(24px);
                                    line-height: pxToRem(40px);
                                }

                            }

                        }

                    }
                }
                //TODO 1 头部数据

                //TODO 2 菜单栏
                .bar {
                    @include flex-content($just-content: space-around);
                    background-color: #ffffff;
                    line-height: pxToRem(80px);
                    color: rgb(102, 102, 102);

                    .bar-item {
                        text-align: center;
                        font-size: pxToRem(28px);
                        font-weight: bold;
                        flex: 1;
                        span {

                        }
                    }

                    //此类为点击切换类
                    .bar-act {
                        color: #3190e8;
                        font-weight: 700;
                        border-bottom-color: #3190e8;
                        border-bottom-style: solid;
                        border-bottom-width: pxToRem(5px);
                    }

                }
                //TODO 2 菜单栏

                /*TODO 3 商品详情*/
                //bar-goods
                .bar-goods {
                    width: 100%;
                    overflow-x: hidden;

                    .menuview-main {
                        height: 100%;
                        @include flex-content($align-items: top);

                        //左边ul区域
                        .menuview-menuNav {

                            position: relative;
                            overflow-y: auto;
                            height: 100%;
                            width: pxToRem(170px);

                            .menuview-menuNav-item {
                                position: relative;
                                @include property-of-rem('padding', 35px, 15px);
                                font-size: pxToRem(26px);

                            }

                            /*右上角小球*/
                            .dingweiRed {
                                position: absolute;
                                color: white;
                                width: pxToRem(30px);
                                height: pxToRem(30px);
                                line-height: pxToRem(30px);
                                text-align: center;
                                right: 0;
                                top: 0;
                                background-color: red;
                                font-size: pxToRem(20px);
                                border-radius: 50%;
                            }

                            /*这个类为活跃类*/
                            .menuview-act {
                                border-left: solid pxToRem(6px) #3190e8;
                                background-color: #ffffff;
                            }

                        }

                        //右边商品区域
                        .menuview-goods {

                            width: pxToRem(580px);
                            .scroll {
                                height: 100%;
                                overflow-y: auto;
                                overflow-x: hidden;
                                flex: 1;
                                dl {
                                    margin: 0;
                                    padding: 0;
                                    /*background: yellow;*/

                                    dt {
                                        margin: 0;
                                        padding: 0;
                                        background-color: rgb(241, 241, 241);
                                        color: rgb(51, 51, 51);
                                        @include property-of-rem('padding', 15px, 60px, 15px, 20px);
                                        position: relative;

                                        strong {
                                            color: rgb(102, 102, 102);
                                            font-size: pxToRem(28px);
                                            line-height: pxToRem(33.6px);
                                            margin-right: pxToRem(10px);
                                            font-weight: bold;

                                        }

                                        span {
                                            font-size: pxToRem(20px);
                                            overflow: hidden;
                                            white-space: nowrap;
                                            -ms-text-overflow: ellipsis;
                                            text-overflow: ellipsis;
                                            color: rgb(153, 153, 153);
                                        }

                                    }

                                    dd {
                                        min-height: pxToRem(230px);
                                        position: relative;

                                        .food-panel {

                                            @include flex-content($align-items: top);
                                            font-size: pxToRem(24px);
                                            @include property-of-rem('padding', 30px, 20px);
                                            background: #ffffff;
                                            /*图片*/
                                            .main-img {
                                                /*margin-right: 30%;*/
                                                width: 30%;
                                                img {

                                                }
                                            }

                                            /*图片右侧内容*/
                                            .food-details {
                                                width: pxToRem(540px);
                                                padding-bottom: pxToRem(50px);
                                                margin-left: pxToRem(20px);
                                                header {
                                                    font-weight: bold;
                                                    font-size: pxToRem(32px);
                                                    line-height: pxToRem(33px);

                                                }

                                                .detail-description {
                                                    font-size: pxToRem(19px);
                                                    font-weight: normal;
                                                    line-height: pxToRem(22.8px);
                                                    @include property-of-rem('padding', 10px, 0px);
                                                    color: rgb(153, 153, 153);

                                                }

                                                .detail-sales {
                                                    @include property-of-rem('margin', 13px, 0px);
                                                    line-height: pxToRem(22px);
                                                    font-size: pxToRem(22px);
                                                    color: rgb(102, 102, 102);
                                                    span:nth-child(2) {
                                                        margin-left: pxToRem(8px);

                                                    }

                                                }

                                                .details-money {
                                                    @include flex-content();

                                                    .car-money {
                                                        padding-bottom: pxToRem(7px);
                                                        line-height: pxToRem(32px);

                                                        font-size: pxToRem(32px);
                                                        font-weight: bold;
                                                        color: rgb(255, 102, 0);

                                                        span:nth-child(1) {
                                                            font-size: pxToRem(24px);
                                                            margin-right: pxToRem(-7px);
                                                        }

                                                    }

                                                    .cart-button-add {
                                                        strong {
                                                            color: rgb(102, 102, 102);
                                                            font-size: pxToRem(28px);
                                                            margin-left: pxToRem(10px);
                                                            margin-right: pxToRem(10px);
                                                        }

                                                        .add, .reduce {

                                                            display: inline-block;
                                                            line-height: pxToRem(30px);

                                                            width: pxToRem(40px);
                                                            height: pxToRem(40px);
                                                            border-radius: 50%;

                                                            background-color: #0089dc;
                                                            text-align: center;
                                                            color: white;
                                                            font-size: pxToRem(40px);
                                                        }

                                                    }

                                                    .cart-button-choose {
                                                        @include property-of-rem('padding', 7px);
                                                        font-size: pxToRem(24px);
                                                        border-radius: pxToRem(26px);
                                                        background-color: #0089dc;
                                                        text-align: center;
                                                        color: white;

                                                    }

                                                }

                                            }

                                        }
                                    }
                                }
                                img {
                                    height: pxToRem(162px);
                                    width: pxToRem(162px);
                                }
                            }

                            //弹出选规格框

                            .alert-con {
                                position: relative;
                                /*position: absolute;*/
                                /*top:0;*/
                                /*left: 0;*/
                                /*height: 100%;*/
                                /*width: 100%;*/
                                /*background-color: rgba(0,0,0,0.1);*/

                                .alert-specifications {

                                    position: fixed;
                                    left: pxToRem(75px);
                                    right: pxToRem(75px);
                                    top: pxToRem(500px);
                                    line-height: pxToRem(28.8px);
                                    font-size: pxToRem(24px);
                                    background-color: rgb(255, 255, 255);
                                    color: rgb(51, 51, 51);

                                    z-index: 100;

                                    h1 {

                                        text-align: center;
                                        color: #333;
                                        line-height: pxToRem(45px);
                                        @include property-of-rem('padding', 25px, 60px);
                                        font-size: pxToRem(32px);
                                    }

                                    .specifications {
                                        color: rgb(102, 102, 102);
                                        @include property-of-rem('padding', 0px, 0px, 40px, 30px);

                                        h2 {
                                            font-size: pxToRem(26px);
                                            line-height: pxToRem(40px);

                                        }

                                        a {
                                            display: inline-block;
                                            vertical-align: middle;
                                            text-align: center;
                                            white-space: nowrap;
                                            border: 1px solid #999;
                                            height: pxToRem(48px);
                                            line-height: 48px;
                                            @include property-of-rem('padding', 0px, 18px);
                                            @include property-of-rem('margin', 13px, 30px, 0px, 0px);

                                        }
                                    }

                                    .price-choose {

                                        @include flex-content();
                                        @include property-of-rem('padding', 25px, 30px);
                                        background-color: rgb(249, 249, 249);

                                        p {
                                            color: rgb(255, 96, 0);
                                            font-size: pxToRem(42px);
                                            line-height: pxToRem(42px);
                                            span:nth-child(1) {
                                                font-size: pxToRem(22px);
                                                margin-right: pxToRem(-10px);
                                            }
                                        }

                                        a {
                                            display: block;
                                            line-height: pxToRem(60px);
                                            background-color: rgb(49, 153, 232);
                                            color: rgb(255, 255, 255);
                                            font-size: pxToRem(28px);
                                            padding-left: pxToRem(25px);
                                            padding-right: pxToRem(25px);

                                        }
                                    }

                                    .btn {
                                        color: rgb(51, 51, 51);
                                        font-size: pxToRem(50px);
                                        position: absolute;
                                        right: pxToRem(30px);
                                        top: pxToRem(30px);

                                    }

                                }

                                //覆盖模板
                                .back {
                                    position: fixed;
                                    left: 0;
                                    top: 0;
                                    height: pxToRem(1334px);
                                    width: pxToRem(750px);
                                    background-color: rgba(0, 0, 0, 0.5);
                                }

                            }

                        }
                    }

                }

                //bar-comment
                .bar-comment {

                }

                //bar-shop
                .bar-shop {

                }
                //TODO 3 商品详情

                /*TODO 4 底下固定购物车*/
                .fixed-bottom {

                    position: fixed;
                    left: 0;
                    bottom: 0;

                    //TODO 4.1 底部购物车
                    .bottom-cart {
                        @include flex-content();
                        position: fixed;
                        left: 0;
                        bottom: 0;
                        width: 100%;
                        z-index: 101;
                        background-color: rgba(61, 61, 61, 0.9);
                        height: pxToRem(96px);
                        color: white;

                        .cart-price {
                            @include flex-content();

                            padding-left: pxToRem(20px);
                            .cart-price-left {

                                position: relative;
                                left: 0;
                                bottom: pxToRem(30px);
                                width: pxToRem(100px);
                                height: pxToRem(100px);
                                border-radius: 50%;
                                background-color: #00aaff;
                                text-align: center;
                                line-height: pxToRem(110px);
                                i {
                                    font-size: pxToRem(45px);
                                }

                                span {
                                    position: absolute;
                                    color: white;
                                    width: pxToRem(30px);
                                    height: pxToRem(30px);
                                    line-height: pxToRem(30px);

                                    right: 0;
                                    top: 0;
                                    background-color: red;
                                    font-size: pxToRem(20px);
                                    border-radius: 50%;

                                }

                                /*掉落的小球*/
                                .ball-container {
                                    /* 小球 */
                                    .ball {
                                        /* 固定定位 */
                                        position: fixed;
                                        left: 54px;
                                        bottom: 115px;
                                        z-index: 1300;

                                        &.drop-enter-active {
                                            transition: all .5s cubic-bezier(.62, -0.5, .89, .76);
                                            .inner {
                                                width: 40px;
                                                height: 40px;
                                                border-radius: 50%;
                                                background-color: rgb(0, 160, 220);
                                                transition: all .5s linear;
                                            }

                                        }

                                    }

                                }
                            }

                            /*动画效果*/
                            .car-icon-animation {
                                animation: drop-car 0.5s;
                            }

                            @keyframes drop-car {
                                0% {
                                    transform: scale(1)
                                }
                                25% {
                                    transform: scale(.8)
                                }
                                50% {
                                    transform: scale(1.1)
                                }
                                75% {
                                    transform: scale(.9)
                                }
                                100% {
                                    transform: scale(1)
                                }
                            }

                            .cart-price-right {
                                margin-left: pxToRem(50px);
                                font-size: pxToRem(32px);
                                line-height: pxToRem(38.4px);
                                p:nth-child(1) {
                                    font-size: pxToRem(36px);

                                }

                                p:nth-child(2) {
                                    font-size: pxToRem(20px);
                                    line-height: 24px;
                                }

                            }

                        }

                        a {
                            background-color: rgb(76, 217, 100);
                            font-size: pxToRem(30px);
                            height: pxToRem(96px);
                            line-height: 96px;
                            width: pxToRem(210px);
                            text-align: center;
                        }

                    }

                    //TODO 4.2 购物车里面的信息
                    .cart-con {

                        .backcolor {

                            position: fixed;
                            left: 0;
                            bottom: 0;
                            width: 100%;
                            height: 100%;
                            background-color: rgba(51, 51, 51, 0.3);

                        }

                        .show-cart {
                            position: fixed;
                            left: 0;
                            bottom: 0;
                            width: 100%;
                            z-index: 100;
                            transform: translateY(pxToRem(-96px));
                            font-size: pxToRem(32px);
                            line-height: pxToRem(38.4px);
                            color: rgb(51, 51, 51);

                            .cart-left {

                                background-color: #eceff1;
                                line-height: pxToRem(80px);
                                @include property-of-rem('padding', 0px, 25px);
                                @include flex-content();

                                span {

                                    padding-left: pxToRem(10px);
                                    border-left-color: rgb(29, 144, 232);
                                    border-left-width: pxToRem(7px);
                                    border-left-style: solid;

                                }

                                a {
                                    color: #000;
                                    font-size: pxToRem(26px);

                                }

                            }

                            .list {
                                background-color: white;
                                li {
                                    @include flex-content();
                                    @include property-of-rem('padding', 15px, 25px, 15px, 0px);
                                    margin-left: pxToRem(25px);
                                    line-height: pxToRem(38.4px);
                                    .add, .reduce {

                                        display: inline-block;
                                        line-height: pxToRem(30px);

                                        width: pxToRem(40px);
                                        height: pxToRem(40px);
                                        border-radius: 50%;

                                        background-color: #0089dc;
                                        text-align: center;
                                        color: white;
                                        font-size: pxToRem(40px);
                                    }

                                }
                            }

                        }

                        .dropUp-enter-active, .dropUp-leave-active {
                            transition: all .5s;
                        } ;

                        .dropUp-leave-to, .dropUp-enter {
                            transform: translateY(0);
                        }

                        .dropUp-enter-to, .dropUp-leave {
                            transform: translateY(pxToRem(-96px));
                        }

                    }
                }

            }

        }

    }

</style>
<!--TODO CSS-->
