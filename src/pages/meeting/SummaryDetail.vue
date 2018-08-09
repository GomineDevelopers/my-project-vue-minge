<template>
  <div class="news-detail-container">
      <el-row class="news-detail-top-row">
        <el-col :span="24">
          <div class="news-detail-title" :class="{'news-detail-title-more': !isTitleOneRow }"
               ref="titleTxtContainer">
            <span v-text="title" ref="titleTxt"></span>
          </div>
        </el-col>
      </el-row>
      <el-row class="news-detail-top-row">
        <el-col :span="24">
          <div class="news-detail-subtitle">
            <span class="news-detail-subtitle-span" v-text="name_c"></span><span v-text="createTime_c"></span>
          </div>
        </el-col>
      </el-row>
      <el-row class="news-detail-top-row">
        <el-col :span="24">
          <div class="news-detail-top-article" v-html="content"></div>
        </el-col>
      </el-row>
  </div>
</template>

<script>
    export default {
      name: "SummaryDetail",
      data(){
        return {
          isTitleOneRow: true,
          title:'',
          content:'',
          name:'',
          createTime:''
        }
      },
      watch: {
        title: 'updateTitleCss'
      },
      mounted(){
        this.getSummaryDetail();
      },
      methods:{
        updateTitleCss: function() {
          this.$nextTick(function() {
            if (this.isOneRow()) this.isTitleOneRow = true;
            else this.isTitleOneRow = false;
          })
        },
        isOneRow: function() {
          var width1 = this.$refs.titleTxt.offsetWidth;
          var width2 = this.$refs.titleTxtContainer.offsetWidth;
          return width1 <= width2
        },
        getSummaryDetail(){
          let vm = this;
          vm.axios(vm.$commonTools.g_restUrl, {
              params: {
                i: '8',
                c: 'entry',
                p: 'mq',
                do: 'shop',
                m: 'ewei_shop',
                ac: 'summary_detail',
                id:vm.$route.query.meetingId
              }
            })
            .then(function(response) {
              if(response.status == 200){
                vm.title = response.data.result.list.title;
                vm.content = response.data.result.list.content;
                vm.name = response.data.result.list.realname;
                vm.createTime = response.data.result.list.create_time;
              }
            })
            .catch(function(error) {
              console.log(error)
            })
        }
      },
      computed: {
        createTime_c: function() {
          return this.createTime
            ? '记录日期：' + this.$commonTools.formatDate(this.createTime)
            : ''
        },
        name_c: function() {
          return this.name ? '记录者：' + this.name : ''
        }
      },
    }
</script>

<style scoped>
  .news-detail-top-row {
    padding: 0 20px;
  }

  .news-detail-title {
    color: #333333;
    font-size: 20px;
    padding: 10px 0;
    text-align: center;
    white-space: nowrap;
  }

  .news-detail-subtitle {
    color: #999999;
    font-size: 14px;
  }

  .news-detail-subtitle-span {
    margin-right: 20px;
  }

  .news-detail-top-article {
    text-align: left;
    padding: 10px 5px;
  }

  .news-detail-title-more {
    text-align: justify !important;
    white-space: normal !important;
  }
</style>
