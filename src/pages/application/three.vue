<template>
  <div>
    <div class="application_header"></div>
    <div class="application_bg">
      <div class="container">
        <div class="content">
          <el-row><span class="necessary">*</span>家庭住址</el-row>
          <el-row><el-input v-model.trim="homeAddress" class="inputText" clearable></el-input></el-row>
          <el-row><span class="necessary">*</span>家庭电话</el-row>
          <el-row><el-input v-model.trim="homeTel" class="inputText" clearable type="number"></el-input></el-row>
          <el-row><span class="necessary">*</span>家庭邮编</el-row>
          <el-row><el-input v-model.trim="homePostcode" class="inputText" clearable type="number"></el-input></el-row>
          <el-row><span class="necessary">*</span>通讯地址</el-row>
          <el-row>
            <radio-picker :radioValues="checkValues" :radioValue="radioValue"
                          @handleRadioValue="showGender"></radio-picker>
          </el-row>
          <el-row><span class="necessary">*</span>手机</el-row>
          <el-row><el-row><el-input v-model.trim="phone" class="inputText" clearable></el-input></el-row></el-row>
          <el-row>电子邮箱</el-row>
          <el-row><el-input v-model.trim="email" class="inputText" clearable></el-input></el-row>
          <el-row>人大政协任职</el-row>
          <el-row><el-input v-model.trim="CPPCC" class="inputText" clearable></el-input></el-row>
          <el-row>其他主要社会兼职</el-row>
          <el-row><el-input v-model.trim="partTime" class="inputText" clearable></el-input></el-row>
          <el-row>专长</el-row>
          <el-row><el-input v-model.trim="speciality" class="inputText" clearable></el-input></el-row>
          <el-row>享受何级别特殊待遇</el-row>
          <el-row><el-input v-model.trim="specialTreatment" class="inputText" clearable></el-input></el-row>
        </div>
        <el-row>
          <el-button type="primary" round class="bottom-btn" @click="nextPage">下一页</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import RadioPicker from '@/components/RadioPicker.vue'

    export default {
      name: "three",
      data(){
        return{
          homeAddress:'',
          homeTel:'',
          homePostcode:'',
          postAddress:1,
          phone:'',
          email:'',
          CPPCC:'',
          partTime:'',
          speciality:'',
          specialTreatment:'',
          checkValues: [{text: '单位地址', value: 1}, {text: '家庭地址', value: 0}],
          radioValue: 1,
          temp:''
        }
      },
      components: {
        'radio-picker': RadioPicker
      },
      mounted: function () {
        this.showGender();
        this.getExitData();
      },
      methods:{
        showGender(radioValue) {
          this.radioValue = radioValue;
        },
        getExitData(){
          let vm = this;
          if (JSON.parse(vm.$commonTools.getCookie("cookieData")).family_address != undefined) {
            let cookieData = JSON.parse(decodeURI(vm.$commonTools.getCookie("cookieData")));
            vm.homeAddress = cookieData.family_address;
            vm.homeTel = cookieData.family_phone;
            vm.homePostcode = cookieData.family_code;
            vm.phone = cookieData.phone;
            vm.email = cookieData.email;
            vm.CPPCC = cookieData.people_position;
            vm.partTime = cookieData.parttime;
            vm.speciality = cookieData.expertise;
            vm.specialTreatment = cookieData.treatment;
            vm.$children[7].$children[0].defaultValue = cookieData.mailing_address;
          }
        },
        validator(){
          let vm = this;
          let msg = '';
          let regP = /^((13[0-9])|(15[^4])|(166)|(17[0-8])|(18[0-9])|(19[8-9])|(147,145))\d{8}$/;
          if(!vm.homeAddress){
            msg = "请填写家庭住址";
          }else if(!vm.homeTel){
            msg = "请填写家庭电话";
          }else if(!vm.homePostcode){
            msg = "请填写家庭邮编";
          }else if(!vm.phone){
            msg = "请填写手机号码";
          }else if(vm.phone && !regP.test(vm.phone)){
            msg = "手机号码格式不正确";
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
          if(vm.validator()){
            let temp = {};
            temp = JSON.parse(vm.$commonTools.getCookie("cookieData"));
            temp.family_address = encodeURI(vm.homeAddress);
            temp.family_phone = vm.homeTel;
            temp.family_code  = vm.homePostcode;
            temp.mailing_address = vm.$children[7].$children[0].defaultValue;
            temp.phone = vm.phone;
            temp.email = vm.email;
            temp.people_position = encodeURI(vm.CPPCC);
            temp.parttime = encodeURI(vm.partTime);
            temp.expertise = encodeURI(vm.speciality);
            temp.treatment = encodeURI(vm.specialTreatment);

            vm.$commonTools.setCookie("cookieData", JSON.stringify(temp), 1);
            this.$router.push({name:'ApplicationFour'});
          }
        }
      }
    }
</script>

<style scoped>
  @import '../../../static/css/application.css';
</style>
