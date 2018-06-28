<template>
  <div class="center_home_bg ">
    <div class="center-title">我的感想</div>
    <div class="feedbackList center-list">
      <div class="video-cover" v-for="(item,index) in feedbackList">
        <div class="title">{{item.title}}</div>
        <div class="middle">
          {{item.content}}
        </div>
        <div class="bt">
          <span class="time">{{$commonTools.formatDate(item.create_time)}}</span>
          <span class="delete"><i class="el-icon-delete"></i>&nbsp;删除</span>
        </div>
      </div>
    </div>
    <div class="center-footer">
      <div class="center-add-btn" @click="goAddThoughts()"></div>
      <div class="center-add-btn-row"></div>
      <div class="center-add-btn-col"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'center-feedback',
  data() {
    return {
      feedbackList: []
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
            p: 'works',
            do: 'shop',
            m: 'ewei_shop',
            ac: 'list_feelings',
            type: '2'
          }
        })
        .then(function(response) {
          vm.feedbackList = response.data.result
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    goAddThoughts() {
      this.$router.push({
        name: 'CenterAddThoughts'
      })
    }
  }
}
</script>

<style scoped>
.video-cover {
  height: 15vh;
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
  height: 5vh;
  line-height: 5vh;
  padding: 0 10px;
  color: #628ba8;
  font-size: 14px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
