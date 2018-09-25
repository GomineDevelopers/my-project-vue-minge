<template>
  <div>
    <div class="share-detail-top">
      <div class="share-detail-card">
        <el-row>
          <div class="topDiv">
            <span class="people">{{shareReadDetail.sender}}</span>邀请
            <span class="people">{{shareReadDetail.accept}}</span>
            {{shareReadDetail.book}}
          </div>
        </el-row>
        <el-row>
          <div class="bottomDiv">
            <span><i class="iconfont icon-together-read"></i> &nbsp;{{shareReadDetail.date}}</span>
          </div>
        </el-row>
      </div>
    </div>

    <div class="share-detail-bottom">
      <div class="news-detail-bottom-span">
        <el-row>
          <span class="news-detail-bottom-span-icon2" @click="goComment(3)"><i class="el-icon-edit-outline"></i>&nbsp;留言</span>
        </el-row>
      </div>
      <div class="news-detail-margin-bottom" v-if="commentTotal>0">
        <div class="news-detail-bottom-commentArea">
          <div :class="[index == 0?'':'news-detail-top-comment-border','news-detail-bottom-commentArea-div']"
               v-for="(item,index) in shareReadCommentList" v-if="index<2">
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
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <div class="news-detail-bottom-content"><span v-text="item.content"></span></div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="19">
                    <span class="news-detail-bottom-time" v-text="$commonTools.formatHour(item.create_time)"></span>
                  </el-col>
                  <el-col :span="5">
                    <span class="news-detail-bottom-time" @click="goComment(4,item.id,item.realname)"><i
                      class="el-icon-edit-outline"></i>&nbsp;回复</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="news-detail-more" v-if="commentTotal>2">
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
        name: "ShareReadDetail",
        data(){
          return{
            shareReadDetail:'',
            shareReadCommentList:[],
            commentTotal:0
          }
        },
      mounted(){
          this.getData();
      },
      methods:{
          getData(){
            let vm = this;
            vm.axios(vm.$commonTools.g_restUrl, {
              params: {
                i: '8',
                c: 'entry',
                p: 'mq',
                do: 'shop',
                m: 'ewei_shop',
                ac:'mq_detail',
                id:vm.$route.params.id,
                type: 2
              }
            })
              .then(function(response) {
                if(response.data.status == 200){
                  let message = response.data.result.data.message;
                  let messageArray = message.split(";");
                  let messageObject = {
                    "sender": messageArray[0],
                    "act": messageArray[1],
                    "accept": messageArray[2].substring(0, messageArray[2].length - 1),
                    "book": messageArray[3],
                    "date": vm.$commonTools.formatDate(response.data.result.data.create_time),
                    "id":response.data.result.data.id
                  }
                  vm.shareReadDetail = messageObject;
                  vm.shareReadCommentList = response.data.result.common;
                  vm.commentTotal = response.data.result.total;
                }
              })
              .catch(function(error) {
                console.log(error)
              })
          },
          goComment: function(typeId, id, name) {
            let vm = this;
            let tmpId = id || vm.$route.params.id;
            if (typeId != 4) {
              vm.$router.push({
                name: 'ShareReadComment',
                params: { id: tmpId, typeId: typeId }
              })
            } else {
              vm.$router.push({
                name: 'ShareReadComment',
                params: { id: tmpId, typeId: typeId },
                query: { aId: vm.$route.params.id, name: name }
              })
            }
          }
      }
    }
</script>

<style scoped>
  .share-detail-top{
    padding: 10px 0;
    box-shadow: 0 0 20px #999;
  }
  .share-detail-card{
    margin: 0 3vh 2vh;
    background-color: white;
    -webkit-box-shadow: 0px 0px 20px 5px #e9e9e9;
    box-shadow: 0px 0px 20px 5px #e9e9e9;
    border-radius: 5px;
    text-align: left;
    padding: 2vh;
  }

  .topDiv {
    line-height: 26px;
  }

  .topDiv .people {
    color: #dc9705;
    font-weight: bold;
  }
  .bottomDiv {
    text-align: right;
    margin-top: 10px;
  }

  .share-detail-bottom {
    padding: 20px 20px 0 20px;
  }

  .news-detail-bottom span img {
    width: 20px;
  }

  .news-detail-bottom-span {
    height: 20px;
    line-height: 20px;
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
  }

  .news-detail-bottom-comment {
    text-align: left;
  }

  .news-detail-bottom-username {
    font-size: 12px;
  }

  .news-detail-bottom-time {
    font-size: 12px;
    color: #8a98a5;
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

</style>
