<template>
  <div class="application_inner_bg">
    <div class="container">
      <div class="title">曾参加党派团队</div>
      <div class="content">
        <el-row>名称</el-row>
        <el-row>
          <el-input type="textarea" :rows="6" v-model="teamName" class="inputText" clearable></el-input>
        </el-row>
        <el-row>地点</el-row>
        <el-row>
          <el-input v-model="teamAddress" class="inputText" clearable></el-input>
        </el-row>
        <el-row>介绍人</el-row>
        <el-row>
          <el-input v-model="introducer" class="inputText" clearable></el-input>
        </el-row>
        <el-row>职务</el-row>
        <el-row>
          <el-input v-model="job" class="inputText" clearable></el-input>
        </el-row>
        <el-row>起始时间</el-row>
        <el-row>
          <el-date-picker v-model="startTime" type="date" size="large" placeholder="请选择"
                          class="dateInput inputText" :picker-options="pickerOptions1"></el-date-picker>
        </el-row>
        <el-row>结束时间</el-row>
        <el-row>
          <el-date-picker v-model="endTime" type="date" size="large" placeholder="请选择"
                          class="dateInput inputText" :picker-options="pickerOptions1"></el-date-picker>
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
        name: "partyTeam",
      data(){
          return{
            teamName:'',
            teamAddress:'',
            introducer:'',
            job:'',
            startTime:'',
            endTime:'',
            pickerOptions1: {
              disabledDate(time) {
                return time.getTime() > Date.now()
              }
            },
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
