<template>
  <div class="news-detail-container" v-show="isLoadFinish">
    <div class="news-detail-top">
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
          <span class="news-detail-bottom-span-icon2" @click="goComment(3)" v-if="is_member&&is_showCommon"><i
            class="el-icon-edit-outline"></i>&nbsp;留言</span>
        </el-row>
      </div>
      <div v-if="common_num>0&&is_showCommon" class="news-detail-margin-bottom">
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
                  <el-col :span="22">
                    <span class="news-detail-bottom-username" v-text="item.realname"></span>
                  </el-col>
                  <el-col :span="2">
                  <span class="news-detail-bottom-span-icon3" v-if="is_member">
                    <i class="el-icon-star-on" v-show="item.status" @click="collect(item.id)"></i>
                    <i class="el-icon-star-off" v-show="!item.status" @click="collect(item.id)"></i>
                  </span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <div class="news-detail-bottom-content"><span v-text="item.content"></span></div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="19">
                    <span class="news-detail-bottom-time" v-text="item.create_time"></span>
                  </el-col>
                  <el-col :span="5">
                    <span class="news-detail-bottom-time" @click="goComment(4,item.id,item.realname)"
                          v-if="is_member"><i
                      class="el-icon-edit-outline"></i>&nbsp;回复</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="news-detail-more" v-if="common_num>2">
          <el-row>
            <el-col :span="24">
              <el-button type="primary" plain round @click="goComment(1)">查看更多</el-button>
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
        isLoadFinish: false,
        isTitleOneRow: true,
        title: '',
        source: '',
        article_time: '',
        content: '',
        click_count: 0,
        common_list: [],
        common_num: 0,
        is_member: false,
        is_showCommon: true
      }
    },
    computed: {
      article_time_c: function () {
        return this.article_time ? "发布日期：" + this.$commonTools.formatDate(this.article_time) : "";
      },
      source_c: function () {
        return this.source ? "来源：" + this.source : "";
      }
    },
    watch: {
      '$route': 'updatePage',
      title: 'updateTitleCss',
    },
    created: function () {
      this.isMember();
      this.getDetailData();
    },
    methods: {
      isMember: function () {
        let vm = this;
        vm.axios(vm.$commonTools.g_restUrl, {
          params: {
            i: "8",
            c: "entry",
            p: "user",
            do: "shop",
            m: "ewei_shop",
            ac: 'is_leather'
          }
        })
          .then(function (response) {
            if (response.data.result.is_leather == 1) {
              vm.is_member = true;
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      updateTitleCss: function () {
        this.$nextTick(function () {
          if (this.isOneRow())
            this.isTitleOneRow = true;
          else
            this.isTitleOneRow = false;
        });
      },
      isOneRow: function () {
        var width1 = this.$refs.titleTxt.offsetWidth;
        var width2 = this.$refs.titleTxtContainer.offsetWidth;
        return width1 <= width2;
      },
      updatePage: function () {
        this.updateTitleCss();
        this.getDetailData();
      },
      getDetailData: function () {
        let vm = this;
        vm.axios(vm.$commonTools.g_restUrl, {
          params: {
            i: "8",
            c: "entry",
            p: "api_detail",
            do: "shop",
            m: "ewei_shop",
            id: vm.$route.params.id,
            showLoading: true,
          }
        })
          .then(function (response) {
            vm.title = response.data.result.data.title
            vm.content = response.data.result.data.content
            vm.article_time = response.data.result.data.createtime;
            vm.source = response.data.result.data.source;
            vm.click_count = response.data.result.data.click;
            vm.common_list = response.data.result.common;
            vm.common_num = response.data.result.total;
            if (response.data.result.data.ccateid == 37 || response.data.result.data.ccateid == 40 ||
              response.data.result.data.ccateid == 56 || response.data.result.data.ccateid == 59) {
              vm.is_showCommon = false;
            }

            vm.common_list.forEach(function (element, index, array) {
              element.create_time = vm.$commonTools.formatHour(element.create_time);
            })
            vm.isLoadFinish = true;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      collect: function (commentId) {
        let vm = this;
        vm.axios(vm.$commonTools.g_restUrl, {
          params: {
            i: "8",
            c: "entry",
            p: "api_detail",
            do: "shop",
            m: "ewei_shop",
            comment_id: commentId,
          }
        })
          .then(function (response) {
            if (response.status == "200") {
              vm.common_list.forEach(function (element, index, array) {
                if (element.id == commentId) {
                  element.status = !element.status;
                }
              })
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      goComment: function (typeId, id, name) {
        let vm = this;
        let tmpId = id || vm.$route.params.id
        if (typeId != 4) {
          vm.$router.push({name: 'NewsComment', params: {id: tmpId, typeId: typeId}});
        }
        else {
          vm.$router.push({
            name: 'NewsComment',
            params: {id: tmpId, typeId: typeId},
            query: {aId: vm.$route.params.id, name: name}
          });
        }
      }
    }
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
    text-align: center;
    white-space: nowrap;
  }

  .news-detail-title-more {
    text-align: justify !important;
    white-space: normal !important;
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

  .news-detail-top-article img {
    max-width: 100% !important;
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

  .news-detail-bottom-span-icon3 {
    color: #0064ba;
    position: absolute;
    right: 0
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
    padding: 5px 0;
    word-wrap: break-word;
    text-align: justify;
  }

  .news-detail-more {
    padding: 10px 0 0 0;
  }

  .news-detail-top-comment-border {
    padding-bottom: 10px;
    border-top: 1px solid #ccc;
  }

  .news-detail-bottom-commentArea-div {
    padding: 10px 0;
  }

  .news-detail-bottom-commentArea-div .el-row {
    min-height: 18px;
  }

  .news-detail-margin-bottom {
    margin-bottom: 20px;
  }
</style>
