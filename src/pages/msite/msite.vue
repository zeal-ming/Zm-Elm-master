<template>
    <div id="msite">

        <header class="content">
            <div class="smallContent">
                <div class="left" v-if="address">
                    <i class="fa fa-map-marker"></i>
                    <span>{{address.name}}</span>
                    <i class="fa fa-caret-down"></i>
                </div>
                <aside v-if="weather">
                    <div class="weather">
                        <h2>26</h2>
                        <p>多云天</p>
                    </div>
                    <img src="https://fuss10.elemecdn.com/2/52/5383cfd55c8ba454449f63f54ce2apng.png?imageMogr/thumbnail/!69x69r/gravity/Center/crop/69x69/">
                </aside>
            </div>
        </header>
        <div class="search">
                <a href="#">
                    <i class="fa fa-search"></i>
                    <span>搜索商家、商品名称</span>
                </a>
            </div>
        <div class="hot-word">
            <a href="#">锅包肉</a>
            <a href="#">锅包肉</a>
            <a href="#">锅包肉</a>
            <a href="#">锅包肉</a>
            <a href="#">锅包肉</a>
            <a href="#">锅包肉</a>
        </div>

        <div class="lunbo">
            <div class="entry" v-if="sort" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">

                <div class="list1">
                    <a href="#" v-for="(item,index) in sort[0].entries" v-if="index<8">
                        <img v-bind:src="getImgUrl2(item.image_hash,'90x90')">
                        <p>{{item.name}}</p>
                    </a>
                </div>

                <div class="list2">
                    <a href="#" v-for="(item,index) in sort[0].entries" v-if="index>7">
                        <img v-bind:src="getImgUrl2(item.image_hash,'90x90')">
                        <p>{{item.name}}</p>
                    </a>
                </div>

            </div>
            <div class="dots">
                <i class="fa fa-circle dot" :class="{active: position.isActive}"></i>
                <i class="fa fa-circle dot" :class="{active: !position.isActive}"></i>
            </div>
        </div>
        <sale-List :latitude="location.latitude" :longitude="location.longitude" v-if="location"></sale-List>

        <div class="loaded"><i class="fa fa-spinner fa-spin"></i></div>
        <rain-footer></rain-footer>

    </div>

</template>

<script type="text/ecmascript-6">
    import rainFooter from '@/components/footer';
    import rem from '@/config/rem';
    import {
        setStore,
        getStore
    } from '@/config/localStore';

    import {
        getPosition,
        getAddress,
        getWeather,
        getHotWord,
        getSort
    } from '@/data/getData';

    import {mixin} from '@/config/getImgUrl';


    import saleList from '@/components/saleList';

    export default {
        name: 'msite',
        components: {
            rainFooter: rainFooter,
            saleList: saleList
        },

        data() {
            return {
                address: null,
                weather: null,
                location: null,
                hotWord: null,
                sort: null,
                position: {
                    startX: '',
                    moveX: '',
                    touchEl: '',
                    moveDistance: '',
                    touchPageSibling: '',
                    isActive: true,
                },
                scrollY:'',
            }
        },

        mixins: [mixin],

        methods: {

            //初始化数据
            initData: function () {

                getAddress(this.location.latitude, this.location.longitude).then(response => {this.address = response;
                }).catch(error => {
                    console.log('没有获取到值');
                    console.log(error);
                });

                getWeather(this.location.latitude, this.location.longitude).then(response => {
                    this.weather = response;
                }).catch(error => {
                    console.log(error);
                });

                getHotWord(this.location.latitude, this.location.longitude).then(response => {
                    this.hotWord = response;
                }).catch(error => {
                    console.log(error)
                });

                getSort(this.location.latitude, this.location.longitude).then(response => {
                    console.log('getSort', response);
                    this.sort = response
                }).then(error => {
                    console.log(error)
                });
            },

            //滚动事件
            touchStart(event) {

               // 获取点击时的水平距离
                this.position.startX = event.changedTouches[0].clientX;

                console.log('起始距离',this.position.startX);
                this.position.touchEl = event.target.offsetParent;

                this.position.touchPageSibling = this.position.touchEl.nextElementSibling || this.position.touchEl.previousElementSibling;

                console.log('触碰节点',this.position.touchEl);
                console.log('兄弟元素',this.position.touchPageSibling);


            },
            touchMove(event) {

                // 获取滑动时的水平距离
                this.position.moveX = event.changedTouches[0].clientX;

                //计算移动距离,向右移moveX递增,左移位为减
                let moveDistance = this.position.moveX - this.position.startX;

                this.position.moveDistance = moveDistance;

                //根据移动的正负,判断左移还是右移
                if (moveDistance > 0) {
                    //右移
                    this.position.touchEl.style.transform = 'translate(' + moveDistance + 'px)';
                    this.position.touchPageSibling.style.transform = 'translate(' + (-750 + moveDistance) + "px)";

                } else {
                    this.position.touchEl.style.transform = 'translate(' + moveDistance + 'px)';
                    this.position.touchPageSibling.style.transform = 'translate(' + (750 + moveDistance) + "px)";

                }

                console.log('touchMove');
            },
            touchEnd(event) {

                console.log('touchEnd');
                console.log(this.position.moveDistance);
                if (this.position.moveDistance > 375 || this.position.moveDistance < -375) {

                    this.position.touchEl.style.transform = 'translate(750px)';
                    this.position.touchPageSibling.style.transform = 'translate(0px)';

                    this.position.isActive = !this.position.isActive;
                } else {

                    this.position.touchEl.style.transform = 'translate(0px)';
                    this.position.touchPageSibling.style.transform = 'translate(750px)';

                }

                //判断完距离,需要初始化
                this.position.moveDistance = 0;
            },

        },

        async mounted(){

            try {

                let position = await getPosition();

                this.location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };

                setStore('location', this.location);

            } catch (error) {

                console.log(error);
                this.location = getStore('location');
            }


            this.$store.commit('SAVE_LOCATION', this.location);

        },



        watch: {

            location: function (newVal) {

                setStore('location', newVal);
                this.initData();

            }
        },


    }


</script>

<style lang="scss" type="text/scss">
    @import "../../scss/mixin.scss";

        /*头部*/

        #msite {

            height: 100%;

            .content {


                font-size: pxToRem(24px);
                line-height: pxToRem(28.8px);
                background-image: linear-gradient(90deg, #0af, #0085ff);
                @include property-of-rem('padding', 20px, 28px, 0px);

                .smallContent {
                    @include flex-content();
                    color: white;
                    font-size: pxToRem(24px);
                    height: pxToRem(69px);
                    line-height: pxToRem(28.8px);
                    .left {
                        @include flex-content();
                        width: pxToRem(416px);
                        span {
                            font-size: pxToRem(34px);
                            @include property-of-rem('margin', 0, 10px);
                            line-height: pxToRem(40.8px);
                            font-weight: bold;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        i:nth-child(1) {
                            font-size: pxToRem(40px);
                            padding: 0 10px;
                        }


                    }

                    aside {

                        @include flex-content();
                        color: white;
                        line-height: pxToRem(28.8px);
                        text-align: right;
                        .weather {

                            h2 {
                                font-size:  pxToRem(28px);
                                line-height: pxToRem(33.6px);
                            }

                            p {
                                line-height: pxToRem(24px);
                                font-size: pxToRem(20px);
                            }

                        }
                        img {
                            width: pxToRem(55px);
                        }

                    }

                }
            }

            /*搜索*/
            .search {
                position:sticky;
                top:0;
                z-index: 999;
                color: rgb(51, 51, 51);
                line-height: pxToRem(28.8px);
                background-image: linear-gradient(90deg, #0af, #0085ff);
                @include property-of-rem('margin', -1px, 0px);
                @include property-of-rem('padding', 15px, 28px);
                a {

                    @include flex-content(center);
                    width: pxToRem(700px);
                    height: pxToRem(72px);
                    padding-top: 10px;
                    background-color: white;

                    span {
                        color: rgb(102, 102, 102);
                        font-size: pxToRem(26px);
                        font-weight: bold;
                        line-height: pxToRem(31px);
                        align-items: center;
                    }
                    i {
                        font-size: 20px;
                    }

                }
            }

            /*热词*/
            .hot-word {
                background-image: linear-gradient(90deg, #0af, #0085ff);
                @include flex-content(space-around);
                height: pxToRem(72px);
                a {
                    font-size: 20px;
                    color: white;
                    margin-right: 15px;
                }
            }

            /*列表*/
            .lunbo {
                position: relative;
                .entry {

                    position: relative;
                    background-color: white;
                    height: pxToRem(354px);
                    overflow: hidden;

                    .list1 {
                        position: absolute;
                        a {
                            text-align: center;
                            font-size: pxToRem(24px);
                            line-height: pxToRem(28.8px);
                            display: inline-block;
                            padding-top: pxToRem(22px);
                            width: pxToRem(187.5px);
                            img {
                                width: pxToRem(90px);
                            }
                        }
                    }
                    .list2 {
                        @extend .list1;
                        position: absolute;
                        transform: translateX(pxToRem(750px));
                    }

                    .page {

                    }
                }

                .dots {
                    position: absolute;
                    left: 50%;
                    bottom: 10px;
                    transform: translateX(-50%);
                    .dot {
                        width: 8px;
                        height: 8px;
                        font-size: pxToRem(4px);

                        &.active {
                            color: #00aaff;
                        }
                    }
                }
            }

            /*加载圈*/
            .loaded {
                background: yellow;
                text-align: center;
                height: pxToRem(50px);
                line-height: pxToRem(50px);
                border: 1px solid red;
                padding-bottom: pxToRem(150px);
            }

        }


</style>