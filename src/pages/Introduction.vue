<template>
<div class="intro-wrapper">
   <vue-headful title="联系我们"/>
  <div class="introduction_header-bg"></div>
 <div class="content">
  <el-row>
    <el-col :span="24">
    <div class="intro-wrapper-bg">
      <el-row class="button-wrapper">
        <el-col :span="24"><el-button type="primary" size="large" round @click="gobaike">民革简介</el-button></el-col>
      </el-row>
     
    </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
    <div class="intro-constructor-bg " >
      <el-row  class="button-wrapper">
        <el-col :span="24"><el-button type="primary" size="large" round >组织架构</el-button></el-col>
      </el-row>
       
    </div>
    </el-col>
  </el-row>
  </div>
  </div>
  
</template>
<script>
export default {
  name: 'introduction',
  methods: {
    gobaike() {
      window.open(
        'https://baike.baidu.com/item/%E4%B8%AD%E5%9B%BD%E5%9B%BD%E6%B0%91%E5%85%9A%E9%9D%A9%E5%91%BD%E5%A7%94%E5%91%98%E4%BC%9A/1691501?fromtitle=%E6%B0%91%E9%9D%A9&fromid=1971533&fr=aladdin'
      )
    }
  }
}
</script>
<style scoped>
.intro-wrapper {
  background-color: #ebebeb;
}
.intro-wrapper {
  position: absolute;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.content {
  width: 90%;
  margin: 22vh auto;
}
.intro-wrapper-bg {
  display: flex;
  align-content: center;
  align-items: center;
  width: 100%;
  height: 22vh;
  background-image: url('../../static/image/intro-wrapper-bg.jpg');
  background-size: 100% 100%;
  border-radius: 5px;
  margin-bottom: 2vh;
  box-shadow: 0px 0px 5px 5px #99999940;
}
.intro-constructor-bg {
  display: flex;
  align-content: center;
  align-items: center;
  width: 100%;
  height: 22vh;
  background-image: url('../../static/image/intro-constructor-bg.png');
  background-size: 100% 100%;
  border-radius: 5px;
  margin-bottom: 2vh;
  box-shadow: 0px 0px 5px 5px #99999940;
}
.button-wrapper {
  width: 100%;
}
.button-wrapper button {
  width: 50%;
  font-size: 1rem;
  font-weight: bold;
  background-color: #2192e0;
}
</style>
