<template>
  <div id="discover">
    <h3>我是发现页面</h3>
    <input type="text" v-model="counter">
    <child v-bind:message="counter"></child>


    <rain-footer></rain-footer>
  </div>

</template>


<script type="text/ecmascript-6">
  import rainFooter from '@/components/footer';
  import {
      getPosition,
      getAddress
  } from '@/data/getData';

  import Child from '@/components/child';

  export default {
    name: 'discover',
    data(){
        return {
            counter: 0
        }
    },
    methods:{

        greet:function (event) {
            alert(event.target.tagName);
            alert('haha');
        },

        hit: function () {
            alert('点我');
        }
    },

    beforeCreate(){
        console.log('beforeCreate');
    },
    created(){
        console.log('created');
    },

    beforeMounte(){
        console.log('beforeMounted');
    },

    mounted(){
        console.log('mounted');
    },

    beforeDestroy(){
        console.log('beforeDestroy');
    },

    beforeRouteEnter(to, from, next){

        setTimeout(function () {
            console.log('discover beforeRouteEnter');
            console.log('to',to);
            console.log('from',from);
            console.log('this',this);
            next();
        },10000);

    },

    beforeRouteLeave(to, from, next){

        console.log('discover beforeRouteLeave');
        console.log('to',to);
        console.log('from',from);
        console.log('this',this);
        next();
    },
    components: {
      rainFooter,
        Child
    }
  }
</script>

<style>

</style>