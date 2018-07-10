<template>
  <div>
    <div class="application_header"></div>
    <div class="application_bg">
      <div class="container">
        <div class="content">
          <el-row><span class="necessary">*</span>家庭住址</el-row>
          <el-row><el-input v-model="homeAddress" class="inputText" clearable></el-input></el-row>
          <el-row><span class="necessary">*</span>家庭电话</el-row>
          <el-row><el-input v-model="homeTel" class="inputText" clearable></el-input></el-row>
          <el-row><span class="necessary">*</span>家庭邮编</el-row>
          <el-row><el-input v-model="homePostcode" class="inputText" clearable></el-input></el-row>
          <el-row><span class="necessary">*</span>通讯地址</el-row>
          <el-row>
            <radio-picker :radioValues="genderValues" :radioValue="genderValue"
                          @handleRadioValue="showGender"></radio-picker>
          </el-row>
          <el-row><span class="necessary">*</span>手机</el-row>
          <el-row><el-row><el-input v-model="Phone" class="inputText" clearable></el-input></el-row></el-row>
          <el-row>电子邮箱</el-row>
          <el-row><el-input v-model="email" class="inputText" clearable></el-input></el-row>
          <el-row>人大政协任职</el-row>
          <el-row><el-input v-model="CPPCC" class="inputText" clearable></el-input></el-row>
          <el-row>其他主要社会兼职</el-row>
          <el-row><el-input v-model="partTime" class="inputText" clearable></el-input></el-row>
          <el-row>专长</el-row>
          <el-row><el-input v-model="speciality" class="inputText" clearable></el-input></el-row>
          <el-row>享受何级别特殊待遇</el-row>
          <el-row><el-input v-model="specialTreatment" class="inputText" clearable></el-input></el-row>
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
          Phone:'',
          email:'',
          CPPCC:'',
          partTime:'',
          speciality:'',
          specialTreatment:'',
          genderValues: [{text: '单位地址', value: 1}, {text: '家庭地址', value: 0}],
          genderValue: 1,
        }
      },
      components: {
        'radio-picker': RadioPicker
      },
      mounted: function () {
        this.showGender();
      },
      methods:{
        showGender(radioValue) {
          this.genderValue = radioValue;
        },
        nextPage:function () {
          this.$router.push({name:'ApplicationFour'});
        }
      }
    }
</script>

<style scoped>
  @import '../../../static/css/application.css';
</style>
