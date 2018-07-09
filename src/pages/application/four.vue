<template>
    <div>
      <div class="application_header"></div>
      <div class="application_bg">
        <div class="container">
          <div class="content">
            <el-row><span class="necessary">*</span>简历</el-row>
            <el-row class="addDiv"><span class="addSome">+添加工作简历</span></el-row>
            <el-row><el-input v-model="resume" class="inputText" clearable></el-input></el-row>
            <el-row>主要成就及获奖情况</el-row>
            <el-row class="addDiv"><span class="addSome">+添加获奖信息</span></el-row>
            <el-row><el-input v-model="award" class="inputText" clearable></el-input></el-row>
            <el-row>曾受过何种处分</el-row>
            <el-row><el-input v-model="punishment" class="inputText" clearable></el-input></el-row>
            <el-row>撤销处分情况</el-row>
            <el-row><el-row><el-input v-model="cancelPunish" class="inputText" clearable></el-input></el-row></el-row>
          </div>
          <el-row>
            <el-button type="primary" round class="bottom-btn">下一页</el-button>
          </el-row>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "four",
      data(){
          return {
            resume:'',
            award:'',
            punishment:'',
            cancelPunish:''
          }
      }
    }
</script>

<style scoped>
  .container{
    margin: 4vh 17vw 12vh 17vw;
  }

  .content{
    text-align: left;
    margin-top: 2vh;
  }

  .necessary{
    color: #cb1414;
  }

  .content .inputText{
    padding: .6vh  0 1vh 0;
  }

  .bottom-btn {
    margin-top: 1vh;
    width: 50%;
    padding: 12px 0;
    letter-spacing: 1px;
    box-shadow: 0px 0px 20px 5px #e9e9e9;
  }

  .addDiv{
    padding: .6vh 0;
  }
  .addSome{
    color: #A6A6A6;
    font-size: .8rem;
  }
</style>
