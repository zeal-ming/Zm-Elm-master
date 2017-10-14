<template>
<div>
    <h2>我是child子组件</h2>
    <p>显示父组件传递的值</p>
    <p>{{childMessage}}</p>
    <p>{{message}}</p>
</div>
</template>

<script type="text/ecmasscript-6">

    export default {
        name:"child",
        props:['message'],
        data(){
            return {
                childMessage:'child data'
            }
        }
    }
</script>

<style>

</style>