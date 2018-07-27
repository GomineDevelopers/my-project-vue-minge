<template>
  <div class="note-wrapper note_bg">
    <div class="addnote-wrap">
      <div class="item-wrapper">
        <el-row class="item-label">
          <el-col :span="24">
            <span class="register-spanblock"><span class="register-necessary">*</span>书名</span>
          </el-col>
        </el-row>
        <el-row class="item-content">
          <el-col :span="24">
            <el-select v-model="selectedBook" placeholder="请选择" size="medium" class="book-select">
              <el-option v-for="item in bookOptions" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div class="item-wrapper">
        <el-row class="item-label">
          <el-col :span="24">
            <span class="register-spanblock"><span class="register-necessary">*</span>章节名</span>
          </el-col>
        </el-row>
        <el-row class="item-content">
          <el-col :span="24">
            <el-input v-model.trim="chapterName" placeholder="请输入章节名称"></el-input>
          </el-col>
        </el-row>
      </div>
      <div class="item-wrapper">
        <el-row class="item-label">
          <el-col :span="24">
            <span class="register-spanblock"><span class="register-necessary">*</span>仅自己可见</span>
          </el-col>
        </el-row>
        <el-row class="item-content">
          <el-col :span="24">
            <radio-picker :radioValues="checkValues" :radioValue="radioValue"
                          @handleRadioValue="setRadioValues"></radio-picker>
          </el-col>
        </el-row>
      </div>
      <div class="item-wrapper">
        <el-row class="item-label">
          <el-col :span="24">
            <span class="register-spanblock"><span class="register-necessary">*</span>笔记</span>
          </el-col>
        </el-row>
        <el-row class="item-content">
          <el-col :span="24" class="aaa">
            <el-input v-model.trim="bookNote" placeholder="笔记应不少于15个字" type="textarea" :rows="5"></el-input>
          </el-col>
        </el-row>
      </div>
      <div class="item-wrapper">
        <el-row class="item-label">
          <el-col :span="24">
            <span class="register-spanblock">精彩图片</span>
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
            </el-col>
          </div>
        </el-row>
      </div>
      <div class="submit-wrapper">
        <el-row class="item-content">
          <el-col :span="24">
            <el-button class="bottom-btn" type="primary" @click="addNote" round><span v-text="changeButtonValue"></span>
            </el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import RadioPicker from '@/components/RadioPicker.vue'

  export default {
    name: 'add-note',
    data() {
      return {
        selectedBook: '',
        chapterName: '',
        bookNote: '',
        imageUrl: '',
        postImageUrl:
        this.$commonTools.g_restUrl +
        '?i=8&c=entry&p=images&do=shop&m=ewei_shop&ac=add_images',
        postImgName: '',
        bookOptions: [],
        checkValues: [{text: '是', value: '1'}, {text: '否', value: '0'}],
        radioValue: 0,
        changeButtonValue: '添加',
        isLoading:false
      }
    },
    components: {
      'radio-picker': RadioPicker
    },
    mounted: function () {
      if (this.$route.query.noteEditId) {
        this.getExistNoteData();
        this.changeButtonValue = '修改';
      }
      else {
        this.getPersonalBookData();
        this.setRadioValues(0)
      }
    },
    methods: {
      getExistNoteData() {
        let vm = this
        vm.axios(vm.$commonTools.g_restUrl, {
          params: {
            i: '8',
            c: 'entry',
            p: 'bookmates',
            do: 'shop',
            m: 'ewei_shop',
            ac: 'detail_experience',
            id: vm.$route.query.noteEditId
          }
        })
          .then(function (response) {
            if (response.data.status == '200') {
              vm.selectedBookname = response.data.result.title;
              vm.imageUrl = response.data.result.img;
              let q = response.data.result.img.indexOf('images');
              vm.postImgName = response.data.result.img.substring(q);
              vm.chapterName = response.data.result.chapter;
              vm.bookNote = response.data.result.content;
              vm.radioValue = response.data.result.is_private;
              vm.$children[5].$children[0].$children[0].defaultValue = vm.radioValue;
              vm.getPersonalBookData();
            }
            else if (response.data.status == '201') {
              vm.$message({
                type: 'error',
                message: '您没有权限访问'
              });
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      setRadioValues: function (radioValue) {
        this.radioValue = radioValue
      },
      handleAvatarSuccess(res, file) {
        this.isLoading = false;
        this.imageUrl = URL.createObjectURL(file.raw)
        this.postImgName = res.result.info.filename
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
      },
      getPersonalBookData() {
        let vm = this
        vm.axios(vm.$commonTools.g_restUrl, {
          params: {
            i: '8',
            c: 'entry',
            p: 'bookmates',
            do: 'shop',
            m: 'ewei_shop',
            ac: 'private_book'
          }
        })
          .then(function (response) {
            let tmpOptions = []
            for (let i = 0; i < response.data.result.length; i++) {
              let tmpItem = {}
              tmpItem.value = response.data.result[i].id
              tmpItem.label = response.data.result[i].title
              tmpOptions[i] = tmpItem
            }
            vm.bookOptions = tmpOptions

            if (vm.$route.query.bookId) { //图书列表进入
              vm.bookOptions.forEach(function (val, index, arr) {
                if (val.value == vm.$route.query.bookId) {
                  vm.selectedBook = val.value;
                }
                return false;
              })
            } else if (vm.$route.query.noteEditId) { //笔记详情进入
              vm.bookOptions.forEach(function (val, index, arr) {
                if (val.label == vm.selectedBookname) {
                  vm.selectedBook = val.value;
                }
                return false;
              })
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      bookValidate() {
        let vm = this
        let msg = ''
        if (!vm.selectedBook) {
          msg = '未选择书名'
        } else if (!vm.chapterName) {
          msg = '未填写章节名'
        } else if (!vm.bookNote) {
          msg = '未填写笔记'
        } else if (vm.bookNote.length < 15) {
          msg = '笔记字数应大于15字'
        }
        if (msg) {
          vm.$message.error(msg)
          return false
        } else {
          return true
        }
      },
      addNote() {
        let vm = this
        let postData = {}
        postData.img = vm.postImgName
        postData.book_id = vm.selectedBook;
        postData.chapter = vm.chapterName
        postData.is_private = vm.radioValue
        postData.content = vm.bookNote
        if (vm.$route.query.noteEditId) {
          postData.id = vm.$route.query.noteEditId;
        }
        if (vm.bookValidate()) {
          vm.axios(vm.$commonTools.g_restUrl, {
            method: 'post',
            params: {
              i: '8',
              c: 'entry',
              p: 'bookmates',
              do: 'shop',
              m: 'ewei_shop',
              ac: 'add_experience'
            },
            data: vm.$qs.stringify(postData)
          })
            .then(function (response) {
              if (response.status == '200') {
                vm.$router.replace({
                  name: 'NoteList'
                })
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      }
    }
  }
</script>

<style scoped>
  .addnote-wrap {
    text-align: left;
    margin: 1vh auto;
    width: 70%;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .register-necessary {
    color: #cb1414;
    padding-right: 4px;
  }

  .item-wrapper {
    margin-top: 0.1vh;
  }

  .item-wrapper .item-label {
    margin-top: 1.2vh;
  }

  .item-content {
    display: flex;
    align-items: center;
    text-align: center;
  }

  .book-select {
    width: 100%;
  }

  .book-cover {
    width: 100%;
    height: 20vh;
    border: 1px solid #ccc;
    background: white;
    border-radius: 1vh;
    color:black;
  }

  .avatar-uploader {
    display: flex;
    justify-content: center;
    align-items: center;
    width: inherit;
    height: 20vh;
  }

  .item-content .el-icon-picture {
    font-size: 15vh;
    color: #bbcad6;
  }

  .avatar-uploader img {
    width: 100%;
    height: 20vh;
  }

  .bottom-btn {
    width: 100%;
    margin-top: 2vh;
    margin-bottom: 2vh;
    padding: 12px 0;
    letter-spacing: 1px;
    -webkit-box-shadow: 0px 0px 20px 5px #e9e9e9;
    box-shadow: 0px 0px 20px 5px #e9e9e9;
  }
</style>

