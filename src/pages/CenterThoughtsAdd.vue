<template>
  <div class="center_home_bg add-works">
    <div class="center-title" v-text="defautTitle"></div>
    <div class="outline-wrapper">
      <div class="addworks-wrap">
          <div class="item-wrapper">
              <el-row class="item-label">
                  <el-col :span="24">
                      <span class="register-spanblock"><span class="register-necessary">*</span>标题</span>
                  </el-col>
              </el-row>
              <el-row class="item-content">
                  <el-col :span="24">
                      <el-input v-model.trim="thoughtsTitle" placeholder="请输入感想标题"></el-input>
                  </el-col>
              </el-row>
          </div>
          <div class="item-wrapper">
              <el-row class="item-label">
                  <el-col :span="24">
                      <span class="register-spanblock"><span class="register-necessary" >*</span>内容</span>
                  </el-col>
              </el-row>
              <el-row class="item-content">
                <el-col :span="24">
                    <el-input v-model.trim="thoughtsContent" placeholder="请输入感想内容" type="textarea" :rows="14"></el-input>
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
            <el-button class="bottom-btn" type="primary" @click="addThoughts" round>提交</el-button>
          </el-col>
      </el-row>
      </div>
  </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'center-add-thoughts',
  data() {
    return {
      thoughtsTitle: '',
      thoughtsContent: '',
      type: '2',
      defautTitle: '添加总结'
    }
  },
  mounted: function() {
    if (this.$route.params.thoughtId) {
      this.defautTitle = '修改总结'
      this.getExistedThoughtData()
    }
  },
  methods: {
    thoughtsValidate() {
      let vm = this
      let msg = ''
      if (!vm.thoughtsTitle) {
        msg = '未填写总结标题'
      } else if (!vm.thoughtsContent) {
        msg = '未填写总结内容'
      }
      if (msg) {
        vm.$message.error(msg)
        return false
      } else {
        return true
      }
    },

    addThoughts() {
      let vm = this
      let postData = {}
      postData.title = vm.thoughtsTitle
      postData.content = vm.thoughtsContent
      postData.type = vm.type
      if (vm.$route.params.thoughtId) {
        postData.id = vm.$route.params.thoughtId
      }
      if (vm.thoughtsValidate()) {
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
              vm.$router.replace({
                name: 'CenterThoughts'
              })
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      }
    },
    getExistedThoughtData() {
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
            id: vm.$route.params.thoughtId
          }
        })
        .then(function(response) {
          if (response.data.status == '200') {
            vm.thoughtsTitle = response.data.result.title
            vm.thoughtsContent = response.data.result.content
          } else if (response.data.status == '201') {
            vm.$message({
              type: 'error',
              message: '无访问权限，请返回'
            })
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
  /* border-left: 5px solid #2f81b9; */
  margin: 0 auto;
  width: 85%;
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
.register-necessary {
  color: #cb1414;
  padding-right: 4px;
}
</style>

