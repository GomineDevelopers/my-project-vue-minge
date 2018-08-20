<template>
    <div class="application_inner_bg">
      <div class="container2">
        <div class="title2">学历学位</div>
        <div class="content">
          <el-row><span class="necessary">*</span>教育类型</el-row>
          <el-row>
            <el-select v-model="educationType" placeholder="请选择" class="inputText">
              <el-option v-for="item in educationTypes1" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-row>
          <el-row>毕业院校</el-row>
          <el-row>
            <el-input v-model.trim="graduateSchool" class="inputText" clearable></el-input>
          </el-row>
          <el-row><span class="necessary">*</span>专业</el-row>
          <el-row>
            <el-input v-model.trim="major" class="inputText" clearable></el-input>
          </el-row>
          <el-row><span class="necessary">*</span>入学时间</el-row>
          <el-row>
            <el-date-picker v-model="enrolmentTime" type="date" size="large" placeholder="请选择" :editable="false"
                            class="dateInput inputText" :picker-options="pickerOptions1" value-format="yyyy-MM-dd"></el-date-picker>
          </el-row>
          <el-row><span class="necessary">*</span>毕业时间</el-row>
          <el-row>
            <el-date-picker v-model="graduateTime" type="date" size="large" placeholder="请选择" :editable="false"
                            class="dateInput inputText" :picker-options="pickerOptions1" value-format="yyyy-MM-dd"></el-date-picker>
          </el-row>
          <el-row><span class="necessary">*</span>学历</el-row>
          <el-row>
            <el-select v-model="education" placeholder="请选择" class="inputText">
              <el-option v-for="item in educationTypes2" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-row>
          <el-row><span class="necessary">*</span>学位</el-row>
          <el-row>
            <el-select v-model="degree" placeholder="请选择" class="inputText">
              <el-option v-for="item in degreeTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
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
        name: "degree",
      data(){
          return{
            educationTypes1:[{value: '全日制教育',label: '全日制教育'},
                    {value: '在职教育',label: '在职教育'}],
            educationTypes2:[{value: '大专',label: '大专'},{value: '本科',label: '本科'},
                    {value: '硕士研究生',label: '硕士研究生'},{value: '博士研究生',label: '博士研究生'}],
            degreeTypes:[{value: '学士',label: '学士'},{value: '硕士',label: '硕士'},{value: '博士',label: '博士'}],
            educationType:'',
            graduateSchool:'',
            major:'',
            pickerOptions1: {
              disabledDate(time) {
                return time.getTime() > Date.now()
              }
            },
            enrolmentTime:'',
            graduateTime:'',
            education:'',
            degree:''
          }
      },
      mounted(){
          if(this.$route.query.index >= 0){
            this.getExistData();
          }
      },
      methods:{
        getExistData:function(){
          let vm = this;
          let i = this.$route.query.index;
          let exitData = JSON.parse(decodeURI(vm.$commonTools.getCookie("cookieData")));
          vm.educationType = exitData.education[i].education_type;
          vm.graduateSchool = exitData.education[i].school;
          vm.major = exitData.education[i].profession;
          vm.enrolmentTime = exitData.education[i].admission_time;
          vm.graduateTime = exitData.education[i].graduation_time;
          vm.education = exitData.education[i].education;
          vm.degree = exitData.education[i].degree;
        },
        degreeValidate(){
          let vm = this;
          let msg = '';
          if (!vm.educationType) {
            msg = '未填写教育类型';
          } else if (!vm.major) {
            msg = '未填写专业';
          } else if (!vm.enrolmentTime) {
            msg = '未选择入学时间';
          } else if (!vm.graduateTime) {
            msg = '未选择毕业时间';
          } else if (!vm.education) {
            msg = '未填写学历';
          }else if (!vm.degree) {
            msg = '未填写学位';
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
          if (vm.degreeValidate()) {
            let temp = "";
            let postDegreeData = {};
            let postArr = [];
            let isAdd = true;
            postDegreeData.education_type = encodeURI(vm.educationType);
            postDegreeData.school = encodeURI(vm.graduateSchool);
            postDegreeData.profession = encodeURI(vm.major);
            postDegreeData.admission_time = vm.enrolmentTime;
            postDegreeData.graduation_time = vm.graduateTime;
            postDegreeData.education = encodeURI(vm.education);
            postDegreeData.degree = encodeURI(vm.degree);

            if (vm.$commonTools.getCookie("cookieData")) {
              temp = JSON.parse(vm.$commonTools.getCookie("cookieData"));
              if (temp.education && temp.education.length > 0) {
                temp.education.forEach(function (ele, index, arr) {
                  if (index == vm.$route.query.index) {
                    postArr.push(postDegreeData);
                    isAdd=false;
                  } else {
                    postArr.push(ele);
                  }
                })
              }

              if (isAdd) {
                postArr.push(postDegreeData);
              }

              temp.education = postArr;
              vm.$commonTools.setCookie("cookieData", JSON.stringify(temp), 1);
              vm.$router.replace({name: 'ApplicationTwo'});
            }
            else {
              vm.$message.error("有错误")
            }

          }
        },
        del() {
          let vm = this;
          let temp = JSON.parse(vm.$commonTools.getCookie("cookieData"));
          if (temp.education != undefined) {
            temp.education.forEach(function (ele, index, arr) {
              if (index == vm.$route.query.index) {
                arr.splice(index, 1);
                temp.education = arr;
                vm.$commonTools.setCookie("cookieData", JSON.stringify(temp), 1);
              }
            })
          }
          vm.$router.replace({name: 'ApplicationTwo'});
        }
      }
    }
</script>

<style scoped>
  @import '../../../static/css/application.css';
</style>

