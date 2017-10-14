<template>
  <div id="profile">
    <h2>我是个人页面</h2>

    <button @click="add">+</button>

    <h1>{{count}}</h1>

    <button @click="jian">-</button>

    <br>


    <h2>{{local}}</h2>
    <rain-footer></rain-footer>
  </div>

</template>


<script type="text/ecmascript-6">
  import rainFooter from '@/components/footer';

  import {
      mapMutations,
      mapState

  } from 'vuex';
  export default {
    name: 'profile',
    components: {
      rainFooter
    },


    methods: {

//        ...mapMutations({
//            add: 'increment',
//            jian: 'decrement'
//        })

        add(){
            this.$store.dispatch('incrementAsync');
        },

        jian(){
            this.$store.commit('decrement');
        },


    },


    computed:{

        count: function () {

            return this.$store.state.count;
        },

        local: function () {

            return this.$store.state.location;

        }

    }

  }
</script>

<style>

  button {
    font-size: 30px;
  }
</style>