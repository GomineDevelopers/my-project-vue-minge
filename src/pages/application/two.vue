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
            <el-row class="addDiv"><div @click="addDegree" class="addSome">+添加教育经历</div></el-row>
            <el-row v-for="(item,index) in educationShow" :key="index">
              <el-input class="inputText" v-model="educationShow[index]" clearable readonly @focus="goDetail(index)"></el-input>
            </el-row>
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
            educationShow:[],
            presentWorkingUnit:'',
            job:'',
            unitAddress:'',
            workTel:'',
            postcode:''
          }
      },
      mounted(){
        let vm = this;
        let cookieData = JSON.parse(vm.$commonTools.getCookie("cookieData"));

        if(cookieData.education != undefined){
          cookieData.education.forEach(function (ele,index,arr) {
            let str = ele.educationType + ',' + ele.graduateSchool;
            vm.educationShow.push(str);
          });
        }
      },
      methods:{
        validator(){
          let vm = this;
          let msg = '';
          if(!vm.IDCard){
            msg = "请填写身份证号码";
          }else if(vm.educationShow.length == 0){
            msg = "请填写学历学位";
          }else if(!vm.presentWorkingUnit){
            msg = "请填写现工作单位";
          }else if(!vm.job){
            msg = "请填写职务";
          }else if(!vm.unitAddress){
            msg = "请填写单位地址";
          }else if(!vm.workTel){
            msg = "请填写单位电话";
          }else if(!vm.postcode){
            msg = "请填写单位邮编";
          }

          if (msg) {
            vm.$message.error(msg);
            return false;
          } else {
            return true;
          }
        },
        nextPage:function () {
          let vm = this;
          let temp = {};
          temp = JSON.parse(vm.$commonTools.getCookie("cookieData"));
          temp.job = vm.title;
          temp.identity = vm.IDCard;
          temp.employer = vm.presentWorkingUnit;
          temp.position = vm.job;
          temp.unit_address = vm.unitAddress;
          temp.unit_phone = vm.workTel;
          temp.unit_email = vm.postcode;


          if(vm.validator()){
            vm.$commonTools.setCookie("cookieData",JSON.stringify(temp),1);
            vm.$router.push({name:'ApplicationThree'});
          }
        },
        addDegree:function () {
          this.$router.replace({name:'ApplicationDegree'});
        },
        goDetail:function (index) {
          this.$router.push({name:'ApplicationDegree',query: { index: index }});
        }
      }
    }
</script>

<style scoped>
  @import '../../../static/css/application.css';
</style>
