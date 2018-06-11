<template>
  <div class="center_no_bg">
    <vue-headful title="我的民革"/>
    <div class="register-container">
      <el-row>
        <el-row>
          <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>身份</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-select v-model="selected" placeholder="请选择" size="medium" class="register-select">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>真实姓名</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-input v-model="registerName" size="medium" clearable maxlength="15"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>手机号码</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-input v-model="registerPhone" size="medium" clearable maxlength="11"></el-input>
          </el-col>
        </el-row>
        <div v-show="type == 0">
          <el-row>
            <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>邮箱</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-input v-model="registerEmail" size="medium" clearable maxlength="25"></el-input>
            </el-col>
          </el-row>
        </div>
        <el-row>
          <el-col :span="24"><span class="register-spanblock">所在企业</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-input v-model="registerCompany" size="medium" clearable maxlength="30"></el-input>
          </el-col>
        </el-row>
        <div v-show="type == 0">
          <el-row>
            <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>出生日期</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-date-picker v-model="registerBirthday" type="date" size="large" placeholder="请选择"
                              class="register-select"></el-date-picker>
            </el-col>
          </el-row>
        </div>
        <el-row class="register-btn">
          <el-col>
            <el-button type="primary" round class="bottom-btn" @click="register">注册</el-button>
          </el-col>
        </el-row>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'register',
    data() {
      return {
        options: [
          {value: '中共党员', label: '中共党员'},
          {value: '中国国民党革命委员会', label: '中国国民党革命委员会'},
          {value: '中国民主同盟', label: '中国民主同盟'},
          {value: '中国民主建国会', label: '中国民主建国会'},
          {value: '中国民主促进会', label: '中国民主促进会'},
          {value: '中国农工民主党', label: '中国农工民主党'},
          {value: '中国致公党', label: '中国致公党'},
          {value: '九三学社', label: '九三学社'},
          {value: '台湾民主自治同盟', label: '台湾民主自治同盟'},
          {value: '无党派人士', label: '无党派人士'}
        ],
        type: 1,
        selected: '',
        registerName: '',
        registerPhone: '',
        registerEmail: '',
        registerCompany: '',
        registerBirthday: ''
      }
    },
    watch: {
      selected: 'getShow'
    },
    methods: {
      getShow: function () {
        let vm = this;
        if (vm.selected == "中共党员") {
          vm.type = '0';
        } else {
          vm.type = '1';
        }
      },
      validator: function () {
        let vm = this;
        let msg = "";
        let regP = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
        let regE = /\w@\w*\.\w/;

        if (!vm.selected) {
          msg = "未选择身份";
        } else if (!vm.registerName) {
          msg = "未填写真实姓名";
        } else if (!vm.registerPhone) {
          msg = "未填写手机号码";
        } else if (vm.registerPhone && !regP.test(vm.registerPhone)) {
          msg = "手机号格式不正确";
        } else if (!vm.registerEmail && vm.type == 0) {
          msg = "未填写邮箱";
        } else if (vm.registerEmail && !regE.test(vm.registerEmail)) {
          msg = "邮箱格式不正确";
        } else if (!vm.registerBirthday && vm.type == 0) {
          msg = "未选择出生日期";
        }

        if (msg) {
          vm.$message.error(msg);
          return false;
        }
        else {
          return true;
        }
      },
      register: function () {
        let vm = this;
        let postData = {};
        postData.identity = vm.selected;
        postData.realname = vm.registerName;
        postData.mobile = vm.registerPhone;
        postData.company_name = vm.registerCompany;

        if (vm.type == 0) {
          postData.email = vm.registerEmail;
          postData.birth = vm.registerBirthday;
        }
        if (vm.validator()) {
          vm.axios(vm.$commonTools.g_restUrl, {
            method: 'post',
            params: {
              i: "8",
              c: "entry",
              p: "user",
              do: "shop",
              m: "ewei_shop",
              ac: "update_member",
              data:postData
            }
          })
            .then(function (response) {
              /*vm.$router.push({ name: 'Proposal' });*/
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .register-container {
    text-align: left;
    margin: 3vh auto;
    width: 70%;
  }

  .register-spanblock {
    display: inline-block;
    text-align: left;
    line-height: 5vh;
  }

  .register-necessary {
    color: #cb1414;
    padding-right: 4px;
  }

  .bottom-btn {
    width: 96%;
    padding: 12px 0;
    letter-spacing: 1px;
    box-shadow: 0px 0px 20px 5px #E9E9E9;
  }

  .register-btn {
    text-align: center;
    margin-top: 30px;
  }

  .register-select {
    width: inherit;
  }
</style>

