<template>
  <div class="center_home_bg ">
    <div class="center-title" v-text="defautTitle">添加视频</div>
    <div class="outline-wrapper">
    <div class="addworks-wrap">
        <div class="item-wrapper">
            <el-row class="item-label">
                <el-col :span="24">
                    <span class="register-spanblock"><span class="register-necessary">1.</span>视频标题</span>
                </el-col>
            </el-row>
            <el-row class="item-content">
                    <el-col :span="24">
                        <el-input v-model.trim="videoTitle" placeholder="请输入视频标题"></el-input>
                    </el-col>
            </el-row>
        </div>
        <div class="item-wrapper">
            <el-row class="item-label">
                <el-col :span="24">
                    <span class="register-spanblock"><span class="register-necessary">2.</span>视频链接</span>
                </el-col>
            </el-row>
            <el-row class="item-content">
              <el-col :span="24"  class="aaa">
                  <el-input v-model.trim="videoUrl" placeholder="请输入视频链接" ></el-input>
              </el-col>
            </el-row>
        </div>
        <div class="item-wrapper">
            <el-row class="item-label">
                <el-col :span="24">
                    <span class="register-spanblock"><span class="register-necessary">2.</span>视频来源</span>
                </el-col>
            </el-row>
            <el-row class="item-content">
              <el-col :span="24"  class="aaa">
                  <el-input v-model.trim="videoSource" placeholder="请输入视频来源" ></el-input>
              </el-col>
            </el-row>
        </div>
        </div>
        
        </div>
        <div class="addworks-wrap">
        <div class="item-wrapper">
        <div class="submit-wrapper">
      <el-row class="item-content">
        <el-col :span="24">
            <el-button class="bottom-btn" type="primary" @click="addVideo" round>提交</el-button>
          </el-col>
      </el-row>
      </div>
  </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'center-add-video',
  data() {
    return {
      videoTitle: '',
      videoUrl: '',
      videoSource: '',
      defautTitle: '添加视频'
    }
  },

  methods: {
    videoValidate() {
      let vm = this
      let msg = ''
      if (!vm.videoTitle) {
        msg = '未填写视频标题'
      } else if (!vm.videoUrl) {
        msg = '未填写视频来源'
      }
      if (msg) {
        vm.$message.error(msg)
        return false
      } else {
        return true
      }
    },

    addVideo() {
      let vm = this
      let postData = {}
      postData.title = vm.videoTitle
      postData.url = vm.videoUrl
      postData.source = vm.videoSource
      if (vm.$route.params.thoughtId) {
        postData.id = vm.$route.params.thoughtId
      }
      if (vm.videoValidate()) {
        vm
          .axios(vm.$commonTools.g_restUrl, {
            method: 'post',
            params: {
              i: '8',
              c: 'entry',
              p: 'video',
              do: 'shop',
              m: 'ewei_shop',
              ac: 'add_video'
            },
            data: vm.$qs.stringify(postData)
          })
          .then(function(response) {
            if (response.status == '200') {
              vm.$router.push({
                name: 'CenterVideo'
              })
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      }
    }
  }
}
</script>
<style scoped>
.outline-wrapper {
  border-radius: 5px;
  background: #ffffff;
  /* border-left: 5px solid #2f81b9; */
  margin-bottom: 1vh;
  width: 85%;
  margin: 3vh auto;
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
</style>
<style>
.outline-wrapper .el-textarea__inner {
  border: 1px solid #cccccc;
  background-color: #f5fafd;
}
.outline-wrapper .el-input__inner {
  background-color: #f5fafd;
}
</style>
