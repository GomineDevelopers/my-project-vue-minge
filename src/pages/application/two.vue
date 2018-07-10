<template>
    <div>
      <div class="application_header"></div>
      <div class="application_bg">
        <div class="container">
          <div class="content">
            <el-row>职称</el-row>
            <el-row><el-input v-model="title" class="inputText" clearable></el-input></el-row>
            <el-row><span class="necessary">*</span>身份证号码</el-row>
            <el-row><el-input v-model="IDCard" class="inputText" clearable></el-input></el-row>
            <el-row><span class="necessary">*</span>学历学位</el-row>
            <el-row class="addDiv"><span class="addSome">+添加教育经历</span></el-row>
            <el-row><el-input v-model="degree" class="inputText" clearable></el-input></el-row>
            <el-row><span class="necessary">*</span>现工作单位</el-row>
            <el-row><el-input v-model="presentWorkingUnit" class="inputText" clearable></el-input></el-row>
            <el-row><span class="necessary">*</span>职务</el-row>
            <el-row><el-row><el-input v-model="job" class="inputText" clearable></el-input></el-row></el-row>
            <el-row><span class="necessary">*</span>单位地址</el-row>
            <el-row><el-input v-model="unitAddress" class="inputText" clearable></el-input></el-row>
            <el-row><span class="necessary">*</span>单位电话</el-row>
            <el-row><el-input v-model="workTel" class="inputText" clearable></el-input></el-row>
            <el-row><span class="necessary">*</span>单位邮编</el-row>
            <el-row><el-input v-model="postcode" class="inputText" clearable></el-input></el-row>
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
      name: "two",
      data(){
          return{
            title:'',
            IDCard:'',
            degree:'',
            presentWorkingUnit:'',
            job:'',
            unitAddress:'',
            workTel:'',
            postcode:''
          }
      },
      methods:{
        nextPage:function () {
          this.$router.push({name:'ApplicationThree'});
        }
      }
    }
</script>

<style scoped>
  @import '../../../static/css/application.css';
</style>
