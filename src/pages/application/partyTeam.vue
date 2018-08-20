<template>
  <div class="application_inner_bg">
    <div class="container">
      <div class="title">曾参加党派团队</div>
      <div class="content">
        <el-row><span class="necessary">*</span>名称</el-row>
        <el-row>
          <el-input v-model.trim="teamName" class="inputText" clearable></el-input>
        </el-row>
        <el-row><span class="necessary">*</span>职务</el-row>
        <el-row>
          <el-input v-model.trim="job" class="inputText" clearable></el-input>
        </el-row>
        <el-row><span class="necessary">*</span>起始时间</el-row>
        <el-row>
          <el-date-picker v-model="startTime" type="date" size="large" placeholder="请选择" :editable="false"
                          class="dateInput inputText" :picker-options="pickerOptions1" value-format="yyyy-MM-dd"></el-date-picker>
        </el-row>
        <el-row><span class="necessary">*</span>结束时间</el-row>
        <el-row>
          <el-date-picker v-model="endTime" type="date" size="large" placeholder="请选择" :editable="false"
                          class="dateInput inputText" :picker-options="pickerOptions1" value-format="yyyy-MM-dd"></el-date-picker>
        </el-row>
        <el-row>介绍人</el-row>
        <el-row>
          <el-input v-model.trim="introducer" class="inputText" clearable></el-input>
        </el-row>
        <el-row>地点</el-row>
        <el-row>
          <el-input v-model.trim="teamAddress" class="inputText" clearable></el-input>
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
          vm.teamName = exitData.partisan[i].name;
          vm.teamAddress = exitData.partisan[i].address;
          vm.introducer = exitData.partisan[i].introducer;
          vm.job = exitData.partisan[i].position;
          vm.startTime = exitData.partisan[i].start_time;
          vm.endTime = exitData.partisan[i].end_time;
          vm.$children[13].$children[0].defaultValue = exitData.partisan[i].is_relationship;
        },
        Validate(){
          let vm = this;
          let msg = '';
          if (!vm.teamName) {
            msg = '未填写教育类型';
          } else if (!vm.job) {
            msg = '未填写职务';
          } else if (!vm.startTime) {
            msg = '未选择开始学时间';
          } else if (!vm.endTime) {
            msg = '未选择结束时间';
          }
          if (msg) {
            vm.$message.error(msg)
            return false
          } else {
            return true
          }
        },
        save() {
          let vm = this;
          if (vm.Validate()) {
            let temp = "";
            let postData = {};
            let postArr = [];
            let isAdd = true;
            postData.name = encodeURI(vm.teamName);
            postData.address = encodeURI(vm.teamAddress);
            postData.introducer = encodeURI(vm.introducer);
            postData.position = encodeURI(vm.job);
            postData.start_time = vm.startTime;
            postData.end_time = vm.endTime;
            postData.is_relationship = vm.$children[13].$children[0].defaultValue;

            if (vm.$commonTools.getCookie("cookieData")) {
              temp = JSON.parse(vm.$commonTools.getCookie("cookieData"));
              if (temp.partisan && temp.partisan.length > 0) {
                temp.partisan.forEach(function (ele, index, arr) {
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

              temp.partisan = postArr;
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
          if (temp.partisan != undefined) {
            temp.partisan.forEach(function (ele, index, arr) {
              if (index == vm.$route.query.index) {
                arr.splice(index, 1);
                temp.partisan = arr;
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
