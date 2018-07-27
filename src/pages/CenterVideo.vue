<template>
  <div class="center_no_bg">
    <div class="header-bg-seprated center-title">我的视频</div>
    <div class="content-wrapper">
    <div class="videoList center-list">
      <div class="video-cover" v-for="(item,index) in videoList" :key="item.id">
        <div class="title">视频{{index+1}} <span v-text="item.title"></span></div>
        <div class="middle">
          <span class="text">来源：</span>
          <span class="text-area" v-text="item.source"></span>
          <span class="url">
            <el-button type="info" icon="el-icon-share" size="mini"
                        v-clipboard:copy="item.url"
                       v-clipboard:success="onCopy"
                       v-clipboard:error="onError">复制链接</el-button>
          </span>
        </div>
        <div class="bt">
          <span class="time">{{$commonTools.formatDate(item.create_time)}}</span>
          <span class="delete" @click.stop="delVideo(item.id)"><i class="el-icon-delete"></i>&nbsp;删除</span>
        </div>
      </div>
    </div>
    <div class="center-footer" @click="goVideoDetail">
      <div class="center-add-btn"></div>
      <div class="center-add-btn-row"></div>
      <div class="center-add-btn-col"></div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'center-video',
  data() {
    return {
      videoList: []
    }
  },
  mounted() {
    this.getFeedbackList()
  },
  methods: {
    getFeedbackList: function() {
      let vm = this
      vm
        .axios(vm.$commonTools.g_restUrl, {
          params: {
            i: '8',
            c: 'entry',
            p: 'video',
            do: 'shop',
            m: 'ewei_shop',
            ac: 'list_video'
          }
        })
        .then(function(response) {
          vm.videoList = response.data.result
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    onCopy: function(e) {
      this.$message({
        message: '复制成功！请去浏览器中打开视频',
        type: 'success'
      })
    },
    onError: function(e) {},
    delVideo(id) {
      let vm = this
      let postData = {}
      postData.id = id
      vm
        .$confirm('是否确定删除此视频?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          vm
            .axios(vm.$commonTools.g_restUrl, {
              method: 'post',
              params: {
                i: '8',
                c: 'entry',
                p: 'video',
                do: 'shop',
                m: 'ewei_shop',
                ac: 'del_video'
              },
              data: vm.$qs.stringify(postData)
            })
            .then(function(response) {
              if (response.data.result.info == '操作成功') {
                vm.getFeedbackList()
              }
            })
            .catch(function(error) {
              console.log(error)
            })
        })
        .catch(() => {
          vm.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    goVideoDetail() {
      this.$router.push({ name: 'CenterVideoAdd' })
    }
  }
}
</script>

<style scoped>
.content-wrapper {
  margin-top: 12vh;
}
.video-cover {
  width: 100%;
  min-height: 14vh;
  border-radius: 5px;
  background: #ffffff;
  margin-bottom: 1vh;
}

.video-cover .title {
  height: 6vh;
  line-height: 6vh;
  color: #2f81b9;
  text-align: left;
  padding-left: 10px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.video-cover .middle {
  width: 100%;
  color: #628ba8;
  font-size: 14px;
  text-align: left;
  height: 4vh;
  line-height: 4vh;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.middle .text-area {
  width: 60%;
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}
.middle .url {
  float: right;
  width: 26%;
}

.middle .text {
  float: left;
  margin-left: 10px;
  width: 10%;
}

.video-cover .bt {
  height: 4vh;
  line-height: 4vh;
  color: #a2aab1;
  font-size: 14px;
  text-align: left;
}

.bt .time {
  padding-left: 10px;
  text-align: left;
}

.bt .delete {
  float: right;
  width: 26%;
  text-align: center;
}
</style>
