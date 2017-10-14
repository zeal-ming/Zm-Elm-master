<template>
<div id="login">
    <div class="input">
        用户名:<input type="text" v-model="account"> <br>
    </div>
    <div class="input">
        密&nbsp&nbsp&nbsp码: <input type="password" v-model="password"> <br>
    </div>
    <button @click="loginIn" class="button" >登录</button>
</div>
</template>

<script type="text/ecmascript-6">
    import {
        getStore,
        setStore,
    } from '@/config/localStore';

    export default {

        data : function (){
            return {
                account:'',
                password: '',
            }
        },

        methods : {

            loginIn : function () {

                setStore('user',this.user);
                this.$router.push('/order');
            },

        },

//        beforeUpdate: function () {
//
//            console.log('this.user',this.user);
//        },
//        mounted(){
//            console.log(this.user);
//        },
        computed: {

            user: function () {
                console.log('this.account',this.account);
                return {
                    account: this.account,
                    password: this.password,
                }
            }
        },
    }

</script>

<style type="text/scss" lang="scss">
    @import "../../scss/mixin";

    #login{
        margin-top: 500px;
    }
    .input {
        text-align: center;
        /*background-color: gold;*/
        font-size: 30px;

        input{
            height: 30px;
            width: 300px;
            margin-top: 30px;
        }

    }

.button {
    display: inline-block;
    text-align: center;
    width: 100%;
    font-size: 30px;
    margin-top: 30px;
    background-color: #00aaff;
}
</style>