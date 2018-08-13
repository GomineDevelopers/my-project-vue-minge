<template>
    <div class="application_inner_bg">
      <div class="container2">
        <div class="title2">学历学位</div>
        <div class="content">
          <el-row><span class="necessary">*</span>教育类型</el-row>
          <el-row>
            <el-select v-model="educationType" placeholder="请选择" class="inputText">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-row>
          <el-row>毕业院校</el-row>
          <el-row>
            <el-input v-model="graduateSchool" class="inputText" clearable></el-input>
          </el-row>
          <el-row><span class="necessary">*</span>专业</el-row>
          <el-row>
            <el-input v-model="major" class="inputText" clearable></el-input>
          </el-row>
          <el-row><span class="necessary">*</span>入学时间</el-row>
          <el-row>
            <el-date-picker v-model="enrolmentTime" type="date" size="large" placeholder="请选择"
                            class="dateInput inputText" :picker-options="pickerOptions1"></el-date-picker>
          </el-row>
          <el-row><span class="necessary">*</span>毕业时间</el-row>
          <el-row>
            <el-date-picker v-model="graduateTime" type="date" size="large" placeholder="请选择"
                            class="dateInput inputText" :picker-options="pickerOptions1"></el-date-picker>
          </el-row>
          <el-row><span class="necessary">*</span>学历</el-row>
          <el-row>
            <el-select v-model="education" placeholder="请选择" class="inputText">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-row>
          <el-row><span class="necessary">*</span>学位</el-row>
          <el-row>
            <el-select v-model="degree" placeholder="请选择" class="inputText">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
            options:[{
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }],
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
          let exitData = JSON.parse(vm.$commonTools.getCookie("cookieData"));
          vm.educationType = exitData.education[i].educationType;
          vm.graduateSchool = exitData.education[i].graduateSchool;
          vm.major = exitData.education[i].major;
          vm.enrolmentTime = exitData.education[i].enrolmentTime;
          vm.education = exitData.education[i].education;
          vm.degree = exitData.education[i].degree;
        },
        save:function () {
          let postDegreeData = {};
          let postArr = [];
          let temp = "";
          let vm = this;
          postDegreeData.educationType = vm.educationType;
          postDegreeData.graduateSchool = vm.graduateSchool;
          postDegreeData.major = vm.major;
          postDegreeData.enrolmentTime = vm.enrolmentTime;
          postDegreeData.graduateTime = vm.graduateTime;
          postDegreeData.education = vm.education;
          postDegreeData.degree = vm.degree;

          temp = JSON.parse(vm.$commonTools.getCookie("cookieData"));

          if(temp.education == undefined){//第一次
            postArr.push(postDegreeData);
          }else{
            if(vm.$route.query.index >= 0){//修改
              temp.education.forEach(function (ele,index,arr) {
                if(index == vm.$route.query.index){
                  ele.educationType = vm.educationType;
                  ele.graduateSchool = vm.graduateSchool;
                  ele.major = vm.major;
                  ele.enrolmentTime = vm.enrolmentTime;
                  ele.graduateTime = vm.graduateTime;
                  ele.education = vm.education;
                  ele.degree = vm.degree;

                  postArr.push(ele);
                }else{
                  postArr.push(ele);
                }
              })
            }else{//新增
              postArr = temp.education;
              postArr.push(postDegreeData);
            }
          }
          temp.education = postArr;
          vm.$commonTools.setCookie("cookieData",JSON.stringify(temp),1);

          vm.$router.replace({name:'ApplicationTwo'});
        },
        del:function () {
          let vm = this;
          let temp = JSON.parse(vm.$commonTools.getCookie("cookieData"));
          temp.education.forEach(function (ele,index,arr) {
            if(index == vm.$route.query.index){
              arr.splice(index,1);
              temp.education = arr;
              vm.$commonTools.setCookie("cookieData",JSON.stringify(temp),1);
            }
          })
          vm.$router.replace({name:'ApplicationTwo'});
        }
      }
    }
</script>

<style scoped>
  @import '../../../static/css/application.css';
</style>

