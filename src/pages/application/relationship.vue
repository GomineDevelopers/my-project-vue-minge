<template>
  <div class="application_inner_bg">
    <div class="container">
      <div class="title">社会关系</div>
      <div class="content">
        <el-row><span class="necessary">*</span>姓名</el-row>
        <el-row>
          <el-input v-model.trim="realName" class="inputText" clearable></el-input>
        </el-row>
        <el-row><span class="necessary">*</span>关系</el-row>
        <el-row>
          <el-input v-model.trim="relationship" class="inputText" clearable></el-input>
        </el-row>
        <el-row><span class="necessary">*</span>所在地</el-row>
        <el-row>
          <el-input v-model.trim="localAddress" class="inputText" clearable></el-input>
        </el-row>
        <el-row><span class="necessary">*</span>政治面貌</el-row>
        <el-row>
          <el-input v-model.trim="political" class="inputText" clearable></el-input>
        </el-row>
        <el-row>出生日期</el-row>
        <el-row>
          <el-date-picker v-model="birthday" type="date" size="large" placeholder="请选择" :editable="false"
                          class="dateInput inputText" :picker-options="pickerOptions1" value-format="yyyy-MM-dd"></el-date-picker>
        </el-row>
        <el-row>文化程度</el-row>
        <el-row>
          <el-input v-model.trim="educationDegree" class="inputText" clearable></el-input>
        </el-row>
        <el-row>工作单位</el-row>
        <el-row>
          <el-input v-model.trim="workUnit" class="inputText" clearable></el-input>
        </el-row>
        <el-row>职务</el-row>
        <el-row>
          <el-input v-model.trim="job" class="inputText" clearable></el-input>
        </el-row>
        <el-row>现有无联系</el-row>
        <el-row>
          <radio-picker :radioValues="checkValues" :radioValue="radioValue"
                        @handleRadioValue="showGender"></radio-picker>
        </el-row>
      </div>
      <el-row class="application_btn">
        <el-button type="primary" round @click="save">保存</el-button>
        <el-button type="primary" round plain @click="del">删除</el-button>
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
            checkValues: [{text: '是', value: 1}, {text: '否', value: 0}],
            radioValue: 1,
          }
      },
      components: {
        'radio-picker': RadioPicker
      },
      mounted: function () {
        this.showGender();
        if(this.$route.query.index >= 0){
          this.getExistData();
        }
      },
      methods: {
        showGender(radioValue) {
          this.radioValue = radioValue;
        },
        getExistData(){
          let vm = this;
          let i = this.$route.query.index;
          let exitData = JSON.parse(decodeURI(vm.$commonTools.getCookie("cookieData")));
          vm.realName = exitData.social_relationship[i].name;
          vm.relationship = exitData.social_relationship[i].relationship;
          vm.birthday = exitData.social_relationship[i].birth;
          vm.educationDegree = exitData.social_relationship[i].culture;
          vm.political = exitData.social_relationship[i].political;
          vm.localAddress = exitData.social_relationship[i].address;
          vm.workUnit = exitData.social_relationship[i].unit;
          vm.job = exitData.social_relationship[i].position;
          if(exitData.social_relationship[i].contact != undefined){
            vm.$children[17].$children[0].defaultValue = exitData.social_relationship[i].contact;
          }else{
            vm.$children[17].$children[0].defaultValue = 1;
          }

        },
        validator(){
          let vm = this;
          let msg = '';
          if(!vm.realName){
            msg = "请填写姓名";
          }else if(!vm.relationship){
            msg = "请填写关系";
          }else if(!vm.localAddress){
            msg = "请填写所在地";
          }else if(!vm.political){
            msg = "请填写政治面貌";
          }

          if (msg) {
            vm.$message.error(msg);
            return false;
          } else {
            return true;
          }
        },
        save() {
          let vm = this;
          if(vm.validator()) {
            let temp = "";
            let postData = {};
            let postArr = [];
            let isAdd = true;
            postData.name = encodeURI(vm.realName);
            postData.relationship = encodeURI(vm.relationship);
            postData.birth = vm.birthday;
            postData.culture = encodeURI(vm.educationDegree);
            postData.political = encodeURI(vm.political);
            postData.address = encodeURI(vm.localAddress);
            postData.unit = encodeURI(vm.workUnit);
            postData.position = encodeURI(vm.job);
            postData.contact = vm.$children[17].$children[0].defaultValue;

            if (vm.$commonTools.getCookie("cookieData")) {
              temp = JSON.parse(vm.$commonTools.getCookie("cookieData"));
              if (temp.social_relationship && temp.social_relationship.length > 0) {
                temp.social_relationship.forEach(function (ele, index, arr) {
                  if (index == vm.$route.query.index) {
                    postArr.push(postData);
                    isAdd = false;
                  } else {
                    postArr.push(ele);
                  }
                })
              }

              if (isAdd) {
                postArr.push(postData);
              }

              temp.social_relationship = postArr;
              vm.$commonTools.setCookie("cookieData", JSON.stringify(temp), 1);
              vm.$router.replace({name: 'ApplicationFive'});
            }
            else {
              vm.$message.error("有错误")
            }
          }
        },
        del() {
          let vm = this;
          let temp = JSON.parse(vm.$commonTools.getCookie("cookieData"));
          if (temp.social_relationship != undefined) {
            temp.social_relationship.forEach(function (ele, index, arr) {
              if (index == vm.$route.query.index) {
                arr.splice(index, 1);
                temp.social_relationship = arr;
                vm.$commonTools.setCookie("cookieData", JSON.stringify(temp), 1);
              }
            })
          }
          vm.$router.replace({name: 'ApplicationFive'});
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
  .necessary {
    color: #cb1414;
  }
</style>
