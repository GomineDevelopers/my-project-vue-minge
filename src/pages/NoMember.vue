<template>
  <div class="center_no_bg ">
    <div class="info"><img src="../../static/image/no_member.png"/></div>
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
        this.$router.push({name: 'QuickValidate'});
      },
      goRegister: function () {
        this.$router.push({name: 'Apply'});
      },
    }
  }
</script>

<style scoped>

  .info {
    width: 80%;
    margin: 8vh auto 6vh;
    display: flex;
    justify-content: center;
    align-items: center
  }
  .info img{
    width: 100%;
    height: 100%;
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
