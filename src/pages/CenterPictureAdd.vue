<template>
  <div class="center_home_bg ">
    <div class="center-title">添加图片</div>
    <div class="addworks-wrap">
        <div class="item-wrapper">
          <el-row class="item-label">
                <el-col :span="24">
                    <span class="register-spanblock"><span class="register-necessary">1.</span>标题</span>
                </el-col>
                <el-col :span="24" class="input" >
                  <el-input v-model="pictureName" placeholder="请输入图片标题"></el-input>
                </el-col>
            </el-row>
            <el-row class="item-content">
                <div class="book-cover">
                    <el-col :span="24">
                        <el-upload
                            class="avatar-uploader"
                            :action=postImageUrl
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
                    </el-col>
                     </div>
            </el-row>
        </div>

        <div class="item-wrapper">
            <div class="submit-wrapper">
                <el-row class="item-content">
                  <el-col :span="24">
                      <el-button class="bottom-btn" type="primary" @click="addPicture" round>提交</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
      </div>
    </div>

</template>

<script>
export default {
  name: 'center-picture-add',
  data() {
    return {
      pictureName: '',
      imageUrl: '',
      postImageUrl:
        this.$commonTools.g_restUrl +
        '?i=8&c=entry&p=images&do=shop&m=ewei_shop&ac=add_images'
    }
  },

  methods: {
    //图片上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.postImageUrl = res.result.info.filename
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isPNG) {
        this.$message.error('上传图片只能是 JPG 或PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return (isJPG || isPNG) && isLt2M
    },
    // 添加图片
    pictureValidate() {
      let vm = this
      let msg = ''
      if (!vm.pictureName) {
        msg = '图片标题不能为空'
      } else if (!vm.imageUrl) {
        msg = '未上传图片'
      }
      if (msg) {
        vm.$message.error(msg)
        return false
      } else {
        return true
      }
    },
    addPicture() {
      let vm = this
      let postData = {}
      postData.title = vm.pictureName
      postData.img = vm.postImageUrl
      if (vm.pictureValidate()) {
        vm
          .axios(vm.$commonTools.g_restUrl, {
            method: 'post',
            params: {
              i: '8',
              c: 'entry',
              p: 'images',
              do: 'shop',
              m: 'ewei_shop',
              ac: 'create_images'
            },
            data: vm.$qs.stringify(postData)
          })
          .then(function(response) {
            if (response.status == '200') {
              vm.$router.push({
                name: 'CenterPicture'
              })
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      }
    }
  }
}
</script>

<style scoped>
.addworks-wrap {
  text-align: left;
  margin: 3vh auto;
  width: 80%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.item-wrapper {
  margin-top: 0.1vh;
}
.item-wrapper .item-label {
  margin-top: 1.2vh;
  text-align: left;
}
.item-label .input {
  margin-top: 1.2vh;
}
.item-content {
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 3vh;
}
.item-wrapper {
  margin-top: 0.1vh;
}
.book-cover {
  width: 100%;
  height: 40vh;
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
.bottom-btn {
  width: 80%;
  margin-top: 2vh;
  background-color: #2192e0;
  margin-bottom: 2vh;
  padding: 12px 0;
  letter-spacing: 1px;
  -webkit-box-shadow: 0px 0px 20px 5px #e9e9e9;
  box-shadow: 0px 0px 20px 5px #e9e9e9;
}
</style>
