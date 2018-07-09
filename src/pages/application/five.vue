<template>
    <div>
      <div class="application_header"></div>
      <div class="application_bg">
        <div class="container">
          <div class="content">
            <el-row>曾参加党派团队</el-row>
            <el-row class="addDiv"><span class="addSome">+添加党派经历</span></el-row>
            <el-row><el-input v-model="partyTeam" class="inputText" clearable></el-input></el-row>
            <el-row><span class="necessary">*</span>家庭成员状况</el-row>
            <el-row class="addDiv"><span class="addSome">+添加家庭成员信息</span></el-row>
            <el-row><el-input v-model="familyMember" class="inputText" clearable></el-input></el-row>
            <el-row>社会关系</el-row>
            <el-row class="addDiv"><span class="addSome">+添加社会关系</span></el-row>
            <el-row><el-input v-model="socialRelation" class="inputText" clearable></el-input></el-row>
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
        name: "five",
      data(){
          return {
            partyTeam:'',
            familyMember:'',
            socialRelation:''
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
