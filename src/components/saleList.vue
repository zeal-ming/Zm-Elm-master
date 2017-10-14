<template>
    <div id="saleList">
        <h3 class="index-title">推荐商家</h3>
        <div class="index-container" v-for="item in list">

            <!--容器左边-->
            <router-link :to="{path:'/shop',query:{id:item['id']}}" class="shop">
                <div class="index-logo">
                    <div class="logo-img">
                        <img :src="getImgUrl(item['image_path'],'130x130')">
                    </div>
                </div>
            </router-link>

            <!--容器右边-->
            <div class="index-main">
                <!--名字-->
                <div class="index-line">
                    <h3>{{item['name']}}</h3>
                </div>

                <!--订单数与星星-->
                <div class="index-line">
                    <star v-bind:score="item['rating']"></star>
                    <div class="index-rateWrap">
                        <span>{{item['rating']}}</span>
                        <span>月售{{item['recent_order_num']}}单</span>
                    </div>
                    <div class="index-delivery" v-if="item['delivery_mode']">
                        <span>{{item['delivery_mode']['text']}}</span>
                    </div>
                </div>

                <!--起送与配送-->
                <div class="index-line">
                    <div class="index-moneylimit">
                        <span>¥{{item['float_minimum_order_amount']}}起送</span>
                        <span v-if="item['piecewise_agent_fee']['description']">{{item['piecewise_agent_fee'].description}}</span>
                    </div>
                    <div class="index-timedistance">
                        <span>{{mToKm(item['distance'])}}</span>
                        <span>|</span>
                        <span>{{item['order_lead_time']+'分钟'}}</span>
                    </div>
                </div>

                <!--虚线-->
                <div class="dotted"></div>

                <!--活动-->
                <div class="index-activities">

                    <activity :activities="item['activities']"></activity>

                    <div class="index-btn" v-on:click="toggle">
                        <span>{{item['activities'].length}}个活动</span>
                        <i class="fa fa-caret-down"></i>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script type="text/ecmascript-6">

    import {
        getList
    } from '@/data/getData';

    import {mixin} from '@/config/getImgUrl';
    import star from '@/components/start';
    import activity from '@/components/activity';

    export default {
        name:'saleList',
        props:['latitude','longitude'],
        mixins:[mixin],

        data(){
            return {
                list:[],
                offset: 0,
                isBottom: true
            }
        },

        components:{
            star,
            activity
        },

        methods:{

            toggle:function(event){

                //获取前一个父元素节点的前一个节点
                let actEl = event.target.parentNode.previousElementSibling.children[2];
                console.log('actel',actEl);
                actEl.classList.toggle('toggle');

            },

            countStart: function(num){
                return parseFloat(num/5).toFixed(2) * 100 + '%'
            },

            mToKm: function(meter){

                if(meter > 1000) {

                    let m1 = parseFloat(meter / 1000).toFixed(2) + 'km';
                    return m1;

                } else {
                    return meter + 'm';
                }

            },


            windowScroll(){

                if(document.body.scrollTop + window.innerHeight >= document.body.scrollHeight) {

                     console.log(this.isBottom);
                     if(!this.isBottom) return

                     console.log('触发事件');

                     this.offset += 20;

                     getList(this.latitude, this.longitude, this.offset).then(res=>{

                     this.list=this.list.concat(res);

                     this.isBottom = true;

                     }).catch(err=>console.log(err));


                }

            }

        },

        beforeDestroy(){

            window.removeEventListener('scroll', this.windowScroll, false);
        },


       created(){

           window.addEventListener('scroll', this.windowScroll, false);

       },


        mounted(){

             getList(this.latitude, this.longitude, this.offset).then(res=>this.list=this.list.concat(res)).catch(err=>console.log(err));

        },

        watch: {


            //offset改变,往list数组里添加新增数据
            offset: function(){

                console.log('watch');
                this.windowScroll();
            }
        }

    }




</script>

<style type="text/scss" lang="scss">

    @import "../scss/mixin.scss";

    /*标题*/
    .index-title {
        background-color: rgb(255, 255, 255);
        color: rgb(51, 51, 51);
        display: block;
        font-size: pxToRem(32px);
        font-weight: 600;
        line-height: pxToRem(38.4px);
        margin-top: pxToRem(20px);
        @include property-of-rem('padding', 32px, 20px, 0px);
    }

    .toggle {
        display: none !important;
    }

    /*容器*/
    .index-container {

        display: flex;
        background-color: rgb(255, 255, 255);
        border-bottom-color: rgb(238, 238, 238);
        border-bottom-style: solid;
        border-bottom-width: 1px;
        line-height: pxToRem(26.4px);
        position: relative;
        font-size: pxToRem(22px);
        color: rgb(102, 102, 102);
        flex-basis: auto;
        flex-grow: 0;
        flex-shrink: 0;

        .shop {

            /*容器左边*/
            .index-logo {
                @include property-of-rem('padding', 30px, 20px);
                position: relative;
                .logo-img {
                    position: relative;
                    height: pxToRem(130px);
                    img {
                        position: relative;

                        display: block;
                        height: 100%;
                        width: 100%;

                    }
                }

            }
        }

        /*容器右边*/
        .index-main {

            @include property-of-rem('padding', 30px, 20px, 30px, 0px);
            width: pxToRem(580px);
            display: flex;
            justify-content: center;
            flex-direction: column;
            flex-grow: 1;
            line-height: pxToRem(26.4px);
            color: rgb(102, 102, 102);

            /*商品名字,订单,等*/
            .index-line {
                @include flex-content();

                h3 {
                    color: rgb(51, 51, 51);
                    font-size: pxToRem(30px);
                    height: pxToRem(32px);
                    line-height: pxToRem(36px);
                    font-weight: bold;
                }

                &:nth-child(2) {
                    margin-top: pxToRem(15px);
                }

                &:nth-child(3) {
                    margin-top: pxToRem(18px);
                }

                .index-moneylimit {
                    span:nth-child(1)::after {
                        content: '|';
                        margin: pxToRem(6px);
                        height: pxToRem(30px);
                    }
                }

                .index-delivery {
                    color: rgb(255, 255, 255);
                    background-color: rgb(68px, 165px, 255px);

                }

            }

            //虚线
            .dotted {
                border: dashed 0.5px #cccccc;
                @include property-of-rem('margin', 15px, 0px);
            }

            /*活动*/
            .index-activities {

                font-size: pxToRem(22px);
                line-height: 26.4px;
                position: relative;

                .index-btn {
                    position: absolute;
                    right: 0;
                    top: 0;
                    height: 100%;
                    color: #999;
                    line-height: pxToRem(1px);

                }
            }

        }

    }


</style>