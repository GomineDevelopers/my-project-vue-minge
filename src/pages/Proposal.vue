<template>
  <div class="proposal_bg proposal-cover">
    <vue-headful title="我的提案"/>
    <div class="proposal-list">
      <scroller
        :on-infinite="infinite" class="scroller-container" ref="scroller">
        <!-- content goes here -->
        <div style="height: 44px;"></div>
        <div >
          <div class="row status"
               :class="{'status-wait':item.status == 0  , 'status-uncheck':item.status == 1,'status-success':item.status == 3,'status-refuse':item.status == 4 }"
               v-for="(item,index) in listData">
            <div class="note" v-text='"提案"+(index+1)'></div>
            <div class="block">
              <div class="title" v-text="item.title"></div>
              <div class="content" v-text="item.content"></div>
              <div class="btn-row" v-if="item.status == 0">
                <span class="edit" @click="editProposal(item.id)"><i class="el-icon-edit-outline"></i>修改</span>
                <span class="delete" @click="del(item.id)"><i class="el-icon-delete"></i>删除</span>
              </div>
              <div class="c1"></div>
              <div class="c2"></div>
              <div class="c3 status-pass" v-if="item.status == 3">已通过</div>
              <div class="c3" v-else-if="item.status == 4">被拒绝</div>
              <div class="c3" v-else-if="item.status == 1">审核中</div>
              <div class="c3" v-else-if="item.status == 0">待提交</div>
            </div>
          </div>
        </div>
      </scroller>
    </div>
    <el-button type="primary" round class="bottom-btn" @click="goProposalEdit">填写提案</el-button>
  </div>
</template>

<script>
export default {
  name: 'proposal',
  data() {
    return {
      isLast: false,
      listData: [],
      curPage: 1
    }
  },
  methods: {
    infinite: function(done) {
      let vm = this
      if (!vm.isLast) {
        vm.getListData(done)
      } else {
        done(true)
      }
    },
    getListData: function(done) {
      let vm = this
      this.axios(vm.$commonTools.g_restUrl, {
        params: {
          i: '8',
          c: 'entry',
          p: 'proposal',
          do: 'shop',
          m: 'ewei_shop',
          page: vm.curPage
        }
      })
        .then(function(response) {
          if (response.data.result.data) {
            for (var i = 0; i < response.data.result.data.length; i++) {
              vm.listData.push(response.data.result.data[i])
            }
          }

          if (
            response.data.result.data &&
            response.data.result.data.length == 10
          ) {
            vm.isLast = false
            vm.curPage++
          } else {
            vm.isLast = true
          }
          done()
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    del: function(id) {
      let vm = this
      vm
        .$confirm('是否要删除该提案?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.axios(vm.$commonTools.g_restUrl, {
            params: {
              i: '8',
              c: 'entry',
              p: 'proposal',
              do: 'shop',
              m: 'ewei_shop',
              ac: 'del',
              id: id
            }
          })
            .then(function(response) {
              if (response.data.status == '200') {
                vm.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                vm.$nextTick(function() {
                  vm.listData = []
                  vm.curPage = 1
                  vm.isLast = false
                  vm.$refs.scroller.finishInfinite(false)
                })
              } else if (response.data.status == '403') {
                vm.$message({
                  type: 'success',
                  message: '删除失败，请重试!'
                })
              }
            })
            .catch(function(error) {
              console.info(error)
            })
        })
        .catch(() => {
          vm.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    goProposalEdit: function() {
      this.$router.push({ name: 'ProposalEdit' })
    },
    editProposal: function(id) {
      this.$router.push({ name: 'ProposalEdit', params: { proposalId: id } })
    }
  }
}
</script>

<style scoped>
.scroller-container {
  top: 20px;
  padding-bottom: 44px;
}

.proposal-cover {
  height: 100vh;
  position: relative;
}

.proposal-cover .proposal-list {
  padding-top: 3vh;
  height: 85vh;
  position: relative;
  overflow: hidden;
}

.proposal-cover .proposal-list .row {
  width: 88%;
  margin: auto;
}

.proposal-cover .proposal-list .row .note {
  text-align: left;
  color: #687177;
  font-size: 14px;
}

.proposal-cover .proposal-list .row .block {
  text-align: left;
  background: #ffffff;
  margin-top: 5px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-left: 3px solid #56b0f0;
  box-shadow: 0px 0px 20px 5px #e9e9e9;
  position: relative;
}

.proposal-cover .proposal-list .row .block .title {
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #cccccc;
  color: #80919c;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 14px;
  padding: 5px 60px 5px 8px;
}

.proposal-cover .proposal-list .row .block .content {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  line-height: 25px;
  padding: 5px 60px 5px 8px;
}

.proposal-cover .proposal-list .row .block .btn-row {
  text-align: right;
  color: #2192e0;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
}

.btn-row .edit {
  margin-right: 20px;
}

.btn-row .delete {
  margin-right: 10px;
}

.proposal-cover .bottom-btn {
  position: absolute;
  bottom: 4vh;
  left: 50%;
  width: 200px;
  margin-left: -100px;
  padding: 12px 0;
  letter-spacing: 1px;
  box-shadow: 0px 0px 20px 5px #e9e9e9;
}

.status .c1 {
  width: 0;
  height: 0;
  border-left: 60px solid transparent;
  position: absolute;
  top: 0;
  right: 0;
}

.status .c2 {
  width: 0;
  height: 0;
  border-top: 20px solid white;
  border-left: 20px solid transparent;
  position: absolute;
  top: 0;
  right: 0;
}

.status .c3 {
  top: 12px;
  right: -11px;
  color: white;
  position: absolute;
  width: 60px;
  height: 20px;
  transform: rotate(45deg);
  z-index: 111;
  font-size: 12px;
  text-align: center;
  letter-spacing: 0.5px;
}

.status-success .c1 {
  border-top: 60px solid #66c661;
}

.status-uncheck .c1 {
  border-top: 60px solid #4798c5;
}

.status-wait .c1 {
  border-top: 60px solid #d26e7a;
}

.status-refuse .c1 {
  border-top: 60px solid #E6A23C;
}
</style>

<style>
.el-message-box {
  width: auto;
}
</style>
