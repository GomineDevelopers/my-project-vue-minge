<template>
<div class="intro-wrapper">
   <vue-headful title="联系我们"/>
  <div class="introduction_header-bg"></div>
   <div class="content">
    <el-row>
      <div class="intro-wrapper-bg">
        <el-row class="button-wrapper">
          <el-col :span="24"><el-button type="primary" size="large" round @click="godetail">民革简介</el-button></el-col>
        </el-row>
      </div>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="intro-constructor-bg " >
          <el-row  class="button-wrapper">
            <el-col :span="24"><el-button  @click="clickStructure" type="primary" size="large" round >
              组织架构
              <img src="../../static/image/partyStructure.png" width="100%" alt="组织架构的图片" v-gallery v-show="false" ref="hiddenImg">
            </el-button></el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "introduction",
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    godetail() {
      this.$router.push({name: "IntroDetail"});
    },
    clickStructure(){
      debugger
      this.$refs.hiddenImg.click();
    }
  }
};
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
.intro-wrapper-bg,
.intro-constructor-bg {
  display: flex;
  align-content: center;
  align-items: center;
  width: 100%;
  height: 28vh;
  background-size: 100% 100%;
  border-radius: 5px;
  margin-bottom: 2vh;
  box-shadow: 0px 0px 5px 5px #99999940;
}
.intro-wrapper-bg {
  background-image: url("../../static/image/intro-wrapper-bg.jpg");
}
.intro-constructor-bg {
  background-image: url("../../static/image/intro-constructor-bg.png");
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
.notice{
  font-size: .5rem;
}
</style>
