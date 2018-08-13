<template>
  <div class="quick_validate_bg"  >
    <vue-headful title="入党申请"/>
   <div class="distpicker-blanks" v-if="isArea" @click="hide" @touchmove.prevent ></div>
    <div class="dist-select" v-show="isArea"  >
      <v-distpicker type="mobile"  @selected="onSelected"></v-distpicker>
    </div>
    <div class="register-container">
        <el-row>
          <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>姓名</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-input v-model.trim="registerName" size="medium" clearable maxlength="15"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>性别</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <radio-picker  :radioValues="checkValues" :radioValue="radioValue" @handleRadioValue="showGender" ></radio-picker>
          </el-col>
        </el-row>
          <el-row>
            <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>出生日期</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-date-picker v-model="registerBirthday"
              type="date"
              size="large"
              align="center"
              placeholder="请选择"
              class="register-select"
              :picker-options="pickerOptions1"></el-date-picker>
            </el-col>
          </el-row>
          <el-row>
          <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>民族</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-input v-model.trim="ethnicGroup" size="medium" clearable maxlength="30"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>籍贯</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="24" >
           <el-input v-model.trim="distmix" readonly= "true" size="medium" clearable maxlength="30" @focus="showArea" ></el-input>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>学历</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-select v-model="degreeValue" placeholder="请选择" size="medium" class="register-select">
              <el-option v-for="item in degreeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>工作经历</span></el-col>
        </el-row>
        <!--<el-row>
          <el-col :span="24">
            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm"  class="demo-dynamic">
              <el-form-item size="medium">
              <el-input type="textarea" v-model.trim="experience" autosize class="input_border"></el-input><i class="el-icon-plus" @click="addDomain"></i>
               <div class="form-items"
               v-for="(domain, index) in dynamicValidateForm.domains"
                :key="domain.key"
                    :prop="'domains.' + index + '.value'"
                    :rules="{required: true, message: '工作经历不能为空', trigger: 'blur'}"
                >
                 <el-input type="textarea"  autosize  v-model.trim="domain.value" class="input_border"></el-input>
                 <i class="el-icon-minus"  @click.prevent="removeDomain(domain)"></i>
               </div>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>-->
        <el-row>
          <el-col :span="24"><div @click="addExperience" class="experience">+添加工作经历</div></el-col>
        </el-row>
        <el-row v-for="(item,index) in WorkExperiences" :key="index">
          <el-input class="inputText" v-model="WorkExperiences[index]" clearable readonly @focus="goDetail(index)"></el-input>
        </el-row>
        <el-row>
          <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>申请书</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-input class="input_border"
              type="textarea"
              v-model.trim="applycation"
              :rows="4"
              placeholder="请输入内容"
               >
           </el-input>
          </el-col>
        </el-row>
        <el-row class="register-btn">
          <el-col>
            <el-button type="primary" round class="bottom-btn" @click="register">提交</el-button>
          </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
import RadioPicker from '@/components/RadioPicker.vue'
export default {
  name: 'apply',
  data() {
    return {
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      checkValues: [{ text: '女', value: 1 }, { text: '男', value: 0 }],
      radioValue: 0,
      degreeOptions: [
        { value: '本科', label: '本科' },
        { value: '硕士', label: '硕士' },
        { value: '博士', label: '博士' }
      ],
      degreeValue: '',
      registerName: '',
      registerBirthday: '',
      isArea: false,
      province: '',
      city: '',
      area: '',
      distmix: '',
      ethnicGroup: '',
      applycation: '',
      WorkExperiences:[]
    }
  },
  components: {
    'radio-picker': RadioPicker
  },
  mounted: function() {
    let vm = this;
    vm.showGender();
    vm.getExitData();
    if(vm.$commonTools.getCookie("cookieData")){
      let cookieData = JSON.parse(vm.$commonTools.getCookie("cookieData"));
      if(cookieData.works !=undefined){
        cookieData.works.forEach(function (ele,index,arr) {
          let str = ele.company_name + ',' + ele.position+','+ ele.start_time+','+ ele.end_time+','+ ele.address;
          vm.WorkExperiences.push(str);
        })
      }
    }
  },
  methods: {
    getExitData() {
      let vm = this;
      if(vm.$commonTools.getCookie("cookieData")){
        let cookieData = JSON.parse(vm.$commonTools.getCookie("cookieData"));
        vm.registerName = cookieData.realname;
        vm.registerBirthday = cookieData.birth;
        vm.ethnicGroup = cookieData.ethnicgroup;
        vm.distmix = cookieData.origin;
        vm.degreeValue = cookieData.education;
        vm.applycation = cookieData.application;
        vm.radioValue = cookieData.sex;
        vm.$children[5].$children[0].$children[0].defaultValue = vm.radioValue;
      }else{
        vm.axios(vm.$commonTools.g_restUrl, {
          params: {
            i: '8',
            c: 'entry',
            p: 'user',
            do: 'shop',
            m: 'ewei_shop',
            ac: 'get_verification'
          }
        })
          .then(function(response) {
            if (response.status == 200) {
              vm.registerName = response.data.result.realname;
              if (response.data.result.birth)
                vm.registerBirthday = new Date(
                  parseInt(response.data.result.birth) * 1000
                )
            }
          })
          .catch(function(error) {
            console.info(error)
          })
      }
    },
    hide: function() {
      this.isArea = false
      this.onSelected
      document
        .getElementsByTagName('body')[0]
        .setAttribute('style', 'overflow:auto')
    },
    showGender: function(radioValue) {
      this.radioValue = radioValue
    },
    onSelected(data) {
      let vm = this
      vm.province = data.province.value
      vm.city = data.city.value
      vm.area = data.area.value
      vm.distmix = vm.province + ' ' + vm.city + ' ' + vm.area
      document
        .getElementsByTagName('body')[0]
        .setAttribute('style', 'overflow:auto')
      vm.isArea = false
    },
    showArea: function() {
      this.isArea = true
      document
        .getElementsByTagName('body')[0]
        .setAttribute('style', 'overflow:hidden')
    },
    validator: function() {
      let vm = this;
      let msg = '';
      if (!vm.registerBirthday) {
        msg = '未选择出生日期'
      } else if (!vm.registerName) {
        msg = '未填写真实姓名'
      } else if (!vm.ethnicGroup) {
        msg = '未填写民族'
      } else if (!vm.distmix) {
        msg = '未填写籍贯'
      } else if (!vm.degreeValue) {
        msg = '未填写学历信息'
      }else if (vm.WorkExperiences.length == 0) {
        msg = '未填写工作经历'
      } else if (!vm.applycation) {
        msg = '未填写申请'
      }

      if (msg) {
        vm.$message.error(msg)
        return false
      } else {
        return true
      }
    },
    register: function() {
      let vm = this
      let postData = {}
      /*vm.experiences = []
      vm.experiences.push(vm.experience)*/
      /*vm.dynamicValidateForm.domains.forEach(function(item, index) {
        vm.experiences.push(item.value)
      })*/

      postData.realname = vm.registerName;
      postData.sex = vm.radioValue;
      postData.birth = vm.registerBirthday;
      postData.ethnicgroup = vm.ethnicGroup;
      postData.origin = vm.distmix;
      postData.education = vm.degreeValue;
      postData.experience = vm.WorkExperiences;
      postData.application = vm.applycation;


      if (vm.validator()) {
        vm.axios(vm.$commonTools.g_restUrl, {
            method: 'post',
            params: {
              i: '8',
              c: 'entry',
              p: 'user',
              do: 'shop',
              m: 'ewei_shop',
              ac: 'add_party'
            },
            data: vm.$qs.stringify(postData)
          })
          .then(function(response) {
            if (response.status == 200) {
              vm.$router.push({ name: 'NoMember' })
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      }
    },
    setApplyCookies:function(){
      let vm = this;
      let postData = {};
      if(vm.$commonTools.getCookie("cookieData")){
        postData = JSON.parse(vm.$commonTools.getCookie("cookieData"));
      }

      postData.realname = vm.registerName;
      postData.sex = vm.radioValue;
      postData.birth = vm.registerBirthday;
      postData.ethnicgroup = vm.ethnicGroup;
      postData.origin = vm.distmix;
      postData.education = vm.degreeValue;
      postData.application = vm.applycation;

      vm.$commonTools.setCookie("cookieData",JSON.stringify(postData),1);
    },
    addExperience:function () {
      this.setApplyCookies();
      this.$router.replace({name:'ApplyWorkExp'});
    },
    goDetail(index){
      this.$router.push({name:'ApplyWorkExp',query: { index: index }});
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.register-container {
  text-align: left;
  width: 70%;
  overflow-y: auto;
  margin: 0 auto;
  padding: 3vh;
  height: 70vh;
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
  width: 50%;
  padding: 12px 0;
  letter-spacing: 1px;
  box-shadow: 0px 0px 20px 5px #e9e9e9;
}
.register-btn {
  text-align: center;
  margin-top: 30px;
}
.register-select {
  width: inherit;
}

.experience{
  color: #a6a6a6;
  font-size: .8rem;
}
</style>

