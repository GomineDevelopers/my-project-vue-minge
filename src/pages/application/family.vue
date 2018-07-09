<template>
  <div class="application_inner_bg">
    <div class="container">
      <div class="title">家庭成员状况</div>
      <div class="content">
        <el-row><span class="necessary">*</span>姓名</el-row>
        <el-row>
          <el-input v-model="realName" class="inputText" clearable></el-input>
        </el-row>
        <el-row><span class="necessary">*</span>关系</el-row>
        <el-row>
          <el-input v-model="relationship" class="inputText" clearable></el-input>
        </el-row>
        <el-row><span class="necessary">*</span>出生日期</el-row>
        <el-row>
          <el-date-picker v-model="birthday" type="date" size="large" placeholder="请选择"
                          class="dateInput inputText" :picker-options="pickerOptions1"></el-date-picker>
        </el-row>
        <el-row><span class="necessary">*</span>文化程度</el-row>
        <el-row>
          <el-input v-model="educationDegree" class="inputText" clearable></el-input>
        </el-row>
        <el-row><span class="necessary">*</span>政治面貌</el-row>
        <el-row>
          <el-input v-model="political" class="inputText" clearable></el-input>
        </el-row>
        <el-row><span class="necessary">*</span>所在地</el-row>
        <el-row>
          <el-input v-model="localAddress" class="inputText" clearable></el-input>
        </el-row>
        <el-row>工作单位</el-row>
        <el-row>
          <el-input v-model="workUnit" class="inputText" clearable></el-input>
        </el-row>
        <el-row>职务</el-row>
        <el-row>
          <el-input v-model="job" class="inputText" clearable></el-input>
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
      name: "family",
      data(){
        return{
          realName:'',
          relationship:'',
          birthday:'',
          pickerOptions1: {
            disabledDate(time) {
              return time.getTime() > Date.now()
            }
          },
          educationDegree:'',
          political:'',
          localAddress:'',
          workUnit:'',
          job:''
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
