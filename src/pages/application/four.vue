<template>
    <div>
      <div class="application_header"></div>
      <div class="application_bg">
        <div class="container">
          <div class="content">
            <el-row><span class="necessary">*</span>简历</el-row>
            <el-row class="addDiv"><div class="addSome" @click="addResume">+添加工作简历</div></el-row>
            <el-row v-for="(item,index) in resumeShow" :key="index">
              <el-input class="inputText" v-model="resumeShow[index]" clearable readonly @focus="goResumeDetail(index)"></el-input>
            </el-row>
            <el-row>主要成就及获奖情况</el-row>
            <el-row class="addDiv"><div class="addSome" @click="addAward">+添加获奖信息</div></el-row>
            <el-row v-for="(item,index) in awardShow" :key='index+"a"'>
              <el-input class="inputText" v-model="awardShow[index]" clearable readonly @focus="goAwardDetail(index)"></el-input>
            </el-row>
            <el-row>曾受过何种处分</el-row>
            <el-row><el-input v-model.trim="punishment" class="inputText" clearable></el-input></el-row>
            <el-row>撤销处分情况</el-row>
            <el-row><el-row><el-input v-model.trim="cancelPunish" class="inputText" clearable></el-input></el-row></el-row>
          </div>
          <el-row>
            <el-button type="primary" round class="bottom-btn" @click="nextPage">下一页</el-button>
          </el-row>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "four",
      data(){
          return {
            resumeShow:[],
            awardShow:[],
            punishment:'',
            cancelPunish:''
          }
      },
      mounted(){
        this.getExitData();
      },
      methods:{
        getExitData(){
          let vm = this;
          if(vm.$commonTools.getCookie("cookieData")){
            let cookieData = JSON.parse(vm.$commonTools.getCookie("cookieData"));
            if(cookieData.resume != undefined){
              cookieData.resume.forEach(function (ele,index,arr) {
                let str = ele.unit + ',' + ele.location+ ',' + ele.position+ ',' + ele.start_time+','+ele.end_time;
                vm.resumeShow.push(decodeURI(str));
              });
            }
            if(cookieData.award != undefined){
              cookieData.award.forEach(function (ele,index,arr) {
                let str = ele.achievement + ',' + ele.level+ ',' + ele.award_time;
                vm.awardShow.push(decodeURI(str));
              });
            }
            if(cookieData.dispose != undefined){
              vm.punishment = decodeURI(cookieData.dispose);
            }
            if(cookieData.cancel != undefined){
              vm.cancelPunish = decodeURI(cookieData.cancel);
            }
          }
        },
        validator(){
          let vm = this;
          let msg = '';
          if(vm.resumeShow.length == 0){
            msg = "请填写工作简历";
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
          temp = JSON.parse(vm.$commonTools.getCookie("cookieData"));
          temp.dispose = encodeURI(vm.punishment);
          temp.cancel = encodeURI(vm.cancelPunish);

          vm.$commonTools.setCookie("cookieData", JSON.stringify(temp), 1);
        },
        nextPage:function () {
          let vm = this;
          if(vm.validator()){
            vm.setCookies();
            vm.$router.push({name:'ApplicationFive'});
          }
        },
        addResume:function () {
          this.setCookies();
          this.$router.push({name:'ApplicationResume'});
        },
        addAward:function () {
          this.setCookies();
          this.$router.push({name:'ApplicationAward'});
        },
        goResumeDetail(index){
          this.setCookies();
          this.$router.push({name:'ApplicationResume',query: { index: index }});
        },
        goAwardDetail(index){
          this.setCookies();
          this.$router.push({name:'ApplicationAward',query: { index: index }});
        }
      }
    }
</script>

<style scoped>
  @import '../../../static/css/application.css';
</style>
