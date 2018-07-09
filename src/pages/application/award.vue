<template>
  <div class="application_inner_bg">
    <div class="container">
      <div class="title">主要成就及获奖情况</div>
      <div class="content">
        <el-row><span class="necessary">*</span>成就及获奖情况</el-row>
        <el-row>
          <el-input type="textarea" :rows="6" v-model="awards" class="inputText" clearable></el-input>
        </el-row>
        <el-row><span class="necessary">*</span>获奖级别成果水平</el-row>
        <el-row>
          <el-input v-model="achievements" class="inputText" clearable></el-input>
        </el-row>
        <el-row><span class="necessary">*</span>时间</el-row>
        <el-row>
          <el-date-picker v-model="time" type="date" size="large" placeholder="请选择"
                          class="dateInput inputText" :picker-options="pickerOptions1"></el-date-picker>
        </el-row>
      </div>
      <el-row class="application_btn">
        <el-button type="primary" round>保存</el-button>
        <el-button type="primary" round plain>删除</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
    export default {
        name: "award",
      data(){
          return{
            pickerOptions1: {
              disabledDate(time) {
                return time.getTime() > Date.now()
              }
            },
            awards:'',
            achievements:'',
            time:''
          }
      }
    }
</script>

<style scoped>
  .container {
    margin: 6vh 17vw;
  }

  .title {
    font-weight: bold;
    color: #185a88;
  }

  .content {
    text-align: left;
    margin-top: 2vh;
  }

  .necessary {
    color: #cb1414;
  }

  .content .inputText {
    padding: .6vh 0 1vh 0;
  }

  .dateInput {
    width: 100%;
  }

  .application_btn{
    padding-top: 2vh;
  }
</style>
