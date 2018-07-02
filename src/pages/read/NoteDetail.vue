<template>
  <div class="NCD_container" v-if="noteDetailData">
    <div class="NCD_topContainer">
      <div class="edit " v-if="noteDetailData.is_mynote == 1"><span class="editbutton" @click="goNoteEdit"> <i
        class="el-icon-edit"></i>编辑 </span></div>
      <div class="title status-private"><span>《<span class="title" v-text="noteDetailData.title"></span>》</span>
        <div class="c1" v-show="noteDetailData.is_private == 1"></div>
        <div class="c3"><i class="iconfont icon-lock"></i></div>
      </div>
      <div class="chapter" v-text="noteDetailData.chapter"></div>
      <div class="content" v-if="noteDetailData.img != ''"><img :src="noteDetailData.img"/></div>
      <div class="content" v-text="noteDetailData.content"></div>
    </div>
    <div class="NCD_bottomContainer" v-show="noteDetailData.is_private == 0">
      <el-row>
        <span class="NCD_bottomContainer-span-icon1"><i
          class="el-icon-view"></i>&nbsp;<span>{{noteDetailData.click}}</span></span>
        <span class="NCD_bottomContainer-span-icon2" @click="goComment(3)"><i class="el-icon-edit-outline"></i>&nbsp;留言</span>
      </el-row>
      <div v-if="noteDetailData.total>0">
        <div class="NCD_bottomContainer_commentArea">
          <div class="NCD_bottomContainer_commentAreaDiv" :class="{'NCD_bottomContainer_commentAreaDiv_bt' : index==1}"
               v-for="(item,index) in noteDetailData.common">
            <el-row>
              <el-col :span="3" class="avatar"><img :src="item.avatar"></el-col>
              <el-col :span="21">
                <span class="userName">{{item.nickname}}</span>
                <div class="commentContent">{{item.content}}</div>
                <el-row>
                  <el-col :span="20">
                    <span
                      class="NCD_bottomContainer_commentArea_span">{{$commonTools.formatHour(item.create_time)}}</span>
                  </el-col>
                  <el-col :span="4">
                    <span class="NCD_bottomContainer_commentArea_span" @click="goComment(4,item.id,item.nickname)"><i
                      class="el-icon-edit-outline"></i>&nbsp;回复</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="news-detail-more" v-if="noteDetailData.total>2">
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
    name: 'note-detail',
    data() {
      return {
        noteDetailData: ''
      }
    },
    mounted() {
      this.getNoteCenterDetailData();
    },
    watch: {
      "$route": "getNoteCenterDetailData"
    },
    methods: {
      getNoteCenterDetailData() {
        let vm = this
        vm.axios(vm.$commonTools.g_restUrl, {
          params: {
            i: '8',
            c: 'entry',
            p: 'bookmates',
            do: 'shop',
            m: 'ewei_shop',
            ac: 'detail_experience',
            id: vm.$route.params.noteId,
            type: 1,
          }
        })
          .then(function (response) {
            vm.noteDetailData = response.data.result;
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      goNoteEdit() {
        this.$router.push({name: 'AddNote', query: {noteEditId: this.$route.params.noteId}})
      },
      goComment: function (typeId, id, name) {
        let vm = this;
        let tmpId = id || vm.$route.params.noteId
        if (typeId != 4) {
          vm.$router.push({name: 'NoteComment', params: {id: tmpId, typeId: typeId}});
        }
        else {
          vm.$router.push({
            name: 'NoteComment',
            params: {id: tmpId, typeId: typeId},
            query: {aId: vm.$route.params.noteId, name: name}
          });
        }
      }
    }
  }
</script>

<style scoped>
  .NCD_container {
    margin: 3vh;

  }

  .NCD_topContainer {
    position: relative;
    background-color: white;
    box-shadow: 0px 0px 20px 5px #e9e9e9;
    border-top: 3px solid #419ddc;

  }

  .title {
    color: #457094;
    line-height: 1.6rem;
    margin-top: 2vh;
  }

  .edit {
    font-size: 0.7rem;
    height: 1rem;
  }

  .edit .editbutton {
    position: absolute;
    font-size: 0.85rem;
    right: 1vh;
    top: 1vh;
    padding: 3px 6px;
    background-color: #3a87d6;
    border-radius: 3px;
    color: white;
  }

  .chapter {
    color: #457094;
    padding: 0 3vh 2vh 3vh;
    word-wrap: break-word;
    word-break: break-all;
  }

  .content {
    text-align: left;
    font-size: 0.85rem;
    color: #333333;
    padding: 0 3vh 2vh 3vh;
    word-wrap: break-word;
    word-break: break-all;

  }

  .content img {
    width: 100%;
    height: 20vh;
    border: 1px solid #f5f7fa;
    border-radius: 5px;
  }

  .NCD_bottomContainer {
    margin-top: 3vh;
  }

  .NCD_bottomContainer_commentArea {
    clear: both;
    border: 1px dashed #cccccc;
    border-radius: 5px;
    padding: 10px;
    text-align: left;
  }

  .NCD_bottomContainer_commentAreaDiv {
    padding: 10px 0;
  }

  .NCD_bottomContainer_commentAreaDiv_bt {
    border-top: 1px solid #cccccc;
  }

  .news-detail-more {
    padding: 10px 0 0 0;
  }

  .avatar img {
    width: 26px;
    height: 26px;
    border-radius: 50%;
  }

  .userName {
    font-size: 12px;
  }

  .commentContent {
    font-size: 14px;
    padding: 5px 0;
  }

  .NCD_bottomContainer-span-icon1 {
    float: left;
    padding-bottom: 10px;
    color: #999999;
    font-size: 14px;
  }

  .NCD_bottomContainer-span-icon2 {
    float: right;
    padding-bottom: 10px;
    color: #0064ba;
    font-size: 14px;
  }

  .NCD_bottomContainer_commentArea_span {
    font-size: 12px;
    color: #cccccc;
  }

  .title .c1 {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    position: absolute;
    top: -6px;
    left: -3px;
    transform: rotate(-90deg) scale(0.9);
  }

  .title .c3 {
    top: 0px;
    left: 4px;
    color: white;
    position: absolute;
    width: 20px;
    height: 20px;
    line-height: 20px;
    z-index: 111;
    font-size: 2vw;
    text-align: center;
    letter-spacing: 0.5px;
  }

  .status-private .c1 {
    border-top: 50px solid #e6a23c;
  }
</style>
