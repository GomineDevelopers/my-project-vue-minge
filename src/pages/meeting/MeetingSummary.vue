<template>
  <div class="center_home_bg">
    <div class="center-title">添加会议纪要</div>
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
              <el-input v-model.trim="summaryTitle" placeholder="请输入标题"></el-input>
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
              <el-input type="textarea" :rows="16" v-model.trim="summaryContent" placeholder="请输入会议纪要内容"></el-input>
            </el-col>
          </el-row>
        </div>
        <el-row class="item-content">
          <el-col :span="24">
            <el-button class="bottom-btn" type="primary" @click="submitSummary" round>提交</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
      name: "MeetingSummary",
      data(){
        return{
          summaryTitle:'',
          summaryContent:''
        }
      },
      methods:{
        submitSummary(){
          let vm = this;
          let postData = {};
          postData.id = this.$route.query.meetingId;
          postData.title = vm.summaryTitle;
          postData.content = vm.summaryContent;
          this.axios(vm.$commonTools.g_restUrl, {
            method: 'post',
            params: {
              i: '8',
              c: 'entry',
              p: 'mq',
              do: 'shop',
              m: 'ewei_shop',
              ac: 'meeting_summary'
            },
            data: vm.$qs.stringify(postData)
          })
            .then(function(response) {
              if(response.status == '200'){
                vm.$router.replace({name: 'MeetingList'});
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
