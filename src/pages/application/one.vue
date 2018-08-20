<template>
  <div>
    <div class="application_header"></div>
    <div class="application_bg">
      <div class="container">
        <div class="title">入党申请表</div>
        <div class="content">
          <el-row><span class="necessary">*</span>姓名</el-row>
          <el-row>
            <el-input v-model.trim="realName" class="inputText" clearable maxlength="15"></el-input>
          </el-row>
          <el-row>曾用名</el-row>
          <el-row>
            <el-input v-model.trim="usedName" class="inputText" clearable maxlength="15"></el-input>
          </el-row>
          <el-row><span class="necessary">*</span>性别</el-row>
          <el-row>
            <radio-picker :radioValues="checkValues" :radioValue="radioValue"
                          @handleRadioValue="showGender"></radio-picker>
          </el-row>
          <el-row><span class="necessary">*</span>民族</el-row>
          <el-row>
            <el-input v-model.trim="nation" class="inputText" clearable maxlength="10"></el-input>
          </el-row>
          <el-row>宗教</el-row>
          <el-row>
            <el-input v-model.trim="religion" class="inputText" clearable maxlength="10"></el-input>
          </el-row>
          <el-row><span class="necessary">*</span>出生日期</el-row>
          <el-row>
            <el-date-picker v-model="birthday" type="date" size="large" placeholder="请选择" :editable="false"
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
        checkValues: [{text: "女", value: 1}, {text: "男", value: 0}],
        radioValue: 0,
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
      let vm = this;
      vm.showGender();
      vm.getExitData();
    },
    methods: {
      showGender: function (radioValue) {
        this.radioValue = radioValue;
      },
      showNativePlace: function () {
        this.isShowNativePlace = true;
      },
      setNativePlace: function (data) {
        this.nativePlace = data.province.value + ' ' + data.city.value;
        this.hide();
      },
      showBirthPlace: function () {
        this.isShowBirthPlace = true;
      },
      setBirthPlace: function (data) {
        this.birthPlace = data.province.value + ' ' + data.city.value;
        this.hide();
      },
      hide: function () {
        this.isShowNativePlace = false;
        this.isShowBirthPlace = false;
        document
          .getElementsByTagName('body')[0]
          .setAttribute('style', 'overflow:auto')
      },
      validator(){
        let vm = this;
        let msg = '';
        if(!vm.realName){
          msg = "请填写真实姓名";
        }else if(!vm.nation){
          msg = "请填写民族";
        }else if(!vm.birthday){
          msg = "请填写出生日期";
        }else if(!vm.nativePlace){
          msg = "请填写籍贯";
        }else if(!vm.birthPlace){
          msg = "请填写出生地";
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
        if(vm.$commonTools.getCookie("cookieData")){
          temp = JSON.parse(vm.$commonTools.getCookie("cookieData"));
        }
        temp.realname = encodeURI(vm.realName);
        temp.username = encodeURI(vm.usedName);
        temp.sex = vm.$children[5].$children[0].defaultValue;
        temp.nationality = encodeURI(vm.nation);
        temp.religion = encodeURI(vm.religion);
        temp.birth = vm.birthday;
        temp.birthplace = encodeURI(vm.nativePlace);
        temp.place = encodeURI(vm.birthPlace);

        vm.$commonTools.setCookie("cookieData",JSON.stringify(temp),1);
      },
      nextPage:function () {
        let vm = this;
        if(vm.validator()){
          vm.setCookies();
          vm.$router.push({name:'ApplicationTwo'});
        }
      },
      getExitData:function () {
        let vm = this;
        if (vm.$commonTools.getCookie("cookieData")){
          let exitData = JSON.parse(decodeURI(vm.$commonTools.getCookie("cookieData")));
          vm.realName = exitData.realname;
          vm.usedName = exitData.username;
          vm.radioValue = exitData.sex;
          vm.$children[5].$children[0].defaultValue = vm.radioValue;
          vm.nation = exitData.nationality;
          vm.religion = exitData.religion;
          vm.birthday = exitData.birth;
          vm.nativePlace = exitData.birthplace;
          vm.birthPlace = exitData.place;
        }
      }
    }
  }
</script>

<style scoped>
  @import '../../../static/css/application.css';
</style>


