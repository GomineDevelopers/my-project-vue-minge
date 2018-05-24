<template>
  <div class="news-detail-container">
    <div class="news-detail-top">
      <el-row class="news-detail-top-row">
        <el-col :span="24">
          <div class="news-detail-title"><span v-text="title"></span></div>
        </el-col>
      </el-row>
      <el-row class="news-detail-top-row">
        <el-col :span="24">
          <div class="news-detail-subtitle">
            <span class="news-detail-subtitle-span" v-text="source_c"></span><span v-text="article_time_c"></span>
          </div>
        </el-col>
      </el-row>
      <el-row class="news-detail-top-row">
        <el-col :span="24">
          <div class="news-detail-top-article" v-html="content"></div>
        </el-col>
      </el-row>
    </div>
    <div class="news-detail-bottom">
      <div class="news-detail-bottom-span">
        <el-row>
          <span class="news-detail-bottom-span-icon1"><i class="el-icon-view"></i>&nbsp;<span
            v-text="click_count"></span></span>
          <span class="news-detail-bottom-span-icon2"><i class="el-icon-edit-outline"></i>&nbsp;留言</span>
        </el-row>
      </div>
      <div class="news-detail-bottom-commentArea">
        <div :class="[index == 0?'':'news-detail-top-comment-border','news-detail-bottom-commentArea-div']"
             v-for="(item,index) in common_list" v-if="index<2">
          <el-row>
            <el-col :span="3">
              <div class="news-detail-bottom-icon">
                <img :src="item.avatar">
              </div>
            </el-col>
            <el-col :span="21" class="news-detail-bottom-comment">
              <el-row>
                <el-col :span="24"><span class="news-detail-bottom-username" v-text="item.nickname"></span></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><span class="news-detail-bottom-time" v-text="item.create_time"></span></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><span class="news-detail-bottom-content" v-text="item.content"></span></el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "MyDetail",
    data() {
      return {
        title: '',
        source: '',
        article_time: '',
        content: '',
        click_count: 0,
        common_list: []
      }
    },
    computed: {
      article_time_c: function () {
        return "发布日期：" + this.$commonTools.formatDate(this.article_time)
      },
      source_c: function () {
        return "来源：" + this.source
      }
    },
    created: function () {
      this.getDetailData();
      this.getCommonData();
    },
    methods: {
      getDetailData: function () {
        let vm = this;
        vm.axios(vm.$commonTools.g_restUrl, {
          params: {
            i: "8",
            c: "entry",
            p: "api_detail",
            do: "shop",
            m: "ewei_shop",
            id: "223"
          }
        })
          .then(function (response) {
            vm.title = response.data.result.data.title
            vm.content = response.data.result.data.content
            vm.article_time = response.data.result.data.createtime;
            vm.source = response.data.result.data.source;
            vm.click_count = response.data.result.data.click
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      getCommonData: function () {
        let vm = this;
        this.axios(vm.$commonTools.g_restUrl,{
          params: {
            i: "8",
            c: "entry",
            p: "common",
            do: "shop",
            m: "ewei_shop",
            id: "223"
          }
        })
          .then(function (response) {
            vm.common_list = response.data.result.data;
            vm.common_list.forEach(function (element, index, array) {
              element.create_time = vm.$commonTools.formatHour(element.create_time);
            })
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  }
</script>

<style scoped>
  .news-detail-top {
    padding-bottom: 10px;
    box-shadow: 0 0 20px #999999;
  }

  .news-detail-top-row {
    padding: 0 20px;
  }

  .news-detail-title {
    color: #333333;
    font-size: 20px;
    padding: 10px 0;
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
    padding: 0 5px;
  }

  .news-detail-bottom {
    padding: 20px 20px 0 20px;
  }

  .news-detail-bottom span img {
    width: 20px;
  }

  .news-detail-bottom-span {
    height: 20px;
    line-height: 20px;
  }

  .news-detail-bottom-span-icon1 {
    float: left;
    padding-bottom: 10px;
    color: #999999;
    font-size: 14px;
  }

  .news-detail-bottom-span-icon2 {
    float: right;
    padding-bottom: 10px;
    color: #0064ba;
    font-size: 14px;
  }

  .news-detail-bottom-icon img {
    width: 26px;
    height: 26px;
    border-radius: 50%;
  }

  .news-detail-bottom-commentArea {
    clear: both;
    border: 1px dashed #cccccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 30px;
  }

  .news-detail-bottom-comment {
    text-align: left;
  }

  .news-detail-bottom-username {
    font-size: 12px;
  }

  .news-detail-bottom-time {
    font-size: 12px;
    color: #cccccc;
  }

  .news-detail-bottom-content {
    font-size: 14px;
    padding: 10px 0;
  }

  .news-detail-top-comment-border {
    padding-bottom: 10px;
    border-top: 1px solid #ccc;
    margin-bottom: 8px;
  }

  .news-detail-bottom-commentArea-div {
    padding: 10px 0;
  }
</style>
