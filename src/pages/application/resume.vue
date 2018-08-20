<template>
  <div class="application_inner_bg">
    <div class="container">
      <div class="title">工作简历</div>
      <div class="content">
        <el-row><span class="necessary">*</span>工作单位</el-row>
        <el-row>
          <el-input v-model.trim="workUnit" class="inputText" clearable></el-input>
        </el-row>
        <el-row><span class="necessary">*</span>所在地</el-row>
        <el-row>
          <el-input v-model.trim="localAddress" class="inputText" clearable></el-input>
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
      </div>
      <el-row class="application_btn">
        <el-button type="primary" round @click="save">保存</el-button>
        <el-button type="primary" round plain @click="del">删除</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
    export default {
      name: "resume",
      data(){
          return{
            workUnit:'',
            localAddress:'',
            job:'',
            startTime:'',
            endTime:'',
            pickerOptions1: {
              disabledDate(time) {
                return time.getTime() > Date.now()
              }
            }
          }
      },
      mounted(){
        if(this.$route.query.index >= 0){
          this.getExistData();
        }
      },
      methods: {
        getExistData: function () {
          let vm = this;
          let i = this.$route.query.index;
          let exitData = JSON.parse(vm.$commonTools.getCookie("cookieData"));
          vm.workUnit = decodeURI(exitData.resume[i].unit);
          vm.localAddress = decodeURI(exitData.resume[i].location);
          vm.job = decodeURI(exitData.resume[i].position);
          vm.startTime = exitData.resume[i].start_time;
          vm.endTime = exitData.resume[i].end_time;
        },
        resumeValidate() {
          let vm = this;
          let msg = '';
          if (!vm.workUnit) {
            msg = '未填写工作单位';
          } else if (!vm.localAddress) {
            msg = '未填写所在地';
          } else if (!vm.job) {
            msg = '未填写职务';
          } else if (!vm.startTime) {
            msg = '未选择起始时间';
          } else if (!vm.endTime) {
            msg = '未填写结束时间';
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
          if (vm.resumeValidate()) {
            let temp = "";
            let postData = {};
            let postArr = [];
            let isAdd = true;
            postData.unit = encodeURI(vm.workUnit);
            postData.location = encodeURI(vm.localAddress);
            postData.position = encodeURI(vm.job);
            postData.start_time = vm.startTime;
            postData.end_time = vm.endTime;

            if (vm.$commonTools.getCookie("cookieData")) {
              temp = JSON.parse(vm.$commonTools.getCookie("cookieData"));
              if (temp.resume && temp.resume.length > 0) {
                temp.resume.forEach(function (ele, index, arr) {
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

              temp.resume = postArr;
              vm.$commonTools.setCookie("cookieData", JSON.stringify(temp), 1);
              vm.$router.replace({name: 'ApplicationFour'});
            }
            else {
              vm.$message.error("有错误")
            }

          }
        },
        del() {
          let vm = this;
          let temp = JSON.parse(vm.$commonTools.getCookie("cookieData"));
          if (temp.resume != undefined) {
            temp.resume.forEach(function (ele, index, arr) {
              if (index == vm.$route.query.index) {
                arr.splice(index, 1);
                temp.resume = arr;
                vm.$commonTools.setCookie("cookieData", JSON.stringify(temp), 1);
              }
            })
          }
          vm.$router.replace({name: 'ApplicationFour'});
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

  .necessary {
    color: #cb1414;
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
