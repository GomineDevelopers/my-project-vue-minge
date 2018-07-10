<template>
  <div>
    <div class="application_header"></div>
    <div class="application_bg">
      <div class="container">
        <div class="title">入党申请表</div>
        <div class="content">
          <el-row><span class="necessary">*</span>姓名</el-row>
          <el-row>
            <el-input v-model="realName" class="inputText" clearable></el-input>
          </el-row>
          <el-row>曾用名</el-row>
          <el-row>
            <el-input v-model="usedName" class="inputText" clearable></el-input>
          </el-row>
          <el-row><span class="necessary">*</span>性别</el-row>
          <radio-picker :radioValues="genderValues" :radioValue="genderValue"
                        @handleRadioValue="showGender"></radio-picker>
          <el-row><span class="necessary">*</span>民族</el-row>
          <el-row>
            <el-input v-model="nation" class="inputText" clearable></el-input>
          </el-row>
          <el-row>宗教</el-row>
          <el-row>
            <el-input v-model="religion" class="inputText" clearable></el-input>
          </el-row>
          <el-row><span class="necessary">*</span>出生日期</el-row>
          <el-row>
            <el-date-picker v-model="birthday" type="date" size="large" placeholder="请选择"
                            class="dateInput inputText" :picker-options="pickerOptions1"></el-date-picker>
          </el-row>
          <el-row><span class="necessary">*</span>籍贯</el-row>
          <el-row>
            <el-input v-model="nativePlace" class="inputText" readonly @focus="showNativePlace"></el-input>
          </el-row>
          <el-row><span class="necessary">*</span>出生地</el-row>
          <el-row>
            <el-input v-model="birthPlace" class="inputText" readonly @focus="showBirthPlace"></el-input>
          </el-row>
        </div>
        <el-row>
          <el-button type="primary" round class="bottom-btn" @click="nextPage">下一页</el-button>
        </el-row>
      </div>
    </div>
    <div v-show="isShowNativePlace || isShowBirthPlace" @click="hide" @touchmove.prevent class="distpicker-blanks"></div>
    <div v-show="isShowNativePlace" class="dist-select">
      <v-distpicker hide-area class="inputText" type="mobile" @selected="setNativePlace"></v-distpicker>
    </div>
    <div v-show="isShowBirthPlace" class="dist-select">
      <v-distpicker hide-area class="inputText" type="mobile" @selected="setBirthPlace"></v-distpicker>
    </div>
  </div>
</template>

<script>
  import RadioPicker from '@/components/RadioPicker.vue'

  export default {
    name: "one",
    data() {
      return {
        realName: '',
        usedName: '',
        genderValues: [{text: '女', value: 1}, {text: '男', value: 0}],
        genderValue: 0,
        nation: '',
        religion: '',
        birthday: '',
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          }
        },
        nativePlace: "",
        isShowNativePlace: false,
        birthPlace: "",
        isShowBirthPlace: false
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
      },
      showNativePlace: function () {
        this.isShowNativePlace = true;
      },
      setNativePlace: function (data) {
        this.nativePlace = data.province.value + ' ' + data.city.value
        this.hide();
      },
      showBirthPlace: function () {
        this.isShowBirthPlace = true;
      },
      setBirthPlace: function (data) {
        this.birthPlace = data.province.value + ' ' + data.city.value
        this.hide();
      },
      hide: function () {
        this.isShowNativePlace = false;
        this.isShowBirthPlace = false;
        document
          .getElementsByTagName('body')[0]
          .setAttribute('style', 'overflow:auto')
      },
      nextPage:function () {
        this.$router.push({name:'ApplicationTwo'});
      }
    }
  }
</script>

<style scoped>
  @import '../../../static/css/application.css';
</style>


