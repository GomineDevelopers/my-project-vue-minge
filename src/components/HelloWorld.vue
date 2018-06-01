<template>
  <div class="test">
    <div class="c1"></div>
    <div class="c2"></div>
    <div class="c3">审核中</div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .test {
    height: 70px;
    border: 1px solid black;
    margin: 10px;
    position: relative;
  }

  .test .c1 {
    width: 0;
    height: 0;
    border-top: 60px solid red;
    border-left: 60px solid transparent;
    position: absolute;
    top: 0;
    right: 0;

  }

  .test .c2 {
    width: 0;
    height: 0;
    border-top: 20px solid white;
    border-left: 20px solid transparent;
    position: absolute;
    top: 0;
    right: 0;
  }

  .test .c3 {
    top: 12px;
    right: -11px;
    color: white;
    position: absolute;
    width: 60px;
    height: 20px;
    transform: rotate(45deg);
    z-index: 111;
    font-size: 12px;
    text-align: center;
    letter-spacing: .5px;
  }


</style>
