<template>
  <div class="center_bg ">
    <vue-headful title="我的民革"/>
    <div class="header">
      <div class="logo">
        <img src="../assets/webwxgeticon.jpg"/>
      </div>
      <div class="name">
        蔡一天
      </div>
    </div>
    <div class="row">
      <div class="title">
        <i class=" iconfont icon-icon-yxj-user"></i>&nbsp;<span class="text">个人中心<span class="red-point"></span></span>
        <span class="arrow"> <i class="el-icon-arrow-right"></i> </span>
      </div>
    </div>
    <div class="row">
      <div class="title">
        <i class=" iconfont icon-icon"></i>&nbsp;<span class="text">我的积分</span>
        <span class="arrow"> <i class="el-icon-arrow-right"></i> </span>
      </div>
    </div>
    <div class="row">
      <div class="title">
        <i class=" iconfont icon-wenzhang2"></i>&nbsp;<span class="text">我的提案</span>
        <span class="arrow"> <i class="el-icon-arrow-right"></i> </span>
      </div>
      <div class="content">
        <div class="content-area">
          <span class="comma"></span>
            <span class="content-text">
             <p>共提交了<span class="text-colored">12</span>次提案</p>
             <p>通过了<span class="text-colored">8</span>次提案</p>  
            </span>
        </div>

      </div>
    </div>
    <div class="row">
      <div class="title" @click="goComment">
        <i class=" iconfont icon-liuyan"></i>&nbsp;<span class="text">我的留言</span>
        <span class="arrow"> <i class="el-icon-arrow-right"></i> </span>
      </div>
      <div class="content">
          <div class="content-area">
            <span class="comma"></span>
              <span class="content-text">
                <p>共保存了<span class="text-colored">56</span>条留言</p>
                
              </span>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "center",
    data() {
      return {

      }
    },
    created() {
      this.getCenterData();
    },
    methods: {
      getCenterData: function () {
        let vm = this;
      },
      goComment: function () {
        this.$router.push({ name: 'CenterComment'})
      },
    }
  }

</script>

<style scoped>
  .header {
    position: relative;
    width: 100%;
    height: 19.2%;
  }

  .logo {
    background: white;
    position: absolute;
    top: 2vh;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    left: 50%;
    margin-left: -40px;

  }

  .logo img {
    height: 94%;
    border-radius: 50%;
    margin: 3% auto;
    padding: 0 3%;
  }

  .header .name {
    padding-top: 15vh;
    line-height: 4vh;
    position: relative;
  }

  .row {
    padding-top: .8vh;
  }

  .row .title {
    background: white;
    padding: 5px 30px;
    text-align: left;
    height: 4vh;
    line-height: 4vh;
  }

  .title .text {
    position: relative;
  }
 .row .content{
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: #fafafa;
   width: 100%;
   height: 18vh;
 }
 .content .content-area{
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   border: 1px dashed #ccc;
   border-radius: 5px;
   height: 10vh;
   width: 70%;
  padding: 5px;
  position: relative;
  
 }
 
 .content-text .text-colored{
   color: #2780c0;
   font-weight: bold;
 }
  .title .arrow {
    float: right !important;
    color: #CACACA;
  }
  
  .comma::after{
    content: "”";
    font-size: 50px;
    color: #ccc;
    border-radius: 4px;
    position: absolute;
    z-index: 1000;
    right: 10px;
    bottom: -25px;
  }
  .comma::before{
    content: "“";
    font-size: 50px;
    color: #ccc;
    border-radius: 4px;
    position: absolute;
    z-index: 1000;
    left: 10px;
    top: 0px;
  }
  .red-point::before {
    content: " ";
    border: 4px solid #E6616C;
    border-radius: 4px;
    position: absolute;
    z-index: 1000;
    right: 0%;
    margin-right: -12px;
    margin-top: 5px;
  }

  .icon-icon-yxj-user {
    color: #ED7663;
  }

  .icon-icon {
    color: #e9c72a
  }

  .icon-wenzhang2 {
    color: #37C276;
  }

  .icon-liuyan {
    color: #8395EA;
  }
</style>
