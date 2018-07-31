<template>
  <div class="center_home_bg ">
    <div class="center-title" >发起会议</div>
    <div class="content-wrapper">
    <div class="outline-wrapper">
    <div class="addmeeting-wrap">
        <div class="item-wrapper">
            <el-row class="item-label">
                <el-col :span="24">
                    <span class="register-spanblock"><span class="register-necessary" >*</span>参会人员</span>
                </el-col>
            </el-row>
            <el-row class="item-content">
          <el-col :span="24">
            <el-select v-model="selectedGroup" placeholder="请选择分组" size="medium" class="book-select">
              <el-option v-for="item in groups"  :label="item.name"
                         :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-col>
        </el-row>
        </div>
        
        <div class="item-wrapper">
            <el-row class="item-label">
                <el-col :span="24">
                    <span class="register-spanblock"><span class="register-necessary" >*</span>会议时间</span>
                </el-col>
            </el-row>
            <el-row class="item-content">
                    <el-col :span="24">
                       <el-date-picker
                        v-model="meetingTime"
                        size="medium"
                        type="datetime"
                        value-format="yyyy-MM-dd hh:mm"
                        :picker-options="pickerOptions1"
                        placeholder="选择日期时间">
                      </el-date-picker>
                    </el-col>
            </el-row>
        </div>
        <div class="item-wrapper">
            <el-row class="item-label">
                <el-col :span="24">
                    <span class="register-spanblock"><span class="register-necessary" >*</span>会议地点</span>
                </el-col>
            </el-row>
            <el-row class="item-content">
                    <el-col :span="24">
                        <el-input v-model="meetingLocation" placeholder="请输入会议地点"></el-input>
                    </el-col>
            </el-row>
        </div>
        <div class="item-wrapper">
            <el-row class="item-label">
                <el-col :span="24">
                    <span class="register-spanblock"><span class="register-necessary">*</span>会议主题</span>
                </el-col>
            </el-row>
            <el-row class="item-content">
                    <el-col :span="24" >
                        <el-input v-model="meetingContent" placeholder="请输入会议主题" type="textarea"   :rows="8"></el-input>
                    </el-col>
            </el-row>
        </div>
        </div>

        </div>
        <div class="addworks-wrap">
        <div class="item-wrapper">
        <div class="submit-wrapper">
      <el-row class="item-content">
        <el-col :span="24">
            <el-button class="bottom-btn" type="primary" @click="addWorks" round>提交</el-button>
          </el-col>
      </el-row>
      </div>
  </div>
      </div>
  </div>
  </div>
</template>
<script>
export default {
  name: 'add-meeting',
  data() {
    return {
      selectedGroup: '',
      meetingContent: '',
      meetingTime: '',
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 3600 * 1000 * 24
        }
      },
      meetingLocation: '',
      groups: [],
      groupName: ''
    }
  },
  mounted: function() {
    this.getExistGroupData()
  },
  methods: {
    worksValidate() {
      let vm = this
      let msg = ''
      if (vm.selectedGroup == null || vm.selectedGroup == '') {
        msg = '未选择参会人员'
      } else if (!vm.meetingTime) {
        msg = '未选择会议时间'
      } else if (!vm.meetingLocation) {
        msg = '未填写会议地点'
      } else if (!vm.meetingContent) {
        msg = '未填写会议主题'
      }
      if (msg) {
        vm.$message.error(msg)
        return false
      } else {
        return true
      }
    },

    addWorks() {
      let vm = this
      let postData = {}
      postData.theme = vm.meetingContent
      postData.date = vm.meetingTime
      postData.address = vm.meetingLocation
      vm.groups.forEach(function(element, index, array) {
        if (vm.selectedGroup == element.id) {
          vm.groupName = element.name
        }
      })
      postData.group_name = vm.groupName
      postData.groupid = vm.selectedGroup

      if (vm.worksValidate()) {
        vm
          .axios(vm.$commonTools.g_restUrl, {
            method: 'post',
            params: {
              i: '8',
              c: 'entry',
              p: 'mq',
              do: 'shop',
              m: 'ewei_shop',
              ac: 'mq_send'
            },
            data: vm.$qs.stringify(postData)
          })
          .then(function(response) {
            if (response.status == '200') {
              WeixinJSBridge.call('closeWindow')
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      }
    },
    getExistGroupData() {
      let vm = this
      vm
        .axios(vm.$commonTools.g_restUrl, {
          params: {
            i: '8',
            c: 'entry',
            p: 'mq',
            do: 'shop',
            m: 'ewei_shop',
            ac: 'mq_group'
          }
        })
        .then(function(response) {
          if (response.data.status == '1') {
            vm.groups = response.data.result.groups
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  }
}
</script>
<style scoped>
.outline-wrapper {
  border-radius: 5px;
  background: #ffffff;
  border-left: 5px solid #2f81b9;
  width: 85%;
  margin: 0 auto;
  padding: 1vh 0 3vh 0;
}
.content-wrapper {
  margin-top: 3vh;
}
.addmeeting-wrap {
  text-align: left;
  margin: 0vh auto;
  width: 80%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.addmeeting-wrap .el-select {
  width: 100%;
}
.item-wrapper {
  margin-top: 0.1vh;
}
.item-wrapper .item-label {
  margin-top: 1.2vh;
}
.item-content {
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 1vh;
}
.bottom-btn {
  width: 80%;
  margin-top: 2vh;
  background-color: #2192e0;
  margin-bottom: 2vh;
  padding: 12px 0;
  letter-spacing: 1px;
  -webkit-box-shadow: 0px 0px 20px 5px #e9e9e9;
  box-shadow: 0px 0px 20px 5px #e9e9e9;
}
.register-necessary {
  color: #cb1414;
  padding-right: 4px;
}
.outline-wrapper .el-textarea__inner {
  border: 1px solid #cccccc;
  background-color: #f5fafd;
}
.outline-wrapper .el-input__inner {
  background-color: #f5fafd;
}
</style>
<style>
</style>
