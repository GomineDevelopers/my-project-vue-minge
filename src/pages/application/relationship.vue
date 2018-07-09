<template>
  <div class="application_inner_bg">
    <div class="container">
      <div class="title">曾参加党派团队</div>
      <div class="content">
        <el-row>姓名</el-row>
        <el-row>
          <el-input v-model="realName" class="inputText" clearable></el-input>
        </el-row>
        <el-row>关系</el-row>
        <el-row>
          <el-input v-model="relationship" class="inputText" clearable></el-input>
        </el-row>
        <el-row>出生日期</el-row>
        <el-row>
          <el-date-picker v-model="birthday" type="date" size="large" placeholder="请选择"
                          class="dateInput inputText" :picker-options="pickerOptions1"></el-date-picker>
        </el-row>
        <el-row>文化程度</el-row>
        <el-row>
          <el-input v-model="educationDegree" class="inputText" clearable></el-input>
        </el-row>
        <el-row>政治面貌</el-row>
        <el-row>
          <el-input v-model="political" class="inputText" clearable></el-input>
        </el-row>
        <el-row>所在地</el-row>
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
        <el-row>现有无联系</el-row>
        <radio-picker :radioValues="genderValues" :radioValue="genderValue"
                      @handleRadioValue="showGender"></radio-picker>
      </div>
      <el-row class="application_btn">
        <el-button type="primary" round>保存</el-button>
        <el-button type="primary" round plain>删除</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
  import RadioPicker from '@/components/RadioPicker.vue'

    export default {
        name: "relationship",
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
            job:'',
            isConnect:'',
            genderValues: [{text: '是', value: 1}, {text: '否', value: 0}],
            genderValue: 1,
          }
      },
      components: {
        'radio-picker': RadioPicker
      },
      mounted: function () {
        this.showGender();
      },
      methods: {
        showGender(radioValue) {
          this.genderValue = radioValue;
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
