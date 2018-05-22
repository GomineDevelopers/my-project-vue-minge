<template>
  <div class="container">
    <vue-headful
      title="时政要闻"
    />
    <el-carousel :interval="5000" arrow="never">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane  name="first">
        <span slot="label"> 市委会动态</span>
        1
      </el-tab-pane>
      <el-tab-pane  name="second">
        <span slot="label"> 喜讯</span>
        2
      </el-tab-pane>
      <el-tab-pane  name="third">
        <span slot="label"> 专题报告</span>
        3
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: 'News',
    data() {
      return {
        activeName: 'first'
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

<style>
  .container {
    height: 100%;
  }

  .el-carousel {
    height: 30%;
  }

  .el-carousel__container {
    height: 100%;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 30vh;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .el-tabs__nav {
    height: 6vh;
    background: #3A88D5;
    width: 100%;
  }

  .el-tabs__item {
    width: 33.33%;
    color: #A4C3E4;
    height: 100%;
    line-height: 100%;
    vertical-align: top;
  }

  .el-tabs__item span{
    position: absolute;
    line-height: 4vh;
    width: 100%;
    left: 0;
    top: 50%;
    height: 4vh;
    margin-top: -2vh;
  }
  .el-tabs__item.is-active {
    color: white;
    font-weight: bold;
  }

  .el-tabs__item.is-active span::after {
    content: "";
    background: white;
    height: 5px;
    width: 5px;
    position: absolute;
    bottom: -2px;
    left: 50%;
    margin-left: -2.5px;
  }

  .el-tabs__active-bar {
    height: 0;
  }

  .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    padding-left: 20px;
    border-right: 1px solid #A4C3E4;
  }

  .el-tabs--top .el-tabs__item.is-top:last-child {
    padding-right: 20px;
    border-left: 1px solid #A4C3E4;
  }

  .el-tabs__header {
    margin: 0;
  }


</style>
