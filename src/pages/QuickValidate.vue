<template>
  <div class="quick_validate_bg">
    <vue-headful title="快速认证"/>
    <div class="quickValidate-container">
      <el-row>
        <el-col :span="24"><span class="quickVal-spanblock"><span class="quickVal-necessary">*</span>真实姓名</span></el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-input v-model.trim="quickValName" size="medium" clearable maxlength="15"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><span class="quickVal-spanblock"><span class="quickVal-necessary">*</span>入党介绍人</span></el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-input v-model.trim="quickValIntroducer" size="medium" clearable maxlength="15"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><span class="quickVal-spanblock"><span class="quickVal-necessary">*</span>出生日期</span></el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-date-picker v-model="quickValBirthday" type="date" size="large" placeholder="请选择"
                          class="quickVal-select" :picker-options="pickerOptions1"></el-date-picker>
        </el-col>
      </el-row>
      <el-row class="quickVal-btn">
        <el-col>
          <el-button type="primary" round class="bottom-btn" @click="quickValidate">快速验证</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "quick-validate",
    data(){
      return{
        quickValName:'',
        quickValIntroducer:'',
        quickValBirthday:'',
        pickerOptions1: {
          disabledDate(time) {return time.getTime() > Date.now();}
        }
      }
    },
    methods:{
      quickValidate:function () {
        let vm = this;
        let postData = {};
        postData.realname = vm.quickValName;
        postData.introducer = vm.quickValIntroducer;
        postData.birth = vm.quickValBirthday;

        if(vm.validator()){
          vm.axios(vm.$commonTools.g_restUrl,{
            method: 'post',
            params: {
              i: "8",
              c: "entry",
              p: "user",
              do: "shop",
              m: "ewei_shop",
              ac: "add_verification"
            },
            data: vm.$qs.stringify(postData)
          })
            .then(function (response) {
              if(response.status == 200){
                vm.$router.push({ name: 'NoMember' })
              }
            })
            .catch(function (error) {
              console.info(error);
            })
        }

      },
      validator:function () {
        let vm = this;
        let msg = "";
        if(!vm.quickValName){
          msg = "未填写真实姓名";
        }else if(!vm.quickValIntroducer){
          msg = "未填写入党介绍人姓名";
        }else if(!vm.quickValBirthday){
          msg = "未选择出生日期";
        }

        if(msg){
          vm.$message.error(msg);
          return false;
        }else{
          return true;
        }
      }
    }
  }
</script>

<style scoped>
  .quickValidate-container {
    text-align: left;
    margin: 3vh auto;
    width: 70%;
  }

  .quickVal-spanblock{
    display: inline-block;
    text-align: left;
    line-height: 5vh;
    padding-top: 2vh;
  }

  .quickVal-necessary{
    color: #cb1414;
    padding-right: 4px;
  }

  .quickVal-select{
    width: inherit;
  }

  .quickVal-btn {
    text-align: center;
    margin-top: 40px;
  }

  .bottom-btn {
    width: 96%;
    padding: 12px 0;
    letter-spacing: 1px;
    box-shadow: 0px 0px 20px 5px #E9E9E9;
  }
</style>
