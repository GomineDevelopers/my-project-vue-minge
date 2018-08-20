<template>
  <div class="application_inner_bg">
    <div class="container">
      <div class="title">家庭成员状况</div>
      <div class="content">
        <el-row><span class="necessary">*</span>姓名</el-row>
        <el-row>
          <el-input v-model.trim="realName" class="inputText" clearable></el-input>
        </el-row>
        <el-row><span class="necessary">*</span>关系</el-row>
        <el-row>
          <el-input v-model.trim="relationship" class="inputText" clearable></el-input>
        </el-row>
        <el-row><span class="necessary">*</span>出生日期</el-row>
        <el-row>
          <el-date-picker v-model="birthday" type="date" size="large" placeholder="请选择" :editable="false"
                          class="dateInput inputText" :picker-options="pickerOptions1" value-format="yyyy-MM-dd"></el-date-picker>
        </el-row>
        <el-row><span class="necessary">*</span>文化程度</el-row>
        <el-row>
          <el-input v-model.trim="educationDegree" class="inputText" clearable></el-input>
        </el-row>
        <el-row><span class="necessary">*</span>政治面貌</el-row>
        <el-row>
          <el-input v-model.trim="political" class="inputText" clearable></el-input>
        </el-row>
        <el-row><span class="necessary">*</span>所在地</el-row>
        <el-row>
          <el-input v-model.trim="localAddress" class="inputText" clearable></el-input>
        </el-row>
        <el-row>工作单位</el-row>
        <el-row>
          <el-input v-model.trim="workUnit" class="inputText" clearable></el-input>
        </el-row>
        <el-row>职务</el-row>
        <el-row>
          <el-input v-model.trim="job" class="inputText" clearable></el-input>
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
      name: "family",
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
          job:''
        }
      },
      mounted: function () {
        if(this.$route.query.index >= 0){
          this.getExistData();
        }
      },
      methods: {
        getExistData(){
          let vm = this;
          let i = this.$route.query.index;
          let exitData = JSON.parse(decodeURI(vm.$commonTools.getCookie("cookieData")));
          vm.realName = exitData.family_member[i].name;
          vm.relationship = exitData.family_member[i].relationship;
          vm.birthday = exitData.family_member[i].birth;
          vm.educationDegree = exitData.family_member[i].culture;
          vm.political = exitData.family_member[i].political;
          vm.localAddress = exitData.family_member[i].address;
          vm.workUnit = exitData.family_member[i].unit;
          vm.job = exitData.family_member[i].position;
        },
        validator(){
          let vm = this;
          let msg = '';
          if(!vm.realName){
            msg = "请填写姓名";
          }else if(!vm.relationship){
            msg = "请填写关系";
          }else if(!vm.birthday){
            msg = "请填写出生日期";
          }else if(!vm.educationDegree){
            msg = "请填写文化程度";
          }else if(!vm.political){
            msg = "请填写政治面貌";
          }else if(!vm.localAddress){
            msg = "请填写所在地";
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

            if (vm.$commonTools.getCookie("cookieData")) {
              temp = JSON.parse(vm.$commonTools.getCookie("cookieData"));
              if (temp.family_member && temp.family_member.length > 0) {
                temp.family_member.forEach(function (ele, index, arr) {
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

              temp.family_member = postArr;
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
          if (temp.family_member != undefined) {
            temp.family_member.forEach(function (ele, index, arr) {
              if (index == vm.$route.query.index) {
                arr.splice(index, 1);
                temp.family_member = arr;
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
  @import '../../../static/css/application_detail.css';
</style>
