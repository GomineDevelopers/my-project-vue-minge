<template>
  <div>
    <vue-headful title="书友会-添加图书"/>
    <div class="addbook-wrap">
      <div class="item-wrapper">
       <el-row class="item-label">
          <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>封面</span>
          </el-col>
        </el-row>
      <el-row class="item-content">
        <el-col :span="24">
            <div class="book-cover">
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
          </div>
        </el-col>
      </el-row>
      </div>
      <div class="item-wrapper">
       <el-row class="item-label">
          <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>书名</span>
          </el-col>
        </el-row>
      <el-row class="item-content">
        <el-col :span="24">
            <el-input v-model="bookName" size="small" clearable></el-input>
          </el-col>
      </el-row>
      </div>
      <div class="item-wrapper">
       <el-row class="item-label">
          <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>出版社</span>
          </el-col>
        </el-row>
      <el-row class="item-content">
        <el-col :span="24">
            <el-input v-model="bookPublisher" size="small" clearable></el-input>
          </el-col>
      </el-row>
      </div>
      <div class="item-wrapper">
       <el-row class="item-label">
          <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>作者</span>
          </el-col>
        </el-row>
      <el-row class="item-content">
        <el-col :span="24">
            <el-input v-model="writer" size="small" clearable></el-input>
          </el-col>
      </el-row>
      </div>
      <div class="item-wrapper">
       <el-row class="item-label">
          <el-col :span="24"><span class="register-spanblock">译者</span>
          </el-col>
        </el-row>
      <el-row class="item-content">
        <el-col :span="24">
            <el-input v-model="interpreter"  size="small" clearable></el-input>
          </el-col>
      </el-row>
      </div>
      <div class="item-wrapper">
       <el-row class="item-label">
          <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>私密读书</span>
          </el-col>
        </el-row>
      <el-row class="item-content">
        <el-col :span="24">
            <radio-picker :radioValues="checkValues" :radioValue="defaultValue"></radio-picker>
          </el-col>
      </el-row>
      </div>
      <div class="item-wrapper">
       <el-row class="item-label">
          <el-col :span="24"><span class="register-spanblock"><span class="register-necessary">*</span>总页数</span>
          </el-col>
        </el-row>
      <el-row class="item-content">
        <el-col :span="20">
            <el-input v-model="totalPage" type="number" size="small" clearable></el-input>
          </el-col>
          <el-col :span="4"><label for="">(页)</label></el-col>
      </el-row>
      <div class="submit-wrapper">
      <el-row class="item-content">
        <el-col :span="24">
            <el-button class="bottom-btn" type="primary" @click="addBook" round>添加</el-button>
          </el-col>
      </el-row>
      </div>
      </div>
      </div>
  </div>
</template>

<script>
import RadioPicker from '@/components/RadioPicker.vue'
export default {
  name: 'add-book',
  data() {
    return {
      imageUrl: '',
      postImageUrl:
        this.$commonTools.g_restUrl +
        '?i=8&c=entry&p=images&do=shop&m=ewei_shop&ac=add_images',
      postImgName: '',
      bookName: '',
      bookPublisher: '',
      writer: '',
      interpreter: '',
      totalPage: '',
      checkValues: [{ text: '是', value: true }, { text: '否', value: false }],
      defaultValue: false
    }
  },
  components: {
    'radio-picker': RadioPicker
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.postImgName = res.result.info.filename
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
    // 添加书籍点击按钮事件
    bookValidate() {
      let vm = this
      let msg = ''
      if (!vm.postImgName) {
        msg = '未上传封面'
      } else if (!vm.bookName) {
        msg = '未填写图书名称'
      } else if (!vm.bookPublisher) {
        msg = '未填写出版社'
      } else if (!vm.writer) {
        msg = '未填写图书作者'
      } else if (!vm.totalPage) {
        msg = '未填写图书总页数'
      }
      if (msg) {
        vm.$message.error(msg)
        return false
      } else {
        return true
      }
    },
    addBook() {
      let vm = this
      let postData = {}
      postData.img = vm.postImgName
      postData.title = vm.bookName
      postData.publisher = vm.bookPublisher
      postData.author = vm.writer
      postData.translators = vm.translators
      postData.private_book = vm.defaultValue
      postData.page_number = vm.totalPage

      if (vm.bookValidate()) {
        vm
          .axios(vm.$commonTools.g_restUrl, {
            method: 'post',
            params: {
              i: '8',
              c: 'entry',
              p: 'bookmates',
              do: 'shop',
              m: 'ewei_shop',
              ac: 'add_book'
            },
            data: vm.$qs.stringify(postData)
          })
          .then(function(response) {
            if (response.status == '200') {
              vm.$router.push({
                name: 'BookList',
              })
            }
            console.log(response)
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
.addbook-wrap {
  text-align: left;
  margin: 1vh auto;
  width: 70%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.item-wrapper {
  margin-top: 0.1vh;
}
.item-label {
  margin-top: 1.2vh;
}
.item-content {
  margin-top: 1vh;
  display: flex;
  align-items: center;
  text-align: center;
}
.item-content .el-icon-picture {
  font-size: 15vh;
  color: #bbcad6;
}
.item-content .description {
  color: #bbcad6;
}
.avatar-uploader {
  display: flex;
  justify-content: center;
  align-items: center;
  width: inherit;
  height: inherit;
}
.avatar-uploader img {
  max-width: 100%;
  max-height: 19vh;
}
.register-necessary {
  color: #cb1414;
  padding-right: 4px;
}
.book-cover {
  height: 20vh;
  border: 1px solid #ccc;
  background: white;
  border-radius: 1vh;
}
.submit-wrapper {
  margin-top: 2vh;
  height: 2vh;
}
.bottom-btn {
  width: 100%;
  margin-bottom: 2vh;
  padding: 12px 0;
  letter-spacing: 1px;
  -webkit-box-shadow: 0px 0px 20px 5px #e9e9e9;
  box-shadow: 0px 0px 20px 5px #e9e9e9;
}
</style>
