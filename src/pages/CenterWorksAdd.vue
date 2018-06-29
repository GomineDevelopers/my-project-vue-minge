<template>
  <div class="center_home_bg ">
    <div class="center-title" v-text="defaultTitle"></div>
    <div class="outline-wrapper">
    <div class="addworks-wrap">
        <div class="item-wrapper">
            <el-row class="item-label">
                <el-col :span="24">
                    <span class="register-spanblock"><span class="register-necessary">1.</span>标题</span>
                </el-col>
            </el-row>
            <el-row class="item-content">
                    <el-col :span="24">
                        <el-input v-model="worksTitle" placeholder="请输入标题"></el-input>
                    </el-col>
            </el-row>
        </div>
        <div class="item-wrapper">
            <el-row class="item-label">
                <el-col :span="24">
                    <span class="register-spanblock"><span class="register-necessary">2.</span>内容</span>
                </el-col>
            </el-row>
            <el-row class="item-content">
                    <el-col :span="24"  class="aaa">
                        <el-input v-model="worksContent" placeholder="请输入作品内容" type="textarea" :rows="14"></el-input>
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
</template>
<script>
export default {
  name: 'center-works-add',
  data() {
    return {
      worksTitle: '',
      worksContent: '',
      type: '1',
      defaultTitle:'添加作品'
    }
  },
  mounted: function() {
    if (this.$route.params.workId) {
      this.defaultTitle='修改作品'
      this.getExistWorkData()
    }
  },
  methods: {
    worksValidate() {
      let vm = this
      let msg = ''
      if (!vm.worksTitle) {
        msg = '未填写作品名称'
      } else if (!vm.worksContent) {
        msg = '未填写作品内容'
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
      postData.title = vm.worksTitle
      postData.content = vm.worksContent
      postData.type = vm.type
      if(vm.$route.params.workId){
        postData.id = vm.$route.params.workId
      }
      if (vm.worksValidate()) {
        vm
          .axios(vm.$commonTools.g_restUrl, {
            method: 'post',
            params: {
              i: '8',
              c: 'entry',
              p: 'works',
              do: 'shop',
              m: 'ewei_shop',
              ac: 'add_works'
            },
            data: vm.$qs.stringify(postData)
          })
          .then(function(response) {
            if (response.status == '200') {
              vm.$router.push({
                name: 'CenterWorks'
              })
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      }
    },
    getExistWorkData() {
      let vm = this
      vm
        .axios(vm.$commonTools.g_restUrl, {
          params: {
            i: '8',
            c: 'entry',
            p: 'works',
            do: 'shop',
            m: 'ewei_shop',
            ac: 'detail_works',
            id: vm.$route.params.workId
          }
        })
        .then(function(response) {
          vm.worksTitle = response.data.result.title
          vm.worksContent = response.data.result.content
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
  margin-bottom: 1vh;
  width: 85%;
  margin: 3vh auto;
  padding: 1vh 0 3vh 0;
}
.addworks-wrap {
  text-align: left;
  margin: 0vh auto;
  width: 80%;
  display: flex;
  justify-content: center;
  flex-direction: column;
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
</style>
<style>
.outline-wrapper .el-textarea__inner {
  border: 1px solid #cccccc;
  background-color: #f5fafd;
}
.outline-wrapper .el-input__inner {
  background-color: #f5fafd;
}
</style>
