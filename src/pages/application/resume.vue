<template>
  <div class="application_inner_bg">
    <div class="container">
      <div class="title">工作简历</div>
      <div class="content">
        <el-row><span class="necessary">*</span>工作单位</el-row>
        <el-row>
          <el-input v-model="workUnit" class="inputText" clearable></el-input>
        </el-row>
        <el-row><span class="necessary">*</span>所在地</el-row>
        <el-row>
          <el-input v-model="localAddress" class="inputText" clearable></el-input>
        </el-row>
        <el-row><span class="necessary">*</span>职务</el-row>
        <el-row>
          <el-input v-model="job" class="inputText" clearable></el-input>
        </el-row>
        <el-row><span class="necessary">*</span>起始时间</el-row>
        <el-row>
          <el-date-picker v-model="startTime" type="date" size="large" placeholder="请选择"
                          class="dateInput inputText" :picker-options="pickerOptions1"></el-date-picker>
        </el-row>
        <el-row><span class="necessary">*</span>结束时间</el-row>
        <el-row>
          <el-date-picker v-model="endTime" type="date" size="large" placeholder="请选择"
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
        name: "resume",
      data(){
          return{
            workUnit:'',
            localAddress:'',
            job:'',
            startTime:'',
            endTime:'',
            pickerOptions1: {
              disabledDate(time) {
                return time.getTime() > Date.now()
              }
            }
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
