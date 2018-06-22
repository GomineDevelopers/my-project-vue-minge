<template>
 <div class="proposal_bg">
     <el-row class="check-proposal-wrap">
       <el-col :span="24">
        <el-row class="proposal-card">
          <el-col :span="24" class="proposal-title">提案名称</el-col>
          <el-col :span="24" class="proposal-content" v-text="proposalTitle">

          </el-col>
        </el-row>
        <el-row class="proposal-card">
          <el-col :span="24" class="proposal-title" >提案背景</el-col>
          <el-col :span="24" class="proposal-content" v-text="proposalBackground">

          </el-col>
        </el-row>
        <el-row class="proposal-card">
          <el-col :span="24" class="proposal-title">问题</el-col>
          <el-col :span="24" class="proposal-content" v-text="proposalContent">

          </el-col>
        </el-row>
        <el-row class="proposal-card">
          <el-col :span="24" class="proposal-title">建议</el-col>
          <el-col :span="24" class="proposal-content" v-text="proposalSuggests">

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="proposal-button-wrap" v-if="status == 1">
              <el-button type="primary" size="medium" @click="changeStatus(3)">通过</el-button>
              <el-button class="color-button" type="" plain size="medium"  @click="changeStatus(4)">拒绝</el-button>
          </el-col>
          <el-col :span="24" class="proposal-button-wrap">
            <el-tag type="success" size="medium" v-if="status == 3">已通过</el-tag>
            <el-tag type="warning" size="medium"  v-if="status == 4">已拒绝</el-tag>
          </el-col>
        </el-row>
       </el-col>
     </el-row>

 </div>
</template>

<script>
export default {
  name: 'check-proposal',
  data() {
    return {
      proposalTitle: '',
      proposalContent: '',
      proposalBackground: '',
      proposalSuggests: '',
      status:''
    }
  },
  mounted: function() {
    this.getCheckProposal()
  },
  methods: {
    getCheckProposal() {
      let vm = this
      this.axios(vm.$commonTools.g_restUrl, {
        params: {
          i: '8',
          c: 'entry',
          p: 'proposal',
          do: 'shop',
          m: 'ewei_shop',
          ac: 'one_proposal',
          id: vm.$route.params.id
        }
      })
        .then(function(response) {
          vm.proposalTitle = response.data.result.data.title
          vm.proposalContent = response.data.result.data.suggest
          vm.proposalBackground = response.data.result.data.back
          vm.proposalSuggests = response.data.result.data.content
          vm.status = response.data.result.data.status
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    changeStatus(temp) {
      let vm = this
      vm.axios(vm.$commonTools.g_restUrl, {
          params: {
            i: '8',
            c: 'entry',
            p: 'proposal',
            do: 'shop',
            m: 'ewei_shop',
            ac: 'check_proposal',
            id: vm.$route.params.id,
            status: temp
          }
        })
        .then(function(response) {
          if(response.status == '200'){
            vm.$router.replace({name: 'CenterUnreadList',params: { type: 2 }});
          }
        })
        .catch(function(error) {
          console.info(error)
        })
    }
  }
}
</script>

<style scoped>
.check-proposal-wrap {
  margin: 10%;
  text-align: left;
}
.check-proposal-wrap .proposal-card {
  padding: 1.5vh 0;
  border-bottom: 1px dashed #357baa;
}
.proposal-card .proposal-title {
  font-size: 18px;
  font-weight: bold;
  color: #357baa;
  margin-bottom: 1.5vh;
}
.proposal-card .proposal-content {
  font-size: 14px;
  color: #333333;
}
.proposal-button-wrap {
  margin: 4vh 0;
  text-align: center;
}
.proposal-button-wrap .color-button {
  color: #2192e0;
}
</style>
