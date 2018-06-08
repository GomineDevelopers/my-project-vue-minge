<template>
  <div class="center_no_bg ">
    <div class="info"><span>您好，您还不是民革成员暂无使用权限。</span></div>
    <div>
      <el-button type="primary" round   @click="goRegister">入党申请(非党员)</el-button>
    </div>
    <div>
      <el-button type="primary" round class="my-btn"  @click="goQuickRegister">快速验证(已是党员)</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "no-member",
    methods: {
      goQuickRegister: function () {
        this.$router.push({name: 'QuickRegister'});
      },
      goRegister: function () {
        this.$router.push({name: 'Register'});
      },
    }
  }
</script>

<style scoped>

  .info {
    width: 60%;
    margin: 8vh auto 6vh;
    height: 20vh;
    border: 1px dashed #B3B3B3;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center
  }
  .info span{
    width: 70%;
  }

  .el-button {
    width: 60%;
    padding: 12px 0;
    margin-bottom: 2vh;
  }

  .my-btn{
    background: none;
    color: #409EFF;
  }
</style>
