<template>
  <div class="center_no_bg">
    <vue-headful title="未读列表"/>
    <div class="header-bg-seprated"></div>
    <div class="Un_container">
      <el-row>
        <el-col :span="24">
          <div class="Un_border-left">
            <span v-if="type == 1">新的入党申请</span>
            <span v-else-if="type == 2">新的提案</span>
            <span v-else-if="type == 3">新的读书邀请</span>
            <span v-else-if="type == 4">新的快速验证申请</span>
          </div>
        </el-col>
      </el-row>
      <el-row v-for="item in unreadList" :key="item.id">
        <el-col :span="24">
          <div class="Un_card"
               :class="[item.status == 3 ? 'status-success' :[item.status == 1 ? 'status-wait':'status-refuse'] ]"
               @click="goDetail(item)">
            <div class="Un_card_list">
              <div class="circle"><span>●&nbsp;&nbsp;&nbsp;</span></div>
              <div v-text="item.title" class="title" v-if="type != 3"></div>
              <div v-text="item.realname" class="title" v-if="type == 4"></div>
              <div v-if="type == 1" class="Un_card_div">的入党申请</div>
              <div v-if="type == 4" class="Un_card_div">的快速验证申请</div>
              <div v-else-if="type == 2" class="Un_card_div">的提案</div>
              <div v-else-if="type == 3" class="Un_card_div3">
                <div><span v-text="item.realname" class="nickname"></span>邀请你一起阅读《<span v-text="item.book_name"></span>》
                </div>
              </div>
            </div>
            <div class="c1"></div>
            <div class="c2"></div>
            <div class="c3" v-if="item.status == 1">未处理</div>
            <div class="c3" v-if="item.status == 3">通过</div>
            <div class="c3" v-if="item.status == 4">拒绝</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="read-dialog">
      <el-dialog title="提示" :visible.sync="dialogVisible" :center="true" width="80%" class="my-dialog" :modal-append-to-body='false'>
        <span>是否同意读书邀请?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="changeStatus(4)">拒绝</el-button>
          <el-button type="primary" @click="changeStatus(3)">通过</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="quick-dialog">
      <el-dialog title="是否通过快速验证" :visible.sync="quickDialogVisible" :center="true" width="80%" class="my-dialog" :modal-append-to-body='false'>
        <div class="dialog-div">申请人: {{quickApply.name}}</div>
        <div class="dialog-div">生日: {{quickApply.date}}</div>
        <div class="dialog-div">介绍人:{{quickApply.introducer}}</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="changeQuickStatus(quickApply.id ,4)">拒绝</el-button>
          <el-button type="primary" @click="changeQuickStatus(quickApply.id ,3)">通过</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
export default {
  name: 'CenterUnreadList',
  data() {
    return {
      unreadList: [],
      type: this.$route.params.type,
      inviteId: '',
      dialogVisible: false,
      quickDialogVisible: false,
      quickApply: {}
    }
  },
  created() {
    this.getUnreadList()
  },
  methods: {
    getUnreadList() {
      let vm = this
      vm
        .axios(vm.$commonTools.g_restUrl, {
          params: {
            i: '8',
            c: 'entry',
            p: 'mq',
            do: 'shop',
            m: 'ewei_shop',
            ac: 'mq_list',
            type: vm.$route.params.type
          }
        })
        .then(function(response) {
          vm.unreadList = response.data.result
        })
        .catch(function(error) {
          console.info(error)
        })
    },
    goDetail(item) {
      let id = item.id
      let status = item.status
      let vm = this
      if (vm.$route.params.type == 1) {
        this.$router.replace({ name: 'CheckApply', params: { id: id } })
      } else if (vm.$route.params.type == 2) {
        this.$router.replace({ name: 'CheckProposal', params: { id: id } })
      } else if (vm.$route.params.type == 3 && status == 1) {
        vm.dialogVisible = true
        vm.inviteId = id
      } else if (vm.$route.params.type == 4 && status == 1) {
        let tmpItem = {}
        tmpItem.name = item.realname
        tmpItem.date = vm.$commonTools.formatDate(item.birth)
        tmpItem.introducer = item.introducer
        tmpItem.id = item.id
        vm.quickApply = tmpItem
        vm.quickDialogVisible = true
      }
    },
    changeStatus(temp) {
      let vm = this
      let postData = {
        id: vm.inviteId,
        status: temp
      }
      vm
        .axios(vm.$commonTools.g_restUrl, {
          method: 'post',
          params: {
            i: '8',
            c: 'entry',
            p: 'user',
            do: 'shop',
            m: 'ewei_shop',
            ac: 'set_invite'
          },
          data: vm.$qs.stringify(postData)
        })
        .then(function(response) {
          if (response.data.status == '200') {
            vm.dialogVisible = false
            vm.unreadList.forEach(function(element, index, array) {
              if (element.id == vm.inviteId) {
                element.status = temp
              }
            })
          } else if (response.data.status == '201') {
            vm.$message({
              type: 'info',
              message: '书已被邀请者删除，该邀请无效。'
            })
            vm.dialogVisible = false
            vm.getUnreadList()
          } else if (response.data.status == '202') {
            vm.$message({
              type: 'info',
              message: '书已被邀请者设为私密，该邀请无效。'
            })
            vm.dialogVisible = false
            vm.getUnreadList()
          }
        })
        .catch(function(error) {
          console.info(error)
        })
    },
    changeQuickStatus(id, status) {
      let vm = this
      let postData = {
        id: id,
        status: status
      }
      vm
        .axios(vm.$commonTools.g_restUrl, {
          method: 'post',
          params: {
            i: '8',
            c: 'entry',
            p: 'user',
            do: 'shop',
            m: 'ewei_shop',
            ac: 'edit_verification'
          },
          data: vm.$qs.stringify(postData)
        })
        .then(function(response) {
          if (response.data.status == '201') {
            vm.$message({
              type: 'info',
              message: '此申请已被处理，请刷新。'
            })
          }
          vm.quickDialogVisible = false
          vm.getUnreadList()
        })
        .catch(function(error) {
          console.info(error)
        })
    }
  }
}
</script>

<style scoped>
.center_home_bg {
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.Un_container {
  margin: 13vh 3vh 0 3vh;
}

.Un_border-left {
  text-align: left;
  border-left: 3px solid #357baa;
}

.Un_border-left span {
  display: inline-block;
  padding-left: 10px;
}

.Un_card {
  text-align: left;
  background: #ffffff;
  -webkit-box-shadow: 0px 0px 20px 5px #e9e9e9;
  box-shadow: 0px 0px 20px 5px #e9e9e9;
  position: relative;
  border-radius: 5px;
  margin: 0.5rem 0 0.2rem 0;
}

.Un_card .c1 {
  width: 0;
  height: 0;
  border-left: 7.5vh solid transparent;
  position: absolute;
  top: 0;
  right: 0;
}

.Un_card .c2 {
  width: 0;
  height: 0;
  border-top: 3vh solid white;
  border-left: 3vh solid transparent;
  position: absolute;
  top: 0;
  right: 0;
}

.Un_card .c3 {
  top: 1vh;
  right: -1.3vh;
  color: white;
  position: absolute;
  width: 8vh;
  height: 3.6vh;
  line-height: 3.6vh;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg) scale(0.9);
  z-index: 111;
  font-size: 2vw;
  text-align: center;
  letter-spacing: 0.5px;
}

.Un_card_list {
  width: 100%;
  margin: 0 6vw 0 4vw;
  display: inline-flex;
}

.Un_card .title {
  display: inline-block;
  max-width: 37%;
  height: 7.5vh;
  line-height: 7.5vh;
  color: #56b0f0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.Un_card_div {
  width: 40%;
  height: 7.5vh;
  line-height: 7.5vh;
}

.Un_card_div3 {
  display: flex;
  align-items: center;
  margin-right: 8vh;
  padding: 10px 0;
}

.Un_card_div3 .nickname {
  color: #56b0f0;
}

.circle {
  display: inline-flex;
}

.circle span {
  width: 4.1%;
  height: 7.5vh;
  line-height: 7.5vh;
  color: #56b0f0;
}

.status-success .c1 {
  border-top: 7.5vh solid #66c661;
}

.status-wait .c1 {
  border-top: 7.5vh solid #d26e7a;
}

.status-refuse .c1 {
  border-top: 7.5vh solid #e6a23c;
}

.dialog-div {
  font-size: 16px;
  margin: 0.8vh 0;
}
</style>
