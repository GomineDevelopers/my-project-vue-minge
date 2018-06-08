<template>
  <div class="center_no_bg">
    <vue-headful title="我的民革--注册"/>
    <div class="register-container">
      <el-row>
        <el-row>
          <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>身份</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-select v-model="value" placeholder="请选择" size="medium" class="register-select">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>真实姓名</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-input v-model="inputContent" size="medium" clearable></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>手机号码</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-input v-model="inputContent" size="medium" clearable></el-input>
          </el-col>
        </el-row>
        <div v-show="isShow">
          <el-row>
            <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>邮箱</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-input v-model="inputContent" size="medium" clearable></el-input>
            </el-col>
          </el-row>
        </div>
        <el-row>
          <el-col :span="24"><span class="register-spanblock">所在企业</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-input v-model="inputContent" size="medium" clearable></el-input>
          </el-col>
        </el-row>
        <div v-show="isShow">
          <el-row>
            <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>出生日期</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-date-picker v-model="birthday" type="date" size="large" placeholder="请选择" class="register-select"></el-date-picker>
            </el-col>
          </el-row>
        </div>
        <el-row class="register-btn">
          <el-col>
            <el-button type="primary" round class="bottom-btn">注册</el-button>
          </el-col>
        </el-row>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        options: [
          {value: '选项1',label: '中共党员'},
          {value: '选项2',label: '中国国民党革命委员会'},
          {value: '选项3',label: '中国民主同盟'},
          {value: '选项4',label: '中国民主建国会'},
          {value: '选项5',label: '中国民主促进会'},
          {value: '选项5',label: '中国农工民主党'},
          {value: '选项5',label: '中国致公党'},
          {value: '选项5',label: '九三学社'},
          {value: '选项5',label: '台湾民主自治同盟'},
          {value: '选项5',label: '无党派人士'}
          ],
        value:'',
        inputContent:'',
        birthday:'',
        isShow:true
      }
    },
    created(){},
    methods:{
      /*getMyComments:function () {
        let vm = this;
        vm.axios(vm.$commonTools.g_restUrl,{
          params:{
            i: "8",
            c: "entry",
            p: "common",
            do: "shop",
            m: "ewei_shop",
            ac:"collection",
            psize:"999"
          }
        })
          .then(function (response) {
            if(response.data.result.data){
              vm.dataList = response.data.result.data;
            }

          })
          .catch(function (error) {
            console.log(error);
          });
      }*/
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .register-container{
    text-align: left;
    margin: 20px 50px;
  }
  .register-spanblock{
    font-size: 14px;
    display: inline-block;
    text-align: left;
    padding: 10px 0 2px 0;
  }
  .register-necessary{
    color:#cb1414;
  }
  .bottom-btn{
    width: 96%;
    padding: 12px 0;
    letter-spacing: 1px;
    box-shadow: 0px 0px 20px 5px #E9E9E9;
  }
  .register-btn{
    text-align: center;
    margin-top: 30px;
  }
  .register-select{
    width: inherit;
  }
</style>
