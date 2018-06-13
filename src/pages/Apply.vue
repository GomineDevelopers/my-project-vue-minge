<template>
  <div class="quick_validate_bg"  >
    <vue-headful title="我的民革"/>
   <div class="blanks" v-if="isArea" @click="hide" @touchmove.prevent ></div>  
    <div class="dist-select" v-show="isArea"  >
      <v-distpicker type="mobile"  @selected="onSelected"></v-distpicker>
    </div> 
    <div class="register-container">
      <el-row>
        <el-row>
          <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>姓名</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-input v-model="registerName" size="medium" clearable maxlength="15"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>性别</span>
          </el-col>
        </el-row>
        <radio-picker  :radioValues="genderValues" @handleGender="showGender" ></radio-picker>
          <el-row>
            <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>出生日期</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-date-picker v-model="registerBirthday" type="date" size="large" placeholder="请选择"
                              class="register-select" :picker-options="pickerOptions1"></el-date-picker>
            </el-col>
          </el-row>
          <el-row>
          <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>民族</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-input v-model="ethnicGroup" size="medium" clearable maxlength="30"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>籍贯</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="24" >
           <el-input v-model="distmix" size="medium" clearable maxlength="30" @focus="showArea" ></el-input>
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
        <el-row>
          <el-col :span="24">
            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm"  class="demo-dynamic">
              <el-form-item size="medium">
              <el-input type="textarea" v-model="experience" autosize></el-input><i class="el-icon-plus" @click="addDomain"></i>
               <div class="form-items" 
               v-for="(domain, index) in dynamicValidateForm.domains"
                :key="domain.key"
                :prop="'domains.' + index + '.value'"
                :rules="{
                        required: true, message: '工作经历不能为空', trigger: 'blur'
                      }"
                ><el-input type="textarea"  autosize  v-model="domain.value"></el-input><i class="el-icon-minus"  @click.prevent="removeDomain(domain)"></i></div>  
              </el-form-item>
              
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>申请书</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-input
              type="textarea"
              v-model="applycation"
              :rows="4"
              placeholder="请输入内容"
               >
           </el-input>
          </el-col>
        </el-row>
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
      genderValues: ['男', '女'],
      genderValue: '男',
      degreeOptions: [
        { value: '本科', label: '本科' },
        { value: '硕士', label: '硕士' },
        { value: '博士', label: '博士' }
      ],
      dynamicValidateForm: {
        domains: []
      },
      degreeValue: '',
      experience: '',
      experiences: '',
      registerName: '',
      registerBirthday: '',
      isArea: false,
      province: '',
      city: '',
      area: '',
      distmix: '',
      ethnicGroup: '',
      applycation: ''
    }
  },
  components: {
    'radio-picker': RadioPicker
  },
  mounted: function() {
    this.showGender
  },
  methods: {
    hide: function() {
      this.isArea = false
      this.onSelected
      document
        .getElementsByTagName('body')[0]
        .setAttribute('style', 'overflow:auto')
    },
    showGender: function(radioValue) {
      this.genderValue = radioValue
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

    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain() {
      let hasEmpty = false
      this.dynamicValidateForm.domains.forEach(function(item, index) {
        if (!item.value) {
          hasEmpty = true
          return false
        }
      })

      if (!this.experience || hasEmpty) {
        this.$message({
          message: '未填写上一条信息',
          type: 'warning'
        })
      } else {
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now()
        })
      }
    },
    validator: function() {
      let vm = this
      let msg = ''
      if (!vm.registerBirthday && vm.type == 0) {
        msg = '未选择出生日期'
      } else if (!vm.registerName) {
        msg = '未填写真实姓名'
      } else if (!vm.genderValue) {
        msg = '未选择性别'
      } else if (!vm.ethnicGroup) {
        msg = '未填写民族'
      } else if (!vm.distmix) {
        msg = '未填写籍贯'
      } else if (!vm.degreeValue) {
        msg = '未填写学历信息'
      } else if (!vm.experiences) {
        msg = '未填写经历'
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
      vm.experiences = []
      vm.experiences.push(vm.experience)
      vm.dynamicValidateForm.domains.forEach(function(item, index) {
        vm.experiences.push(item.value)
      })

      postData.realname = vm.registerName
      postData.birth = vm.registerBirthday
      postData.sex = vm.genderValue
      postData.ethnicgroup = vm.ethnicGroup
      postData.origin = vm.distmix
      postData.education = vm.distmix
      postData.origin = vm.degreeValue
      postData.experience = vm.experiences
      postData.application = vm.applycation
      console.info(postData)
      if (vm.validator()) {
        vm
          .axios(vm.$commonTools.g_restUrl, {
            method: 'post',
            params: {
              i: '8',
              c: 'entry',
              p: 'user',
              do: 'shop',
              m: 'ewei_shop',
              ac: 'add_party',
              data: postData
            }
          })
          .then(function(response) {
            //vm.$router.push({ name: 'NoMember' })
          })
          .catch(function(error) {
            console.log(error)
          })
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.addOverflow {
  overflow: hidden;
}
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
.quick_validate_bg {
  height: auto;
  padding-bottom: 34%;
}
.blanks {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 10;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
}
</style>
<style>
.distpicker-address-wrapper select {
  width: 100%;
  height: 36px;
  outline: none;
  border: none;
  margin-top: 1vh;
  color: #bfbfbf;
}
.demo-dynamic {
  width: 100%;
}
.demo-dynamic .el-input--medium {
  width: 90%;
  margin-top: 1vh;
}
.demo-dynamic i {
  font-size: 18px;
  font-weight: 900;
  margin-left: 2px;
  color: #bfbfbf;
  opacity: 0.8;
  vertical-align: middle;
}
.dist-select {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50%;
  z-index: 999;
}
.dist-select {
  background: white;
}
.distCommit {
  background-color: white;
}
.el-textarea__inner {
  border: none;
}
.address-container {
  height: 40vh;
  overflow-y: scroll;
}
</style>
