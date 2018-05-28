<template>
  <div class="my-comment-list">
    <div v-if="type == 1">
      <scroller
        :on-infinite="infiniteComment" class="scroller-container">
        <!-- content goes here -->
        <div style="height: 44px;"></div>
        <div class="comment-container" v-show="commentList.length>0">
          <div v-for="(item,index) in commentList" :class="[index == 0 ? 'comment-list':'comment-list-border']">
            <el-row>
              <el-col :span="3">
                <div class="comment-avatar">
                  <img
                    :src="item.avatar">
                </div>
              </el-col>
              <el-col :span="21" class="comment-right">
                <el-row>
                  <el-col :span="22">
                    <span class="comment-userName" v-text="item.nickname"></span>
                  </el-col>
                  <el-col :span="2">
                    <span class="comment-icon">
                      <i class="el-icon-star-on" v-show="item.status" @click="collect(item.id)"></i>
                      <i class="el-icon-star-off" v-show="!item.status" @click="collect(item.id)"></i>
                    </span>
                  </el-col>
                  <el-col :span="24">
                    <div class="comment-content">{{item.content}}
                    </div>
                    <div class="comment-reply">
                      <div class="comment-reply-container" v-show="item.total>0">
                        <div v-for="subItem in item.list">
                          <span class="comment-reply-userName">{{subItem.nickname}}：</span><span
                          class="comment-reply-content">{{subItem.content}}</span>
                        </div>
                        <div @click="reply(2,item.id)" v-show="item.total>2"><span class="comment-reply-userName">共有{{item.total}}条回复<i
                          class="el-icon-d-arrow-right"></i></span></div>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="24">
                    <el-row>
                      <el-col :span="20">
                        <span class="comment-time">{{$commonTools.formatDate(item.create_time)}}</span>
                      </el-col>
                      <el-col :span="4">
                    <span class="comment-rep" @click="reply(4)"><i
                      class="el-icon-edit-outline"></i>&nbsp;回复</span>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
      </scroller>
      <div class="reply-box" @click="reply(3)">
        <el-row class="reply-box-row">
          <el-col :span="19">
            <el-input size="small" placeholder="请输入您的留言内容~" v-model="inputReply" clearable></el-input>
          </el-col>
          <el-col :span="5">
            <div class="reply-box-span">
              <span>留言</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div v-if="type == 2" class="comment-detail">
      <scroller
        :on-infinite="infiniteReply" class="scroller-container">
        <!-- content goes here -->
        <div style="height: 44px;"></div>
        <div class="comment-container" v-show="replyList.length>0">
          <div v-for="(item,index) in replyList" :class="[index == 0 ? 'comment-list':'comment-list-border']">
            <el-row>
              <el-col :span="3">
                <div class="comment-avatar">
                  <img
                    :src="item.avatar">
                </div>
              </el-col>
              <el-col :span="21" class="comment-right">
                <el-row>
                  <el-col :span="24"><span class="comment-userName" v-text="item.nickname"></span></el-col>
                  <el-col :span="24">
                    <div class="comment-content">{{item.content}}
                    </div>
                  </el-col>
                  <el-col :span="24">
                    <span class="comment-time">{{$commonTools.formatDate(item.create_time)}}</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
      </scroller>
      <div class="reply-box" @click="reply(3)">
        <el-row class="reply-box-row">
          <el-col :span="19">
            <el-input size="small" placeholder="请输入您的回复内容~" v-model="inputReply" clearable></el-input>
          </el-col>
          <el-col :span="5">
            <div class="reply-box-span">
              <span>回复</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div v-if="type == 3" class="reply-content">
      3333
    </div>
    <div v-if="type == 4" class="reply-content">
      4444
    </div>
  </div>
</template>

<script>
  export default {
    name: "my-comment-list",
    data() {
      return {
        commentList: [],
        replyList: [],
        inputReply: '',
        type: 1,
        curPage: 1,
        isLast: false,
      }
    },
    watch: {
      '$route': 'updateComment',
    },
    created() {
      this.updateComment();
    },
    methods: {
      infiniteComment(done) {
        let vm = this;
        if (!vm.isLast) {
          vm.getCommentData(done);
        }
        else {
          done(true);
        }
      },
      infiniteReply(done) {
        let vm = this;
        if (!vm.isLast) {
          vm.getReplyData(done);
        }
        else {
          done(true);
        }
      },
      updateComment() {
        let vm = this;
        vm.curPage = 1;
        vm.isLast = false;
        vm.commentList = [];
        vm.replyList = [];
        vm.type = vm.$route.params.typeId;
      },
      getCommentData(done) {
        let vm = this;
        vm.axios(vm.$commonTools.g_restUrl, {
          params: {
            i: "8",
            c: "entry",
            p: "common",
            do: "shop",
            m: "ewei_shop",
            id: vm.$route.params.id,
            page: vm.curPage
          }
        })
          .then(function (response) {
            if (response.data.result.data) {
              for (var i = 1; i <= response.data.result.data.length; i++) {
                vm.commentList.push(response.data.result.data[i - 1])
              }
            }

            if (response.data.result.data && response.data.result.data.length == 10) {
              vm.isLast = false;
              vm.curPage++;
            }
            else {
              vm.isLast = true;
            }
            done();
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      getReplyData(done) {
        let vm = this;
        vm.axios(vm.$commonTools.g_restUrl, {
          params: {
            i: "8",
            c: "entry",
            p: "common",
            do: "shop",
            m: "ewei_shop",
            pid: vm.$route.params.id,
            page: vm.curPage
          }
        })
          .then(function (response) {
            if (response.data.result.data) {
              for (var i = 1; i <= response.data.result.data.length; i++) {
                vm.replyList.push(response.data.result.data[i - 1])
              }
            }

            if (response.data.result.data && response.data.result.data.length == 10) {
              vm.isLast = false;
              vm.curPage++;
            }
            else {
              vm.isLast = true;
            }
            done();
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      reply: function (temp, id) {
        let vm = this;
        let tmpId = id || vm.$route.params.id
        vm.$router.push({name: 'NewsComment', params: {id: tmpId, typeId: temp}})
      },
      collect: function (commentId) {
        let vm = this;
        vm.axios(vm.$commonTools.g_restUrl, {
          method: 'post',
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
              vm.commentList.forEach(function (element, index, array) {
                if (element.id == commentId) {
                  element.status = !element.status;
                  tempStatus = element.status;
                }
              })
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  }
</script>

<style scoped>

  .comment-container {
    clear: both;
    border: 1px dashed #cccccc;
    border-radius: 5px;
    padding: 0 10px;
    margin: -19px 25px 60px 25px;
  }

  .comment-detail {
    width: 100%;
  }

  .comment-list-border {
    padding: 10px 0;
    border-top: 1px solid #e5e5e5;
  }

  .comment-list {
    padding: 10px 0;
  }

  .comment-right {
    text-align: justify;
  }

  .comment-avatar img {
    width: 26px;
    height: 26px;
    border-radius: 50%;
  }

  .comment-userName {
    font-size: 12px;
  }

  .comment-icon {
    color: #0064ba;
    position: absolute;
    right: 0
  }

  .comment-content {
    font-size: 14px;
    padding: 5px 0;
  }

  .comment-time, .comment-rep {
    font-size: 12px;
    color: #cccccc;
  }

  .comment-reply-container {
    background: #f0f5f9;
    border: 1px dashed #f0f5f9;
    border-radius: 5px;
    padding: 10px;
  }

  .comment-reply-container div {
    margin-bottom: 5px;
  }

  .comment-reply-userName {
    font-size: 10px;
    color: #0064ba;
  }

  .comment-reply-content {
    font-size: 10px;
  }

  .comment-transition {
    display: flex;
  }

  .reply-box {
    background-color: #f2f6f9;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
  }

  .reply-box-span {
    font-size: 14px;
    height: 30px;
    line-height: 30px;
  }

  .reply-box-row {
    padding: 10px 20px;
  }
</style>

<style>
  .el-button--primary.is-plain:hover{
    color: #409EFF;
    background: #ecf5ff;
    border-color: #b3d8ff;
  }
</style>



