<template>
  <div class="NCD_container">
    <div class="NCD_topContainer">
       <div class="edit "><span class="editbutton" @click="goNoteEdit"> <i class="el-icon-edit"></i>编辑 </span></div> 
      <div class="title status-private"> <span>《<span class="title" v-text="noteTitle"></span>》</span>
            <div class="c1" v-show="noteprivate==1"></div>
            <div class="c3"><i class="iconfont icon-lock"></i></div>
            </div>
          
      <div class="chapter" v-text="noteChapter" ></div>
      <div class="content" v-if="noteImg!=''"><img :src="noteImg"/></div>
      <div class="content" v-text="noteContent"> </div>
    </div>
    <div class="NCD_bottomContainer" v-show="noteprivate==0">
      <el-row>
          <span class="NCD_bottomContainer-span-icon1"><i class="el-icon-view"></i>&nbsp;<span>1212</span></span>
        <span class="NCD_bottomContainer-span-icon2"><i class="el-icon-edit-outline"></i>&nbsp;留言</span>
      </el-row>
      <div class="NCD_bottomContainer_commentArea">
        <div class="NCD_bottomContainer_commentAreaDiv1">   
          <el-row>
            <el-col :span="3" class="avatar"><img src="../../../static/image/book-default.png"></el-col>
            <el-col :span="21">
              <span class="userName">借东西的人</span>
              <div class="commentContent">座谈中的内容结合自身实际，进一步激发老百姓脱贫的内生动力。</div>
              <el-row>
                <el-col :span="20">
                  <span class="NCD_bottomContainer_commentArea_span">05-22 13:29</span>
                </el-col>
                <el-col :span="4">
                  <span class="NCD_bottomContainer_commentArea_span"><i class="el-icon-edit-outline"></i>&nbsp;回复</span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div class="NCD_bottomContainer_commentAreaDiv2">
          <el-row>
            <el-col :span="3" class="avatar"><img src="../../../static/image/book-default.png"></el-col>
            <el-col :span="21">
              <span class="userName">借东西的人</span>
              <div class="commentContent">座谈中的内容结合自身实际，进一步激发老百姓脱贫的内生动力。</div>
              <el-row>
                <el-col :span="20">
                  <span class="NCD_bottomContainer_commentArea_span">05-22 13:29</span>
                </el-col>
                <el-col :span="4">
                  <span class="NCD_bottomContainer_commentArea_span"><i class="el-icon-edit-outline"></i>&nbsp;回复</span>
                </el-col>
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
  name: 'notes-center-detail',
  data(){
    return{
        noteTitle:'',
        noteImg:'',
        noteChapter:'',
        noteContent:'',
        noteprivate:''

    }
  },
  mounted(){
    this.getNoteCenterDetailData();
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
            id:vm.$route.params.noteId
          }
        })
        .then(function(response) {
             vm.noteTitle=response.data.result.title;
             vm.noteImg=response.data.result.img;
             vm.noteChapter=response.data.result.chapter;
             vm.noteContent=response.data.result.content;
             vm.noteprivate=response.data.result.is_private;
             
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    goNoteEdit(){
      this.$router.push({ name: 'AddNote', query: { noteEditId: this.$route.params.noteId } })
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
.edit{
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
  word-wrap:break-word; 
  word-break:break-all; 
}

.content {
  text-align: left;
  font-size: 0.85rem;
  color: #333333;
  padding: 0 3vh 2vh 3vh;
  word-wrap:break-word; 
  word-break:break-all; 
  
}
.content img{
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

.NCD_bottomContainer_commentAreaDiv1 {
  padding: 10px 0;
}

.NCD_bottomContainer_commentAreaDiv2 {
  padding: 10px 0;
  border-top: 1px solid #cccccc;
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
