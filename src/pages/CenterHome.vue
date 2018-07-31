<template>
  <div class="center_home_bg ">
    <vue-headful title="个人中心"/>
    <el-row class="mt-10">
      <el-col :span="20" :offset="2" class="title-cover">
        <span class="title">我的提醒</span>
      </el-col>
    </el-row>
    <el-row class="mt-5">
      <div @click="goUnreadList(1)">
        <el-col :span="20" :offset="2" class="message-cover" v-if="grade==0">
          <span class="dot"></span><span class="message">新的入党申请</span>
          <span class="number" v-show="partyNum>0 && partyNum<10"> {{partyNum}}</span>
          <span class="number more-number" v-show=" partyNum>10"> ...</span>
          <i class="iconfont icon-dang"/>
          <span class="c1"></span>
        </el-col>
      </div>
    </el-row>
    <el-row class="mt-1-5">
      <div @click="goUnreadList(4)">
        <el-col :span="20" :offset="2" class="message-cover" v-if="grade==0">
          <span class="dot"></span><span class="message">新的快速验证申请</span>
          <span class="number" v-show="quickNum>0 && quickNum<10"> {{quickNum}}</span>
          <span class="number more-number" v-show=" quickNum>10"> ...</span>
          <i class="iconfont icon-kuai"/>
          <span class="c1"></span>
        </el-col>
      </div>
    </el-row>
    <el-row class="mt-1-5">
      <div @click="goUnreadList(2)">
        <el-col :span="20" :offset="2" class="message-cover" v-if="grade==0">
          <span class="dot"></span><span class="message">新的提案</span>
          <span class="number" v-show="proposalNum>0 && proposalNum<10"> {{proposalNum}}</span>
          <span class="number more-number" v-show=" proposalNum>10"> ...</span>
          <i class="iconfont icon-tianguanli"/>
          <span class="c1"></span>
        </el-col>
      </div>
    </el-row>
    <el-row class="mt-1-5">
      <div @click="goUnreadList(3)">
        <el-col :span="20" :offset="2" class="message-cover">
          <span class="dot"></span><span class="message">新的读书邀请</span>
          <span class="number" v-show="inviteNum>0 && inviteNum<10"> {{inviteNum}}</span>
          <span class="number more-number" v-show=" inviteNum>10"> ...</span>
          <i class="iconfont icon-dushu"/>
          <span class="c1"></span>
        </el-col>
      </div>
    </el-row>
    <el-row class="mt-1-5">
      <el-col :span="20" :offset="2" class="title-cover">
        <span class="title">我的文档</span>
      </el-col>
    </el-row>
    <el-row class="mt-5">
      <div @click="goWorks">
        <el-col :span="9" :offset="2" class="document-cover d1">
          <i class="iconfont icon-zuopinji note"/>
          <span class="text"><i class="iconfont icon-yuandian dot"/> 作品</span>
        </el-col>
      </div>
      <div @click="goPicture">
        <el-col :span="9" :offset="1" class="document-cover d2">
          <i class="iconfont icon-tupian note"/>
          <span class="text"><i class="iconfont icon-yuandian dot"/> 图片</span>
        </el-col>
      </div>
    </el-row>
    <el-row class="mt-1-5">
      <div @click="goVideo">
        <el-col :span="9" :offset="2" class="document-cover d3">
          <i class="iconfont icon-shipin-tianchong note"/>
          <span class="text"><i class="iconfont icon-yuandian dot"/> 视频</span>
        </el-col>
      </div>
      <div @click="goFeedback">
        <el-col :span="9" :offset="1" class="document-cover d4">
          <i class="iconfont icon-jilu note"/>
          <span class="text"><i class="iconfont icon-yuandian dot"/> 感想</span>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'center-home',
    data() {
      return {
        partyNum: 0,
        quickNum: 0,
        proposalNum: 0,
        inviteNum: 0,
        grade: 1
      }
    },
    mounted() {
      this.getCenterHomeData()
    },
    methods: {
      getCenterHomeData: function () {
        let vm = this
        vm
          .axios(vm.$commonTools.g_restUrl, {
            params: {
              i: '8',
              c: 'entry',
              p: 'user',
              do: 'shop',
              m: 'ewei_shop',
              ac: 'get_remind',
              showLoading: true
            }
          })
          .then(function (response) {
            vm.quickNum = response.data.result.quick
            vm.partyNum = response.data.result.party
            vm.proposalNum = response.data.result.proposal
            vm.inviteNum = response.data.result.invite
            vm.grade = response.data.result.grade
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      goComment: function () {
        this.$router.push({name: 'CenterComment'})
      },
      goHome: function () {
        this.$router.push({name: 'CenterHome'})
      },
      goWorks: function () {
        this.$router.push({name: 'CenterWorks'})
      },
      goFeedback: function () {
        this.$router.push({name: 'CenterThoughts'})
      },
      goPicture: function () {
        this.$router.push({name: 'CenterPicture'})
      },
      goVideo: function () {
        this.$router.push({name: 'CenterVideo'})
      },
      goUnreadList: function (temp) {
        this.$router.push({name: 'CenterUnreadList', params: {type: temp}})
      }
    }
  }
</script>

<style scoped>
  .mt-10 {
    margin-top: 10vh;
  }

  .mt-5 {
    margin-top: 5vh;
  }

  .mt-8 {
    margin-top: 8vh;
  }

  .mt-1-5 {
    margin-top: 1.5vh;
  }

  .document-cover {
    width: 39.5%;
  }

  .title-cover {
    position: absolute;
  }

  .title {
    padding-left: 3px;
  }

  .title::before {
    content: '';
    position: absolute;
    top: 20%;
    left: -3px;
    height: 70%;
    border-radius: 30%;
    width: 4px;
    background: #2293e0;
  }

  .message-cover {
    background: white;
    line-height: 7vh;
    height: 7vh;
    padding: 0 10px;
    border-radius: 5px;
    box-shadow: 0px 0px 20px 5px #e9e9e9;
    position: relative;
    overflow: hidden;
  }

  .message-cover .dot {
    background: #74baeb;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    margin-top: -4px;
  }

  .message-cover .message {
    margin-left: 15px;
  }

  .message-cover .number {
    background: #f0565a;
    color: white;
    line-height: 16px;
    height: 16px;
    text-align: center;
    width: 16px;
    border-radius: 50%;
    display: inline-block;
    font-size: 10px;
    margin-left: 3px;
    margin-top: 8px;
    vertical-align: top;
  }

  .message-cover .more-number {
    line-height: 10px !important;
  }

  .message-cover .iconfont {
    position: absolute;
    color: #c1e2fa;
    right: 5px;
    line-height: 10px;
    top: 7px;
    font-size: 12px;
    z-index: 1;
  }

  .message-cover .c1 {
    width: 0;
    height: 0;
    border-top: 40px solid #56b0f0;
    border-left: 40px solid transparent;
    position: absolute;
    top: 0;
    right: 0;
  }

  .document-cover {
    background: white;
    box-shadow: 0px 0px 20px 5px #e9e9e9;
    border-radius: 5px;
    position: relative;
    height: 14vh;
  }

  .document-cover .note {
    font-size: 36px;
    left: 20px;
    top: 12px;
    position: absolute;
  }

  .document-cover .text {
    right: 20px;
    bottom: 12px;
    position: absolute;
    vertical-align: middle;
  }

  .d1 .iconfont {
    color: #37c276;
  }

  .d2 .iconfont {
    color: #ed7663;
  }

  .d3 .iconfont {
    color: #8395ea;
  }

  .d4 .iconfont {
    color: #e5d020;
  }

  .el-button {
    width: 100%;
    height: 5vh;
  }

  .el-col {
    text-align: left;
  }
</style>
