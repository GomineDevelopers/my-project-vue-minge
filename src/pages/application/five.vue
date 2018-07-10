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
            <el-button type="primary" round class="bottom-btn" @click="nextPage">下一页</el-button>
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
      },
      methods:{
        nextPage:function () {
          this.$router.push({name:'ApplicationSix'});
        }
      }
    }
</script>

<style scoped>
  @import '../../../static/css/application.css';
</style>
