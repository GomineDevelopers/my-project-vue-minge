<template>
    <div class="application_bg">
      <div class="container">
        <div class="title">入党申请书</div>
        <div class="content">
          <el-row><span class="necessary">*</span>姓名</el-row>
          <el-row><el-input v-model="realName" class="inputText" clearable></el-input></el-row>
          <el-row>曾用名</el-row>
          <el-row><el-input v-model="usedName" class="inputText" clearable></el-input></el-row>
          <el-row><span class="necessary">*</span>性别</el-row>
          <radio-picker  :radioValues="genderValues" :radioValue="genderValue" @handleRadioValue="showGender" ></radio-picker>
          <el-row><span class="necessary">*</span>民族</el-row>
          <el-row><el-input v-model="nation" class="inputText" clearable></el-input></el-row>
          <el-row>宗教</el-row>
          <el-row><el-input v-model="religion" class="inputText" clearable></el-input></el-row>
          <el-row><span class="necessary">*</span>出生日期</el-row>
          <el-row>
            <el-date-picker v-model="birthday" type="date" size="large" placeholder="请选择"
                            class="dateInput inputText" :picker-options="pickerOptions1"></el-date-picker>
          </el-row>
          <el-row><span class="necessary">*</span>籍贯</el-row>
          <el-row></el-row>
          <el-row><span class="necessary">*</span>出生地</el-row>
          <el-row></el-row>
        </div>
      </div>
    </div>
</template>

<script>
  import RadioPicker from '@/components/RadioPicker.vue'
    export default {
        name: "one",
      data(){
          return{
            realName:'',
            usedName:'',
            genderValues: [{ text: '女', value: 1 }, { text: '男', value: 0 }],
            genderValue: 0,
            nation:'',
            religion:'',
            birthday:'',
            pickerOptions1: {
              disabledDate(time) {
                return time.getTime() > Date.now()
              }
            },
          }
      },
      components: {
        'radio-picker': RadioPicker
      },
      mounted: function() {
        this.showGender();
      },
      methods:{
          showGender(radioValue){
            this.genderValue = radioValue;
          }
      }
    }
</script>

<style scoped>
  .container{
    margin: 11vh 17vw;
  }

  .title{
    font-size: 1.3rem;
    font-weight: bold;
    color: #185a88;
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

  .dateInput{
    width: inherit;
  }
</style>
