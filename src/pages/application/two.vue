<template>
    <div>
      <div class="application_header"></div>
      <div class="application_bg">
        <div class="container">
          <div class="content">
            <el-row>职称</el-row>
            <el-row><el-input v-model.trim="title" class="inputText" clearable></el-input></el-row>
            <el-row><span class="necessary">*</span>身份证号码</el-row>
            <el-row><el-input v-model.trim="IDCard" class="inputText" clearable></el-input></el-row>
            <el-row><span class="necessary">*</span>学历学位</el-row>
            <el-row class="addDiv"><div @click="addDegree" class="addSome">+添加教育经历</div></el-row>
            <el-row v-for="(item,index) in educationShow" :key="index">
              <el-input class="inputText" v-model="educationShow[index]" clearable readonly @focus="goDetail(index)"></el-input>
            </el-row>
            <el-row><span class="necessary">*</span>现工作单位</el-row>
            <el-row><el-input v-model.trim="presentWorkingUnit" class="inputText" clearable></el-input></el-row>
            <el-row><span class="necessary">*</span>职务</el-row>
            <el-row><el-row><el-input v-model.trim="job" class="inputText" clearable></el-input></el-row></el-row>
            <el-row><span class="necessary">*</span>单位地址</el-row>
            <el-row><el-input v-model.trim="unitAddress" class="inputText" clearable></el-input></el-row>
            <el-row><span class="necessary">*</span>单位电话</el-row>
            <el-row><el-input v-model.trim="workTel" class="inputText" clearable type="number"></el-input></el-row>
            <el-row><span class="necessary">*</span>单位邮编</el-row>
            <el-row><el-input v-model.trim="postcode" class="inputText" clearable type="number"></el-input></el-row>
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
        vm.getExitData();
        if(vm.$commonTools.getCookie("cookieData")){
          let cookieData = JSON.parse(vm.$commonTools.getCookie("cookieData"));
          if(cookieData.education != undefined){
            cookieData.education.forEach(function (ele,index,arr) {
              let str = ele.education_type + ',' + ele.profession+ ','
                      + ele.admission_time+ ',' + ele.graduation_time+ ',' + ele.education+','+ele.degree;
              vm.educationShow.push(decodeURI(str));
            });
          }
        }

      },
      methods:{
        getExitData(){
          let vm = this;
          if (JSON.parse(vm.$commonTools.getCookie("cookieData")).identity != undefined) {
            let cookieData = JSON.parse(decodeURI(vm.$commonTools.getCookie("cookieData")));
            vm.title = cookieData.job;
            vm.IDCard = cookieData.identity;
            vm.presentWorkingUnit = cookieData.employer;
            vm.job = cookieData.position;
            vm.unitAddress = cookieData.unit_address;
            vm.workTel = cookieData.unit_phone;
            vm.postcode = cookieData.unit_code;
          }
        },
        validator(){
          let vm = this;
          let msg = '';
          let regID = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
          if(!vm.IDCard){
            msg = "请填写身份证号码";
          }else if (vm.IDCard && !regID.test(vm.IDCard)) {
            msg = '身份证号码格式不正确'
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
        setCookies(){
          let vm = this;
          let temp = {};
          temp = JSON.parse(vm.$commonTools.getCookie("cookieData"));
          temp.job = encodeURI(vm.title);
          temp.identity = vm.IDCard;
          temp.employer = encodeURI(vm.presentWorkingUnit);
          temp.position = encodeURI(vm.job);
          temp.unit_address = encodeURI(vm.unitAddress);
          temp.unit_phone = encodeURI(vm.workTel);
          temp.unit_code = vm.postcode;

          vm.$commonTools.setCookie("cookieData", JSON.stringify(temp), 1);
        },
        nextPage:function () {
          let vm = this;
          if(vm.validator()){
            vm.setCookies();
            vm.$router.push({name:'ApplicationThree'});
          }
        },
        addDegree:function () {
          let vm = this;
          if(!vm.IDCard){
            vm.$message.error("请先填写身份证号码！");
          }else{
            vm.setCookies();
            vm.$router.replace({name:'ApplicationDegree'});
          }
        },
        goDetail:function (index) {
          this.setCookies();
          this.$router.push({name:'ApplicationDegree',query: { index: index }});
        }
      }
    }
</script>

<style scoped>
  @import '../../../static/css/application.css';
</style>
