<template>
  <div id="order">
    <h2>我是订单页面</h2>

    <rain-footer></rain-footer>
  </div>

</template>


<script type="text/ecmascript-6">
  import rainFooter from '@/components/footer';
  import {
      setStore,
      getStore
  } from '@/config/localStore';

  export default {
    name: 'order',
    data(){
        return {
            shopId: this.$route.query.shopId,
        }
    },

    methods:{

    },

      beforeRouteEnter(to, from, next){

          console.log('order beforeRouteEnter');
          console.log('to',to);
          console.log('from',from);
          console.log('this',this);
          console.log('getStore(user)',getStore('user'));
//          console.log('this.$route.query:', );
          if(!getStore('user')){
              next('/login');
          }

          next();
      },

      beforeRouteLeave(to, from, next){

          console.log('order beforeRouteLeave');
          console.log('to',to);
          console.log('from',from);
          console.log('this',this);
          next();
      },

    components: {
      rainFooter,

    }
  }
</script>

<style>


</style>