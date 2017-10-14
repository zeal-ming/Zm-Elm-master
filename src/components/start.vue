<template>
    <div class="star">
        <div class="star-dark">
            <i class="fa fa-star" v-for="n in 5"></i>
        </div>
        <div class="star-light" :style="{width: countStar(score)}">
            <i class="fa fa-star" v-for="n in 5"></i>
        </div>
    </div>
</template>

<script type="text/ecmasscript-6">

    export default {
        name:'star',
        props:['score'],
        methods:{
            countStar: function(num){
                console.log('score',this.score);
                return parseFloat(num / 5).toFixed(2) * 100 + '%'
            }
        }
    }
</script>

<style type="text/scss" lang="scss">
    @import "../scss/mixin.scss";

    .star {
        position: relative;
        font-size: pxToRem(22px);
        line-height: pxToRem(26.4px);

        .star-dark{

        }
        .star-light {
            position: absolute;
            overflow: hidden;
            white-space: nowrap;
            left: 0;
            top: 0;
            color: gold;
        }

    }
</style>