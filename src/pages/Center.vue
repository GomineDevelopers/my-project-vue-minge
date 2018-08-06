<template>
  <div class="center_bg-base ">
    <vue-headful title="我的民革"/>
<div class="header header-bg-center">
    <el-row>
      <el-col :span="24">

      <div class="logo">
        <img :src="imgUrl"/>
      </div>
      </el-col>
      <el-col :span="24">
         <div class="name">
        {{name}}
      </div>
      </el-col>
    </el-row>
  </div>
<div class="center_no_bg">
    <div class="row">
      <div class="title" @click="goHome">
        <i class=" iconfont icon-icon-yxj-user"></i>&nbsp;<span class="text">个人中心<span class="red-point"
         v-show="hasMessage"></span></span>
        <span class="arrow"> <i class="el-icon-arrow-right"></i> </span>
      </div>
    </div>
    <div class="row">
      <div class="title" @click="goPoint">
        <i class=" iconfont icon-icon"></i>&nbsp;
        <span class="text">我的积分</span>
        
        <span class="arrow"><span class="number">{{score}}分</span> <i class="el-icon-arrow-right"></i> </span>
      </div>
    </div>
    <div class="row">
      <div class="title" @click="goProposal">
        <i class=" iconfont icon-wenzhang2"></i>&nbsp;<span class="text">我的提案</span>
        <span class="arrow"> <i class="el-icon-arrow-right"></i> </span>
      </div>
      <div class="content">
        <div class="content-area">
          <span class="comma"></span>
          <span class="content-text">
             <div class="mb">共提交了<span class="text-colored">{{totalProposal}}</span>次提案</div>
             <div>通过了<span class="text-colored">{{passProposal}}</span>次提案</div>
            </span>
        </div>
      </div>
    </div>
    <div class="row">
      <div v-if="comment>0" class="title" @click="goComment">
        <i class=" iconfont icon-liuyan"></i>&nbsp;<span class="text">我的留言</span>
        <span class="arrow"> <i class="el-icon-arrow-right"></i> </span>
      </div>
      <div v-else class="title">
        <i class=" iconfont icon-liuyan"></i>&nbsp;<span class="text">我的留言</span>
      </div>
      <div class="content">
        <div class="content-area">
          <span class="comma"></span>
          <span class="content-text">
                <p>共保存了<span class="text-colored">{{comment}}</span>条留言</p>
          </span>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'center',
  data() {
    return {
      name: '',
      imgUrl: '',
      hasMessage: false,
      totalProposal: 0,
      passProposal: 0,
      comment: 0,
      score: 0
    }
  },
  mounted() {
    this.getCenterData()
  },
  methods: {
    getCenterData: function() {
      let vm = this
      vm
        .axios(vm.$commonTools.g_restUrl, {
          params: {
            i: '8',
            c: 'entry',
            p: 'user',
            do: 'shop',
            m: 'ewei_shop',
            ac: 'get_info',
            showLoading: true
          }
        })
        .then(function(response) {
          vm.name = response.data.result.realname
          vm.imgUrl = response.data.result.avatar
          vm.hasMessage = response.data.result.mg
          vm.totalProposal = response.data.result.proposal
          vm.passProposal = response.data.result.c_proposal
          vm.comment = response.data.result.common_num
          vm.score = response.data.result.score
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    goComment: function() {
      this.$router.push({ name: 'CenterComment' })
    },
    goHome: function() {
      this.$router.push({ name: 'CenterHome' })
    },
    goProposal: function() {
      this.$router.push({ name: 'Proposal' })
    },
    goPoint: function() {
      this.$router.push({ name: 'CenterPoint' })
    }
  }
}
</script>

<style scoped>
.center_bg-base {
  background-size: 100% 100%;
  position: absolute;
  width: 100%;
  height: 100vh;
}
.header {
  position: relative;
  width: 100%;
  height: 20vh;
}

.logo {
  top: 2vh;
  width: 80px;
  height: 80px;
  margin: 2vh auto;
  border-radius: 50%;
}
.logo img {
  height: 94%;
  border-radius: 50%;
  padding: 0 3%;
}
@media screen and (max-width: 350px) {
  .logo {
    top: 2vh;
    width: 60px;
    height: 60px;
    margin: 2vh auto;
    border-radius: 50%;
  }
}
.header .name {
  line-height: 3vh;
  position: relative;
  padding-bottom: 2vh;
}

.row {
  padding-top: 1.2vh;
}

.row .title {
  background: white;
  padding: 5px 30px;
  text-align: left;
  height: 5vh;
  line-height: 5vh;
}

.title .text {
  position: relative;
}

.row .content {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  width: 100%;
  height: 18vh;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #b9baba;
}

.content .content-area {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px dashed #ccc;
  border-radius: 5px;
  height: 10vh;
  width: 70%;
  padding: 5px;
  position: relative;
}

.content-text .text-colored {
  color: #2780c0;
  font-weight: bold;
}

.title .arrow {
  float: right !important;
  color: #cacaca;
}

.comma::after {
  content: '”';
  font-size: 50px;
  color: #ccc;
  border-radius: 4px;
  position: absolute;
  z-index: 1000;
  right: 10px;
  bottom: -25px;
}

.comma::before {
  content: '“';
  font-size: 50px;
  color: #ccc;
  border-radius: 4px;
  position: absolute;
  z-index: 1000;
  left: 10px;
  top: 0px;
}

.red-point::before {
  content: ' ';
  border: 4px solid #e6616c;
  border-radius: 4px;
  position: absolute;
  z-index: 1000;
  right: 0%;
  margin-right: -12px;
  margin-top: 8px;
}

.icon-icon-yxj-user {
  color: #ed7663;
}

.icon-icon {
  color: #e9c72a;
}

.icon-wenzhang2 {
  color: #37c276;
}

.icon-liuyan {
  color: #8395ea;
}

.mb {
  margin-bottom: 3px;
}

.number {
  color: #ed7663;
  font-weight: bold;
  font-size: 15px;
}
</style>
