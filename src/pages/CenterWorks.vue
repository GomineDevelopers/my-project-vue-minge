<template>
  <div class="center_home_bg ">
    <div class="center-title">我的作品</div>
    <div class="worksList center-list">
      <div class="works-cover" v-for="(item,index) in worksList">
        <div class="title">{{item.title}}</div>
        <div class="bt">
          <span class="time">{{$commonTools.formatDate(item.create_time)}}</span>
          <span class="delete"><i class="el-icon-delete"></i>&nbsp;删除</span></div>
      </div>
    </div>
    <div class="center-footer">
      <div class="center-add-btn" @click="goAddWorks()"></div>
      <div class="center-add-btn-row"></div>
      <div class="center-add-btn-col"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'center-works',
  data() {
    return {
      worksList: []
    }
  },
  mounted() {
    this.getWorksList()
  },
  methods: {
    getWorksList: function() {
      let vm = this
      vm
        .axios(vm.$commonTools.g_restUrl, {
          params: {
            i: '8',
            c: 'entry',
            p: 'works',
            do: 'shop',
            m: 'ewei_shop',
            ac: 'list_works',
            type: '1'
          }
        })
        .then(function(response) {
          vm.worksList = response.data.result
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    goAddWorks() {
      this.$router.push({
        name: 'CenterAddWorks'
      })
    }
  }
}
</script>

<style scoped>
.works-cover {
  height: 11vh;
  border-radius: 5px;
  background: #ffffff;
  border-left: 5px solid #2f81b9;
  margin-bottom: 1vh;
}

.works-cover .title {
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

.works-cover .bt {
  height: 5vh;
  line-height: 5vh;
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
