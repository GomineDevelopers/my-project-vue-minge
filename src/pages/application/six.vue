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
                <div v-else>
                  <i  class="el-icon-picture"></i>
                  <el-row class="description" >
                    <el-col :span="24">请上传图片</el-col>
                  </el-row>
                </div>
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
  @import '../../../static/css/application.css';
</style>
