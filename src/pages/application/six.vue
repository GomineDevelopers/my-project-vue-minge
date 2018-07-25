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
                :action=postImageUrl
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl  && !isLoading" :src="imageUrl" class="avatar">
                <div v-if="isLoading">
                  <i class="el-icon-loading"></i>
                  <el-row class="description">
                    <el-col :span="24">上传中</el-col>
                  </el-row>
                </div>
                <div v-if="!imageUrl && !isLoading">
                  <i class="el-icon-picture"></i>
                  <el-row class="description">
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
          imageUrl: '',
          isloading:false
        }
      },
      methods:{
        handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
          this.isLoading = true;
          const isJPG = file.type === 'image/jpeg';
          const isPNG = file.type === 'image/png';
          const isLt5M = file.size / 1024 / 1024 < 5;

          if (!isJPG && !isPNG) {
            this.$message.error('上传图片只能是 JPG 或PNG 格式!')
          }

          if (!isLt5M) {
            this.$message.error('上传图片大小不能超过 5MB!')
          }

          let result = (isJPG || isPNG) && isLt5M;
          if (!result)
            this.isLoading = false;
          return result
        }
      }
    }
</script>

<style scoped>
  @import '../../../static/css/application.css';
</style>
