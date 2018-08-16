<template>
  <div class="quick_validate_bg apply-with-applycation ">
    <div class="container2">
    <div class="title2" v-text="defaultTitle"></div>
     <div class="content">
          <el-row>
            <el-col :span="24">
              <el-input v-model.trim="MessageTo" placeholder="请输入" class="inputText"></el-input>
            </el-col>
          </el-row>
          <el-row>
          <el-col :span="24"><span class="register-spanblock"><span class="necessary">*</span>正文</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-input class="input_border"
              type="textarea"
              v-model="applycation"
              :rows="20"
              placeholder="请输入内容"
               >
           </el-input>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><span class="register-spanblock inputText"><span class="necessary">*</span>申请日期</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-date-picker v-model="applyTime"
              type="date"
              size="large"
              align="center"
              placeholder="请选择"
              class="register-select inputText"
              :picker-options="pickerOptions1"></el-date-picker>
            </el-col>
          </el-row>

        </div>
        <el-row class="application_btn">
          <el-button type="primary" round @click="save">保存</el-button>
          <el-button type="primary" round plain @click="delData">删除</el-button>
        </el-row>
    </div>
    </div>
</template>
<script>
export default {
  name: "ApplyWithApplycation",
  data() {
    return {
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      MessageTo: "尊敬的领导",
      defaultTitle: "申请书",
      applycation: "",
      applyTime: ""
    };
  },
  mounted: function() {
    let exitData = JSON.parse(this.$commonTools.getCookie("cookieData"));
    if (exitData.applycation != "") {
      this.defaultTitle = "修改申请书";
      this.getExistWorkData();
    }
  },
  methods: {
    getExistWorkData() {
      let vm = this;
      let exitData = JSON.parse(vm.$commonTools.getCookie("cookieData"));
      vm.MessageTo = decodeURI(exitData.MessageTo);
      vm.applycation = decodeURI(exitData.applycation);
      vm.applyTime = exitData.applyTime;
    },
    applycationValidate() {
      let vm = this;
      let msg = "";
      if (!vm.MessageTo) {
        msg = "未填写启送对象";
      } else if (!vm.applycation) {
        msg = "未填写申请书";
      } else if (!vm.applyTime) {
        msg = "未选择申请时间";
      }
      if (msg) {
        vm.$message.error(msg);
        return false;
      } else {
        return true;
      }
    },
    save() {
      var vm = this;
      let postData = {};
      let temp = JSON.parse(vm.$commonTools.getCookie("cookieData"));
      if (vm.applycationValidate()) {
        temp.MessageTo = encodeURI(vm.MessageTo);
        temp.applycation = encodeURI(vm.applycation);
        temp.applyTime = vm.applyTime;
        vm.$commonTools.setCookie("cookieData", JSON.stringify(temp), 1);
        vm.$router.replace({ name: "Apply" });
      }
    },
    delData() {
      let vm = this;
      vm.$router.replace({ name: "Apply" });
    }
  }
};
</script>
<style scoped>
.container2 {
  height: 70vh;
  overflow: auto;
  margin: 6vh 17vw;
}
.title2 {
  font-weight: bold;
  color: #185a88;
}
.apply-with-applycation .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.content {
  text-align: left;
  margin-top: 2vh;
}
.content .inputText {
  padding: 0.6vh 0 1vh 0;
}
.necessary {
  color: #cb1414;
}
</style>
