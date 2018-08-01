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
              <span class="detail" @click="meetingDetail(item.id)"><i class="el-icon-view"></i>详情</span>
            </div>
          </div>
        </div>
      </scroller>
    </div>
    <el-button type="primary" round class="bottom-btn" @click="addMeeting" v-if="isManager">发起会议</el-button>

    <el-dialog title="会议主题" :visible.sync="dialogVisible" width="80%" :modal-append-to-body='false'>
      <div class="dialog_content">{{dialogContent.theme}}</div>
      <span slot="footer" class="dialog-footer" v-if="dialogContent.status == 0">
        <el-button @click="changeStatus(dialogContent.id,2)">拒 绝</el-button>
        <el-button type="primary" @click="changeStatus(dialogContent.id,1)">参 加</el-button>
      </span>
      <span slot="footer" class="dialog-footer" v-if="dialogContent.status == 1">
        <el-button type="primary" @click="changeStatus(dialogContent.id,3)">签到</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
      name: "MeetingList",
      data() {
        return {
          isLast: false,
          listData: [],
          curPage: 1,
          dialogVisible: false,
          isManager:false,
          dialogContent:''
        }
      },
      created(){
        this.getUserGrade();
      },
      methods: {
        getUserGrade: function () {
          let vm = this;
          vm.axios(vm.$commonTools.g_restUrl, {
              params: {
                i: '8',
                c: 'entry',
                p: 'user',
                do: 'shop',
                m: 'ewei_shop',
                ac: 'get_remind'
              }
            })
            .then(function (response) {
              if(response.data.result.grade == 0){
                vm.isManager = true;
              }
            })
            .catch(function (error) {
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
          let vm = this;
          this.axios(vm.$commonTools.g_restUrl, {
            params: {
              i: '8',
              c: 'entry',
              p: 'mq',
              do: 'shop',
              m: 'ewei_shop',
              ac:'meeting_list',
              page: vm.curPage
            }
          })
            .then(function(response) {
              if (response.data.result) {
                for (var i = 0; i < response.data.result.list.length; i++) {
                  vm.listData.push(response.data.result.list[i]);
                }
              }
              if (response.data.result.list && response.data.result.list.length == 10) {
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
        goDetail:function(item){
          let vm =  this;
          if(item.status == 0 || item.status == 1){
            vm.dialogVisible = true;
            vm.dialogContent = item;
          }
        },
        changeStatus:function(id,status){
          let vm = this;
          this.axios(vm.$commonTools.g_restUrl, {
            params: {
              i: '8',
              c: 'entry',
              p: 'mq',
              do: 'shop',
              m: 'ewei_shop',
              ac:'meeting_check',
              id:id,
              status:status
            }
          })
            .then(function(response) {
              if(response.data.status == 200){
                vm.dialogVisible = false;
                vm.$nextTick(function() {
                  vm.listData = [];
                  vm.curPage = 1;
                  vm.isLast = false;
                  vm.$refs.scroller.finishInfinite(false);
                })
              }
            })
            .catch(function(error) {
              console.log(error)
            })

        },
        meetingDetail:function(){
          alert('跳转详情页');
        },
        addMeeting: function() {
          this.$router.push({ name: 'AddMeeting' })
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
    border-top: 60px solid #E6A23C;
  }

  .status-success .c1 {
    border-top: 60px solid #66c661;
  }

  .status-overdue .c1 {
    border-top: 60px solid #d26e7a;
  }

  .dialog_content{
    text-align: left;
    margin: 0.8vh 0;
    word-wrap: break-word;
  }

  .contentDiv{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

</style>
