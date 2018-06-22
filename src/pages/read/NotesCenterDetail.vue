<template>
  <div class="NCD_container">
    <div class="NCD_topContainer">
      <div class="title">《明朝那些事儿》</div>
      <div class="chapter">第九章：决战不可避免</div>
      <div class="content">在这段时间里，朱元璋做出的两个决策使得他成为了最终的战争胜利者，第一个决策是高筑墙、广积粮、缓称王，正是这个决定让他避开了天下</div>
    </div>
    <div class="NCD_bottomContainer">
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
        name: "notes-center-detail"
    }
</script>

<style scoped>
  .NCD_container{
    margin: 3vh;
  }

  .NCD_topContainer{
    background-color: white;
    box-shadow: 0px 0px 20px 5px #e9e9e9;
    border-top: 3px solid #419ddc;
  }

  .title{
    color: #457094;
    font-size: 1.2rem;
    height: 6vh;
    line-height: 6vh;
    padding-top: 3vh;
  }

  .chapter{
    color:#457094;
    height: 6vh;
    line-height: 6vh;
  }

  .content{
    text-align: left;
    padding: 0 3vh 2vh 3vh;
  }

  .NCD_bottomContainer{
    margin-top: 3vh;
  }

  .NCD_bottomContainer_commentArea{
    clear: both;
    border: 1px dashed #cccccc;
    border-radius: 5px;
    padding:10px;
    text-align: left;
  }

  .NCD_bottomContainer_commentAreaDiv1{
    padding: 10px 0;
  }

  .NCD_bottomContainer_commentAreaDiv2{
    padding: 10px 0;
    border-top: 1px solid #cccccc;
  }

  .avatar img {
    width: 26px;
    height: 26px;
    border-radius: 50%;
  }

  .userName{
    font-size: 12px;
  }

  .commentContent{
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

  .NCD_bottomContainer_commentArea_span{
    font-size: 12px;
    color: #cccccc;
  }


</style>
