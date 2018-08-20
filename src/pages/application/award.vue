<template>
  <div class="application_inner_bg">
    <div class="container">
      <div class="title">主要成就及获奖情况</div>
      <div class="content">
        <el-row><span class="necessary">*</span>成就及获奖情况</el-row>
        <el-row>
          <el-input type="textarea" :rows="6" v-model.trim="achievement" class="inputText" clearable></el-input>
        </el-row>
        <el-row><span class="necessary">*</span>获奖级别成果水平</el-row>
        <el-row>
          <el-input v-model.trim="level" class="inputText" clearable></el-input>
        </el-row>
        <el-row><span class="necessary">*</span>时间</el-row>
        <el-row>
          <el-date-picker v-model="time" type="date" size="large" placeholder="请选择" :editable="false"
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
      name: "award",
      data(){
          return{
            pickerOptions1: {
              disabledDate(time) {
                return time.getTime() > Date.now()
              }
            },
            achievement:'',
            level:'',
            time:''
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
          vm.achievement = decodeURI(exitData.award[i].achievement);
          vm.level = decodeURI(exitData.award[i].level);
          vm.time = exitData.award[i].award_time;
        },
        awardValidate() {
          let vm = this;
          let msg = '';
          if (!vm.achievement) {
            msg = '请填写成就及获奖情况';
          } else if (!vm.level) {
            msg = '请填写获奖级别成功水平';
          } else if (!vm.time) {
            msg = '请选择时间';
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
          if (vm.awardValidate()) {
            let temp = "";
            let postData = {};
            let postArr = [];
            let isAdd = true;
            postData.achievement = encodeURI(vm.achievement);
            postData.level = encodeURI(vm.level);
            postData.award_time = vm.time;

            if (vm.$commonTools.getCookie("cookieData")) {
              temp = JSON.parse(vm.$commonTools.getCookie("cookieData"));
              if (temp.award && temp.award.length > 0) {
                temp.award.forEach(function (ele, index, arr) {
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

              temp.award = postArr;
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
          if (temp.award != undefined) {
            temp.award.forEach(function (ele, index, arr) {
              if (index == vm.$route.query.index) {
                arr.splice(index, 1);
                temp.award = arr;
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
