<template>
  <div>
    <div class="application_header"></div>
    <div class="application_bg">
      <div class="container">
        <div class="content">
          <el-row><span class="necessary">*</span>申请书</el-row>
          <el-row class="item-content">
            <div class="book-cover">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <div v-else><i  class="el-icon-picture"></i></div>
              </el-upload>
            </div>
          </el-row>
        </div>
        <el-row>
          <el-button type="primary" round class="bottom-btn">提交</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "six",
      data() {
        return {
          imageUrl: ''
        }
      },
      methods:{
        handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        }
      }
    }
</script>

<style scoped>
  .container{
    margin: 4vh 17vw 12vh 17vw;
  }

  .content{
    text-align: left;
    margin-top: 2vh;
  }

  .necessary{
    color: #cb1414;
  }

  .content .inputText{
    padding: .6vh  0 1vh 0;
  }

  .bottom-btn {
    margin-top: 1vh;
    width: 50%;
    padding: 12px 0;
    letter-spacing: 1px;
    box-shadow: 0px 0px 20px 5px #e9e9e9;
  }

  .item-content {
    display: flex;
    align-items: center;
    text-align: center;
    margin-top: 3vh;
  }
  .book-cover {
    width: 100%;
    height: 28vh;
    border: 1px solid #ccc;
    background: white;
    border-radius: 1vh;
    display: flex;
    align-items: center;
  }
  .avatar-uploader {
    display: flex;
    justify-content: center;
    align-items: center;
    width: inherit;
    height: inherit;
  }
  .item-content .el-icon-picture {
    font-size: 34vh;
    color: #bbcad6;
  }
  .avatar-uploader img {
    width: 100%;
    height: 40vh;
  }
</style>
