<template>
  <div class="center_no_bg">
    <div class="no-container" v-if="statusId==1">
      <img src="../../static/image/shenhe.png"/>
      <span class="text">您好，您的党员申请正在审核中，请您耐心等待。</span>
      <i class="el-icon-d-arrow-right icon"></i>
      <div class="step-cover">
        <span class="dot active-dot dot1 "></span>
        <span class="dot dot1 blue"></span>
        <span class="dot dot2 grey"></span>
        <span class="dot dot3 grey"></span>
        <span class="line line1 grey"></span>
        <span class="line line2 grey"></span>
        <span class="top-text t1">审核期</span>
        <span class="top-text t2">考核期</span>
        <span class="bottom-text b1">提交申请</span>
        <span class="bottom-text b2">审核通过</span>
        <span class="bottom-text b3">考核通过</span>
      </div>
    </div>
    <div class="no-container" v-if="statusId==2">
      <img src="../../static/image/kaohe.png"/>
      <span class="text">您好，您的党员申请初审已通过，现处于一年考核期。</span>
      <i class="el-icon-d-arrow-right icon"></i>
      <div class="step-cover">
        <span class="dot active-dot dot2 "></span>
        <span class="dot dot1 blue"></span>
        <span class="dot dot2 blue"></span>
        <span class="dot dot3 grey"></span>
        <span class="line line1 blue"></span>
        <span class="line line2 grey"></span>
        <span class="top-text t1">审核期</span>
        <span class="top-text t2">考核期</span>
        <span class="bottom-text b1">提交申请</span>
        <span class="bottom-text b2">审核通过</span>
        <span class="bottom-text b3">考核通过</span>
      </div>
    </div>
    <div class="no-container" v-if="statusId==3">
      <img src="../../static/image/shenhe.png"/>
      <span class="text">您好，您的党员快速验证申请正在审核中，请您耐心等待。</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "member-status",
    data() {
      return {
        statusId: this.$route.params.statusId
      }
    },
    watch: {
      $route() {
        statusId = this.$route.params.statusId
      }
    }
  }
</script>

<style scoped>
  .no-container {
    width: 80%;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
  }

  .no-container img {
    width: 100%;
    height: 20vh;
    border-radius: 5px;
    margin-top: 1.5vh;
    box-shadow: 0px 0px 20px 5px #e9e9e9;
  }

  .no-container .text {
    margin: 1vh auto;
    text-align: justify;
  }

  .icon {
    font-size: 33px;
    transform: rotate(90deg);
    color: #a2b2bd;
    margin: auto;
  }

  .step-cover {
    position: relative;
    border: 1px dashed #a2b2bd;
    border-radius: 10px;
    height: 16vh;
    width: 100%;
    margin-top: 2vh;
  }

  .step-cover .dot {
    position: absolute;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    top: 50%;
    margin-top: -8px;
    margin-left: -8px;
    z-index: 1;
  }

  .step-cover .active-dot {
    margin-top: -11px;
    margin-left: -11px;
    width: 20px;
    height: 20px;
    background: white;
    border: 1px solid #5ab7f5;
  }

  .step-cover .dot1 {
    left: 15%;
  }

  .step-cover .dot2 {
    left: 50%;
  }

  .step-cover .dot3 {
    left: 85%;
  }

  .step-cover .line {
    position: absolute;
    width: 35%;
    height: 6px;
    top: 50%;
    margin-top: -3px;
  }

  .step-cover .line1 {
    left: 15%;
  }

  .step-cover .line2 {
    left: 50%;
  }

  .blue {
    background: #5ab7f5;
  }

  .grey {
    background: #d8d8d8;
  }

  .step-cover .top-text {
    color: #628ba8;
    font-size: 12px;
    position: absolute;
    top: 28%;
  }

  .t1 {
    left: 27%;
  }

  .t2 {
    left: 63%;
  }

  .step-cover .bottom-text {
    font-size: 12px;
    position: absolute;
    top: 65%;
    margin-left: -24px;
  }

  .b1 {
    left: 15%;
  }

  .b2 {
    left: 50%;
  }

  .b3 {
    left: 85%;
  }
</style>
