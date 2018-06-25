<template>
  <div class="container">
    <div class="card">
      <el-row type="flex" justify="space-between">

        <el-col :span="16">
          <div class="bookTitle"><span>地图中的历史</span></div>
          <el-row>
            <el-col :span="16">
              <div class="author">第九章：决战不可避免</div>
            </el-col>
            <el-col :span="8">
              <div class="translate"><i class="el-icon-edit-outline"></i>24条评论</div>
            </el-col>
          </el-row>
          <div class="publish">网络连载历史小说，作者是当年明月，本名
            石悦，广东顺德海关公务员。
          </div>
        </el-col>
        <el-col :span="6" class="reader">
          <div class="reader-container">
            <div class="readerTime">分享人 &nbsp; <i class=" iconfont icon-aixin"></i></div>
            <div class="readerName">长一一</div>
            <div class="readerTime">2017-07-21</div>

          </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'notes-center'
  }
</script>

<style scoped>
  .card {
    margin: 2vh 3vh;
    height: 100%;
    background-color: white;
    box-shadow: 0px 0px 20px 5px #e9e9e9;
    border-radius: 5px;
  }

  .bookTitle {
    text-align: left;
    color: #457094;
    font-weight: bold;
    margin: 1vh 0;
  }

  .bookTitle span {
    font-size: 18px;

    border-left: 4px solid #419ddc;
    padding-left: 3vh;
  }

  .author {
    font-size: 0.8rem;
    font-weight: bold;
    margin: 0.2vh 0;
    color: #457094;
    padding: 0.6vh 3vh;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .circle span {
    color: #8a969f;
    font-size: 0.7rem;
  }

  .translate {
    margin: 0.2vh 0;
    padding: 0.6vh 0;
    color: #5452a0;
    font-size: 0.7rem;
  }

  .publish {
    text-align: left;
    color: #8a969f;
    margin: 5px 0;
    font-size: 0.7rem;
    padding: 0.2rem;
    padding-left: 3vh;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .reader {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .reader-container {
    background-color: #419ddc;
    color: #ffffff;
    font-size: 0.6rem;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    position: relative;
  }

  .icon-aixin {
    font-size: 14px;
  }

  .readerName {
    font-size: 1rem;
    font-weight: bold;
    border-top: 1px dashed #ffffff;
    border-bottom: 1px dashed #ffffff;
    padding: 2px 0;
  }

  .readerTime {
    padding: 4px 0;
  }
</style>
