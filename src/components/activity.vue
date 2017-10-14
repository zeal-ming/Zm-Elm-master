<template>
    <div class="index-activitityList">

            <div v-for="(value,index) in activities" v-if="index < 2">

                <div class="index-oneAct">
                    <i class="act-icon" :style="{background:'#'+value['icon_color']}">
                        <span>{{value.icon_name}}</span>
                    </i>

                    <span>{{value.description}}</span>
                </div>


            </div>


            <div class="toggle">
                <div class="index-oneAct" v-for="(val,index) in activities" v-if="index > 1">
                    <i class="act-icon" :style="{background:'#'+val['icon_color']}"><span>{{val['icon_name']}}</span></i>

                    <span>{{val['description']}}</span>
                </div>
            </div>
        </div>
</template>

<script type="text/ecmasscript-6">

    import star from '@/components/start.vue';
    export default {
        name:'activity',
        props:['activities'],
        components: {
            star
        }

    }

</script>

<style type="text/scss" lang="scss">

    @import "../scss/mixin";


        .index-activitityList {

            .index-oneAct {

                font-size: pxToRem(26px);
                line-height: pxToRem(36px);
                margin-top: pxToRem(5px);
                i {
                    display: inline-block;
                    height: pxToRem(28px);
                    line-height: pxToRem(28px);
                    font-style: normal;
                    width: pxToRem(28px);
                    text-align: center;
                    span {

                        color: rgb(255, 255, 255);
                        font-size: pxToRem(22px);

                    }
                }
                span {
                    font-size: pxToRem(22px);
                }
            }

        }

        .index-btn {
            position: absolute;
            right: 0;
            top: 0;
            height: 100%;
            color: #999;
            line-height: pxToRem(1px);

        }

</style>