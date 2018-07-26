<template>
<div class="intro-wrapper">
  <el-row>
    <el-col :span="24">
    <div class="link-cover">
       组织架构
    </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
    <div class="link-cover" @click="gobaike">
       民革简介
    </div>
    </el-col>
  </el-row>
  </div>
</template>
<script>
export default {
  name: 'introduction',
  methods: {
    gobaike() {
      window.open('http://www.imooc.com')
    }
  }
}
</script>
<style scoped>
.link-cover {
  height: 15vh;
  border-radius: 5px;
  background: #fff;
  margin-bottom: 1vh;
  box-shadow: 10px 10px 5px 5px #999;
}
</style>
