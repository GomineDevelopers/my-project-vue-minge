<template>
  <div class="parent">
    <div class="side">侧栏</div>
    <div class="main">主栏</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .parent{
    width: 810px;
    height: 500px;
    display: inline-block;
  }

 .side{
   width: 200px;
   height: 200px;
   background: red;
   float: left;
   vertical-align: middle;
 }
  .main{
    width: 600px;
    height: 200px;
    background: blue;
    float: right;
    vertical-align: middle;
  }
</style>
