<template>
    <footer>
        <router-link to="/msite">
            <i class="fa fa-edge"></i>
            <span>外卖</span>
        </router-link>
        <router-link to="/discover">
            <i class="fa fa-safari"></i>
            <span>发现</span>
        </router-link>

        <router-link to="/order">
            <i class="fa fa-file-text-o"></i>
            <span>订单</span>
        </router-link>
        <router-link to="/profile">
            <i class="fa fa-user-o"></i>
            <span>我的</span>
        </router-link>
    </footer>

</template>


<script type="text/ecmascript-6">
    export default {
        name: 'footer'
    }

</script>

<style lang="scss" type="text/scss">

    @import "../scss/mixin.scss";

    footer {
            @include flex-content();
            height: pxToRem(100px);
            width: 100%;
            text-align: center;
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 999;
            color:rgb(51,51,51);
            background-color: white;
            padding-top: pxToRem(9px);
            line-height: pxToRem(28.8px);

        .fa {
            font-size: pxToRem(40px);
        }

        span {
            font-size: pxToRem(20px);
            line-height: pxToRem(24px);
            display: block;
            color: rgb(102,102,102);
        }

        a{
            flex: 1;
            /*line-height: pxToRem(28.8px);*/

            /*方法1:通过切换类*/
            &.active{
                color: #0089dc;
             }

             /*方法2:通过Vue添加的类名,改变字体颜色,此方法比较简单*/
            &.router-link-exact-active.router-link-exact-active{
                color: #0089dc;
             }
        }

    }


</style>