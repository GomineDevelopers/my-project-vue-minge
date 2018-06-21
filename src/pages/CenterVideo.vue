<template>
  <div class="center_home_bg ">
    <div class="center-title">我的视频</div>
    <div class="videoList center-list">
      <div class="video-cover" v-for="(item,index) in videoList">
        <div class="title">视频{{index+1}}</div>
        <div class="middle">
          <span class="text">来源：{{index==0?"抖音":"优酷"}}</span>
          <span class="url"> <el-button type="info" icon="el-icon-share" size="mini">复制链接</el-button></span>
        </div>
        <div class="bt">
          <span class="time">{{$commonTools.formatDate(item.create_time)}}</span>
          <span class="delete"><i class="el-icon-delete"></i>&nbsp;删除</span>
        </div>
      </div>
    </div>
    <div class="center-footer">
      <div class="center-add-btn"></div>
      <div class="center-add-btn-row"></div>
      <div class="center-add-btn-col"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "center-video",
    data() {
      return {
        videoList: [],
      }
    },
    mounted() {
      this.getFeedbackList();
    },
    methods: {
      getFeedbackList: function () {
        let vm = this;
        vm.axios(vm.$commonTools.g_restUrl, {
          params: {
            i: "8",
            c: "entry",
            p: "works",
            do: "shop",
            m: "ewei_shop",
            ac: "list_feelings",
          }
        })
          .then(function (response) {
            vm.videoList = response.data.result;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
    }
  }
</script>

<style scoped>
  .video-cover {
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
    padding: 0 10px;
    color: #628ba8;
    font-size: 14px;
    text-align: left;
    height: 4vh;
    line-height: 4vh;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .middle .url {
    float: right;
  }

  .middle .text{
    float: left;
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
    margin-right: 10px;
  }
</style>
