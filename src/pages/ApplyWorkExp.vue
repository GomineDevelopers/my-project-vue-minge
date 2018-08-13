<template>
  <div class="quick_validate_bg ">
    <div class="container2">
      <div class="title2" v-text="defaultTitle"></div>
      <div class="content">
          <el-row>
            <el-col :span="24"><span class="necessary" >*</span>公司名称</el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-input v-model.trim="companyName" placeholder="请输入工作公司名称" class="inputText"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24"><span class="necessary">*</span>担任职务</el-col>
          </el-row>
          <el-row >
            <el-col :span="24">
              <el-input v-model.trim="job" placeholder="请输入担任的职务" class="inputText"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24"><span class="necessary">*</span>起始时间</el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-date-picker v-model="worktimeStart"
                              type="month"
                              size="large"
                              align="center"
                              placeholder="请选择"
                              format="yyyy 年 MM 月"
                              value-format="yyyy-MM"
                              class="dateInput inputText"
                              :picker-options="pickerOptions1"></el-date-picker>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24"><span class="necessary">*</span>结束时间</el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-date-picker v-model="worktimeEnd"
                              type="month"
                              size="large"
                              align="center"
                              placeholder="请选择"
                              format="yyyy 年 MM 月"
                              value-format="yyyy-MM"
                              class="dateInput inputText"
                              :picker-options="pickerOptions1" ></el-date-picker>
            </el-col>
          </el-row>
            <el-row>
              <el-col :span="24"><span class="necessary">*</span>工作地点</el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-input v-model.trim="workPlace" placeholder="请输入工作地点" class="inputText"></el-input>
              </el-col>
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
    name: 'ApplyWorkExp',
    data() {
      return {
        companyName: '',
        job: '',
        worktimeStart: '',
        worktimeEnd: '',
        workPlace: '',
        defaultTitle: '添加工作经历',
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          }
        }
      }
    },
    mounted: function() {
      if(this.$route.query.index >= 0){
        this.defaultTitle = '修改工作经历';
        this.getExistWorkData();
      }
    },
    methods: {
      worksValidate() {
        let vm = this;
        let msg = '';
        if (!vm.companyName) {
          msg = '未填写公司名称';
        } else if (!vm.job) {
          msg = '未填写担任职务';
        } else if (!vm.worktimeStart) {
          msg = '未选择开始时间';
        } else if (!vm.worktimeEnd) {
          msg = '未选择结束时间';
        } else if (!vm.workPlace) {
          msg = '未填写工作地点';
        }
        if (msg) {
          vm.$message.error(msg)
          return false
        } else {
          return true
        }
      },
      getExistWorkData() {
        let vm = this;
        let i = this.$route.query.index;
        let exitData = JSON.parse(vm.$commonTools.getCookie("cookieData"));
        vm.companyName = exitData.works[i].company_name;
        vm.job = exitData.works[i].position;
        vm.worktimeStart = exitData.works[i].start_time;
        vm.worktimeEnd = exitData.works[i].end_time;
        vm.workPlace = exitData.works[i].address;
      },
      save(){
        let vm = this;
        let postData = {};
        let postArr = [];
        postData.company_name = vm.companyName;
        postData.position = vm.job;
        postData.start_time = vm.worktimeStart;
        postData.end_time = vm.worktimeEnd;
        postData.address = vm.workPlace;
        let temp = JSON.parse(vm.$commonTools.getCookie("cookieData"));

        if(vm.worksValidate()){
          if(temp.works == undefined){//第一次新增
            postArr.push(postData);
          }else{//非第一次（修改）
            if(vm.$route.query.index >= 0){
              temp.works.forEach(function (ele,index,arr) {
                if(index == vm.$route.query.index){
                  ele.company_name = vm.companyName;
                  ele.position = vm.job;
                  ele.start_time = vm.worktimeStart;
                  ele.end_time = vm.worktimeEnd;
                  ele.address = vm.workPlace;

                  postArr.push(ele);
                }else{
                  postArr.push(ele);
                }
              })
            }else{//非第一次（新增）
              postArr = temp.works;
              postArr.push(postData);
            }
          }
          temp.works = postArr;
          vm.$commonTools.setCookie("cookieData",JSON.stringify(temp),1);

          vm.$router.replace({name:'Apply'});
        }
      },
      del(){
        let vm = this;
        let temp = JSON.parse(vm.$commonTools.getCookie("cookieData"));
        if(temp.works != undefined){
          temp.works.forEach(function (ele,index,arr) {
            if(index == vm.$route.query.index){
              arr.splice(index,1);
              temp.works = arr;
              vm.$commonTools.setCookie("cookieData",JSON.stringify(temp),1);
            }
          })
        }
        vm.$router.replace({name:'Apply'});
      }
    }
  }
</script>
<style scoped>
  @import '../../static/css/application.css';
</style>

