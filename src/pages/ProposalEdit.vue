<template>
  <div class="proposal_bg">
    <vue-headful title="提案编辑"/>
    <div class="register-container">
      <el-row>
        <el-row>
          <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>提案名</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-input v-model.trim="form.ProposalName" size="medium" clearable></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>提案背景</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-input v-model.trim="form.ProposalBackground" size="medium" clearable></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>问题</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-input type="textarea" :rows="4" v-model.trim="form.ProposalQuestion"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>建议</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-input type="textarea" :rows="4" v-model.trim="form.ProposalAdvice"></el-input>
          </el-col>
        </el-row>
        <el-row class="register-btn">
          <el-col>
            <el-button type="primary" plain round class="my-btn" @click="postProposal(0)">保存</el-button>
          </el-col>
        </el-row>
        <el-row class="register-btn">
          <el-col>
            <el-button class="bottom-btn" round type="primary" @click="postProposal(1)">提交</el-button>
          </el-col>
          <p>{{form.proposalId}}</p>
        </el-row>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'proposal-edit',
  props: {},
  data() {
    return {
      form: {
        ProposalName: '',
        ProposalBackground: '',
        ProposalQuestion: '',
        ProposalAdvice: '',
        proposalId: ''
      }
    }
  },
  mounted: function() {
    this.editProposal()
  },
  methods: {
    editProposal() {
      let vm = this
      vm
        .axios(vm.$commonTools.g_restUrl, {
          method: 'post',
          params: {
            i: '8',
            c: 'entry',
            p: 'proposal',
            do: 'shop',
            m: 'ewei_shop',
            ac: 'one_proposal',
            id: vm.$route.params.proposalId
          }
        })
        .then(function(response) {
          if (response.status == '200') {
            vm.form.ProposalName = response.data.result.data.title
            vm.form.ProposalBackground = response.data.result.data.back
            vm.form.ProposalQuestion = response.data.result.data.suggest
            vm.form.ProposalAdvice = response.data.result.data.content
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    postProposal(typeId) {
      let vm = this
      let postData = {}
      postData.title = vm.form.ProposalName
      postData.back = vm.form.ProposalBackground
      postData.suggest = vm.form.ProposalQuestion
      postData.content = vm.form.ProposalAdvice
      postData.status = typeId;
      postData.id = vm.$route.params.proposalId;
      if (vm.proposalValidate()) {
        vm.axios(vm.$commonTools.g_restUrl, {
            method: 'post',
            params: {
              i: '8',
              c: 'entry',
              p: 'user',
              do: 'shop',
              m: 'ewei_shop',
              ac: 'add_proposal'
            },
            data: vm.$qs.stringify(postData)
          })
          .then(function(response) {
            if (response.status == '200') {
              vm.$router.replace({
                name: 'Proposal',
                params: { id: vm.$route.params.id, typeId: 1 }
              })
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      }
    },
    proposalValidate: function() {
      let vm = this
      let msg = ''
      if (!vm.form.ProposalName) {
        msg = '未填写提案名称'
      } else if (!vm.form.ProposalBackground) {
        msg = '未填写提案背景'
      } else if (!vm.form.ProposalQuestion) {
        msg = '未填写提案背景'
      } else if (!vm.form.ProposalAdvice) {
        msg = '未填写提案背景'
      }
      if (msg) {
        vm.$message.error(msg)
        return false
      } else {
        return true
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.register-container {
  text-align: left;
  margin: 5vh auto;
  width: 70%;
}

.register-spanblock {
  display: inline-block;
  text-align: left;
  line-height: 6vh;
}
.my-btn {
  width: 96%;
  padding: 12px 0;
  letter-spacing: 1px;
}
.register-necessary {
  color: #cb1414;
  padding-right: 4px;
}

.bottom-btn {
  width: 96%;
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
</style>


