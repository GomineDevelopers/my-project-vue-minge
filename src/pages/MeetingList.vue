<template>
  <div class="proposal_bg proposal-cover">
    <vue-headful title="我的会议"/>
    <div class="proposal-list" :class="{'proposal-full-list':!isManager}">
      <scroller :on-infinite = "infinite" class="scroller-container" ref="scroller">
        <div style="height: 44px;"></div>
        <div class="row status"
             :class="{'status-uncheck':item.status == 0  , 'status-join':item.status == 1,'status-refuse':item.status == 2,'status-success':item.status == 3,'status-overdue':item.status == 4 }"
             v-for="(item,index) in listData" :key="index">
          <div class="block">
            <div class="title">会议{{index+1}}</div>
            <div class="content" @click="goDetail(item)">
              <div class="contentDiv">会议主题：{{item.theme}}</div>
              <div class="contentDiv">时间：{{$commonTools.formatDate(item.date,1)}}</div>
              <div class="contentDiv">地点：{{item.address}}</div>
              <div class="contentDiv">发起人：{{item.realname}}</div>
              <div class="c1"></div>
              <div class="c2"></div>
              <div class="c3" v-if="item.status == 0">未处理</div>
              <div class="c3" v-else-if="item.status == 1">参加</div>
              <div class="c3" v-else-if="item.status == 2">拒绝</div>
              <div class="c3" v-else-if="item.status == 3">已签到</div>
              <div class="c3" v-else-if="item.status == 4">已过期</div>
            </div>
            <div class="btn-row">
              <span @click="addSummary(item.id)" v-if="item.is_summary == 1 && item.status != 4">添加会议纪要</span>
              <span @click="goSummary(item.id)" v-if="item.is_summary == 1">查看会议纪要</span>
              <span @click="meetingDetail(item.id)" v-if="item.is_sponsor == 1">详情</span>
              &nbsp;&nbsp;
              <a :href="item.address" target="view_window" v-if="(item.status == 1 || item.status == 3) && item.isUrl">参加会议</a>
            </div>
          </div>
        </div>
      </scroller>
    </div>
    <el-button type="primary" round class="bottom-btn" @click="addMeeting" v-if="isManager">发起会议</el-button>

    <el-dialog title="会议主题" :visible.sync="dialogVisible" width="80%" :modal-append-to-body='false'>
      <div class="dialog_content">{{dialogContent.theme}}</div>
      <span slot="footer" class="dialog-footer" v-if="dialogContent.status == 0">
        <el-button @click="refuse(dialogContent.id,2)">拒 绝</el-button>
        <el-button type="primary" @click="changeStatus(dialogContent.id,1)">参 加</el-button>
      </span>
      <span slot="footer" class="dialog-footer" v-if="dialogContent.status == 1">
        <el-button type="primary" @click="changeStatus(dialogContent.id,3)">签 到</el-button>
      </span>
    </el-dialog>

    <el-dialog title="参会人员" :visible.sync="dialogVisibleMembers" width="90%" :modal-append-to-body='false'>
      <el-table  :data="detailMemberList" border style="width: 100%;text-align: left" max-height="350">
        <el-table-column prop="realname" label="姓名"></el-table-column>
        <el-table-column prop="update_time" label="时间" width="90"></el-table-column>
        <el-table-column prop="status" label="状态" width="100"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'MeetingList',
  data() {
    return {
      isLast: false,
      listData: [],
      curPage: 1,
      dialogVisible: false,
      dialogVisibleMembers: false,
      isManager: false,
      dialogContent: '',
      detailMemberList: []
    }
  },
  created() {
    this.getUserGrade()
  },
  methods: {
    getUserGrade: function() {
      let vm = this
      vm
        .axios(vm.$commonTools.g_restUrl, {
          params: {
            i: '8',
            c: 'entry',
            p: 'user',
            do: 'shop',
            m: 'ewei_shop',
            ac: 'get_remind'
          }
        })
        .then(function(response) {
          if (response.data.result.grade == 0) {
            vm.isManager = true
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
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
          p: 'mq',
          do: 'shop',
          m: 'ewei_shop',
          ac: 'meeting_list',
          page: vm.curPage
        }
      })
        .then(function(response) {
          if (response.data.result) {
            for (var i = 0; i < response.data.result.list.length; i++) {
              if (response.data.result.list[i].address.substring(0, 8) == 'https://' ||
                  response.data.result.list[i].address.substring(0, 7) == 'http://') {
                response.data.result.list[i].isUrl = true
              } else {
                response.data.result.list[i].isUrl = false
              }
              vm.listData.push(response.data.result.list[i])
            }
          }
          if (response.data.result.list &&response.data.result.list.length == 10) {
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
    goDetail: function(item) {
      let vm = this
      if (item.status == 0 || item.status == 1) {
        vm.dialogVisible = true
        vm.dialogContent = item
      }
    },
    refuse:function(id,status){
      let vm = this;
      vm.dialogVisible = false;
      vm.$prompt('请输入不参会原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        vm.changeStatus(id,status,value);
      }).catch(() => {
        vm.$message({
          type: 'info',
          message: '已取消输入'
        });
      });
    },
    changeStatus: function(id, status,content) {
      let vm = this;
      if(content == undefined || content == null){
        content = "";
      }
      this.axios(vm.$commonTools.g_restUrl, {
        params: {
          i: '8',
          c: 'entry',
          p: 'mq',
          do: 'shop',
          m: 'ewei_shop',
          ac: 'meeting_check',
          id: id,
          status: status,
          content:content
        }
      })
        .then(function(response) {
          if (response.data.status == 200) {
            vm.dialogVisible = false
            vm.$nextTick(function() {
              vm.listData = []
              vm.curPage = 1
              vm.isLast = false
              vm.$refs.scroller.finishInfinite(false)
            })
          } else if (response.data.status == 0) {
            vm.dialogVisible = false
            vm.$message({
              showClose: true,
              message: '该条消息已过期，请刷新页面重试',
              type: 'error'
            })
          } else if (response.data.status == 2) {
            vm.dialogVisible = false
            vm.$message({
              showClose: true,
              message: '还未到签到时间，请于开会前5分钟至开会后10分钟之内签到',
              type: 'error'
            })
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    meetingDetail: function(id) {
      let vm = this
      this.axios(vm.$commonTools.g_restUrl, {
        params: {
          i: '8',
          c: 'entry',
          p: 'mq',
          do: 'shop',
          m: 'ewei_shop',
          ac: 'meeting_detail',
          id: id
        }
      })
        .then(function(response) {
          vm.dialogVisibleMembers = true
          response.data.result.forEach(function(ele, value, arr) {
            if (ele.status == 0) {
              ele.status = '未处理'
            } else if (ele.status == 1) {
              ele.status = '参加'
            } else if (ele.status == 2) {
              ele.status = '拒绝'+"("+ele.content+")"
            } else if (ele.status == 3) {
              ele.status = '已签到'
            } else if (ele.status == 4) {
              ele.status = '已过期'
            }

            if (ele.update_time == null || ele.update_time == '') {
              ele.update_time = '无'
            } else {
              ele.update_time = vm.$commonTools.formatHour(ele.update_time);
            }
          })
          vm.detailMemberList = response.data.result
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    addMeeting: function() {
      this.$router.push({ name: 'AddMeeting' });
    },
    addSummary:function (id) {
      this.$router.push({ name: 'AddSummary',query: { meetingId: id}});
    },
    goSummary:function (id) {
      this.$router.push({ name: 'SummaryDetail',query: { meetingId: id}})
    }
  }
}
</script>

<style scoped>
.scroller-container {
  top: -25px !important;
  padding-bottom: 44px;
}

.proposal-cover {
  height: 100vh;
  position: relative;
}

.proposal-cover .proposal-list {
  height: 88vh;
  position: relative;
  overflow: hidden;
}

.proposal-cover .proposal-full-list {
  height: 96vh !important;
}

.proposal-cover .proposal-list .row {
  width: 88%;
  margin: auto;
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
  line-height: 25px;
  padding: 5px 60px 5px 8px;
}

.proposal-cover .proposal-list .row .block .btn-row {
  text-align: right;
  color: #2192e0;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
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

.status-uncheck .c1 {
  border-top: 60px solid #cccccc;
}

.status-join .c1 {
  border-top: 60px solid #4798c5;
}

.status-refuse .c1 {
  border-top: 60px solid #e6a23c;
}

.status-success .c1 {
  border-top: 60px solid #66c661;
}

.status-overdue .c1 {
  border-top: 60px solid #d26e7a;
}

.dialog_content {
  text-align: left;
  margin: 0.8vh 0;
  word-wrap: break-word;
}

.contentDiv {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
