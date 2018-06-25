<template>
  <div class="quick_validate_bg">
    <vue-headful title="新的入党申请"/>
    <div class="newApplication_container" v-if="temp == 1">
      <el-row>
        <el-col :span="24">
          <div class="newApplication_detail">
            <span class="spanColor">姓名：</span><span v-text="application.realname"></span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="newApplication_detail">
            <span class="spanColor">性别：</span><span v-text="application.sex"></span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="newApplication_detail">
            <span class="spanColor">出生年月：</span><span v-text="$commonTools.formatDate(application.birth)"></span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="newApplication_detail">
            <span class="spanColor">民族：</span><span v-text="application.ethnicgroup"></span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="newApplication_detail">
            <span class="spanColor">籍贯：</span><span v-text="application.origin"></span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="newApplication_detail">
            <span class="spanColor">学历：</span><span v-text="application.education"></span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="newApplication_detail_exp">
            <span>工作经历：</span>
            <ul>
              <li v-for="item in application.experience"><span v-text="item"></span></li>
            </ul>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="newApplication_detail_content">
            <span>申请书：</span>
            <div class="newApplication_content" v-text="application.application"></div>
            <div class="readMore" @click="changeDiv(2)">查看更多>></div>
          </div>
        </el-col>
      </el-row>
      <el-row class="newApplication_button">
        <el-col :span="24" v-if="application.status == 1">
          <el-button type="primary" size="medium" @click="changeStatus(3)">通过</el-button>
          <el-button type="primary" size="medium" plain @click="changeStatus(4)">拒绝</el-button>
        </el-col>
        <el-col :span="24">
          <el-tag type="success" size="medium" v-if="application.status == 3">已通过</el-tag>
          <el-tag type="warning" size="medium" v-if="application.status == 4">已拒绝</el-tag>
        </el-col>
      </el-row>
    </div>

    <div class="quick_validate_bg" v-if="temp == 2">
      <el-row class="application_header">
        <el-col :span="24">
          <span class="application_line"></span>
          <span class="application_title">申请书</span>
          <span class="application_line"></span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="application_content" v-html="application.application"></div>
        </el-col>
      </el-row>
      <el-row class="application_button">
        <el-col :span="24">
          <el-button type="primary" size="medium" @click="changeDiv(1)">返回</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "check-apply",
    data() {
      return {
        temp: 1,
        dialogVisible: false,
        application: Object
      }
    },
    created: function () {
      this.getPartyApplication();
    },
    methods: {
      getPartyApplication() {
        let vm = this;
        vm.axios(vm.$commonTools.g_restUrl, {
          params: {
            i: "8",
            c: "entry",
            p: "user",
            do: "shop",
            m: "ewei_shop",
            ac: "list_party",
            id: vm.$route.params.id,
            showLoading: true
          }
        })
          .then(function (response) {
            if (response.status == 200)
              vm.application = response.data.result.data;
          })
          .catch(function (error) {
            console.info(error);
          })
      },
      changeStatus(temp) {
        let vm = this;
        vm.axios(vm.$commonTools.g_restUrl, {
          params: {
            i: "8",
            c: "entry",
            p: "user",
            do: "shop",
            m: "ewei_shop",
            ac: "check_party",
            id: vm.$route.params.id,
            status: temp
          }
        })
          .then(function (response) {
            if (response.status == '200') {
              vm.$router.replace({name: 'CenterUnreadList', params: {type: 1}});
            }
          })
          .catch(function (error) {
            console.info(error);
          })
      },
      changeDiv(tmp) {
        let vm = this;
        vm.temp = tmp;
      }
    }
  }
</script>

<style scoped>
  .newApplication_container {
    margin: 5vh 10%;
  }

  .newApplication_detail {
    margin: 0 20px;
    border-bottom: 1px dashed #a2bbcf;
    text-align: left;
    height: 5vh;
    line-height: 5vh;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .spanColor {
    color: #357baa;
  }

  .newApplication_detail_exp {
    margin: 0 20px;
    padding: 10px 0 0 0;
    border-bottom: 1px dashed #a2bbcf;
    text-align: left;
    height: 18vh;
    overflow-x: hidden;
    overflow-y: auto;
    word-wrap: break-word;
  }

  .newApplication_detail_exp span {
    color: #357baa;
  }

  .newApplication_detail_exp ul {
    padding: 0;
    margin: 0 0 0 20px;
  }

  .newApplication_detail_exp ul > li {
    margin: 0;
    padding: 5px 0 0 0;
    color: #357baa;
  }

  .newApplication_detail_exp ul > li > span {
    color: #000000;
  }

  .newApplication_detail_content {
    margin: 0 20px;
    padding: 10px 0 10px 0;
    text-align: left;
    height: 14vh;
  }

  .newApplication_detail_content span {
    color: #357baa;
  }

  .newApplication_content {
    padding: 5px 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .readMore {
    text-align: right;
    color: #357baa;
    font-size: .8rem;
    padding: 1vh 0;
  }

  .newApplication_button {
    position: fixed;
    bottom: 19vh;
    margin: 0 auto;
    left: 0;
    right: 0;
  }

  /*申请书详情*/
  .application_header {
    padding: 3vh 0;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }

  .application_line {
    display: inline-block;
    width: 50px;
    vertical-align: 5px;
    border-top: 1px solid #357baa;
  }

  .application_title {
    color: #357baa;
    padding: 10px 0;
    height: inherit;
    line-height: inherit;
  }

  .application_content {
    margin: 0px 10%;
    padding: 0 1.5rem;
    text-align: left;
    height: 66vh;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .application_button {
    position: fixed;
    bottom: 14vh;
    margin: 0 auto;
    left: 0;
    right: 0;
  }
</style>
