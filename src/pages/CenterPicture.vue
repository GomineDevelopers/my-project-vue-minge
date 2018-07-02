<template>
  <div class="center_home_bg  center-picture">
    <div class="cover" v-show="isDeleteMode"></div>
    <div class="center-title">我的图片</div>
    <el-button type="text" class="manage" @click="openDeleteMode" v-show="!isDeleteMode">
      <i class="el-icon-edit-outline"></i>批量管理
    </el-button>
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" class="select-all over-cover" v-show="isDeleteMode"
                 @change="handleCheckAllChange">
      全选
    </el-checkbox>
    <el-button type="text" class="delete over-cover" v-show="isDeleteMode" @click="deletePicture">
      <i class="el-icon-delete"></i>删除
    </el-button>
    <el-button type="text" class="manage over-cover" @click="closeDeleteMode" v-show="isDeleteMode">退出
    </el-button>
    <el-checkbox-group v-model="checkedPictures" @change="handleCheckedPicturesChange">
      <div class="pictureList center-list" ref="pictureList">
        <div class="img-cover" v-for="(item,index) in imgList" :class="{ 'no-mr': (index+1)%3==0 }" :key="item.id"
             :style="coverStyleObject">
          <img v-gallery :src="item.img" :style="styleObject" @click="false"/>
          <div class="title">{{item.title}}</div>
          <el-checkbox v-show="isDeleteMode" class="over-cover" :label="item.id"></el-checkbox>
        </div>
      </div>
    </el-checkbox-group>
    <div class="center-footer over-cover" @click="goPictureAdd">
      <div class="center-add-btn "></div>
      <div class="center-add-btn-row"></div>
      <div class="center-add-btn-col"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'center-picture',
    data() {
      return {
        imgList: [],
        isDeleteMode: false,
        styleObject: '',
        coverStyleObject: '',
        checkAll: false,
        checkedPictures: [],
        allPictures: [],
        isIndeterminate: false
      }
    },
    mounted() {
      this.getImgHeight()
      this.getImgList()
    },
    methods: {
      getImgList: function () {
        let vm = this
        vm
          .axios(vm.$commonTools.g_restUrl, {
            params: {
              i: '8',
              c: 'entry',
              p: 'images',
              do: 'shop',
              m: 'ewei_shop',
              ac: 'list_images'
            }
          })
          .then(function (response) {
            vm.imgList = response.data.result
            vm.allPictures = []
            for (let i = 0; i < vm.imgList.length; i++) {
              vm.allPictures.push(vm.imgList[i].id)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      getImgHeight: function () {
        let height = this.$refs.pictureList.offsetWidth * 31 / 100
        this.styleObject = {
          height: height + 'px'
        }
        this.coverStyleObject = {
          height: height + 20 + 'px'
        }
      },
      openDeleteMode: function () {
        this.isDeleteMode = true
      },
      closeDeleteMode: function () {
        this.isDeleteMode = false
      },
      handleCheckAllChange: function (val) {
        this.checkedPictures = val ? this.allPictures : []
        this.isIndeterminate = false
      },
      handleCheckedPicturesChange: function (val) {
        let checkedCount = val.length
        this.checkAll = checkedCount === this.allPictures.length
        this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.allPictures.length
      },
      deletePicture: function () {
        let vm = this
        if (vm.checkedPictures.length == 0) {
          vm.$alert('请至少选中一张图片', '提示', {
            confirmButtonText: '确定'
          })
        } else {
          vm.$confirm('此操作将永久删除选中图片, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          })
            .then(() => {

              let postData = {}
              postData.ids = vm.checkedPictures

              vm
                .axios(vm.$commonTools.g_restUrl, {
                  method: 'post',
                  params: {
                    i: '8',
                    c: 'entry',
                    p: 'images',
                    do: 'shop',
                    m: 'ewei_shop',
                    ac: 'del_images'
                  },
                  data: vm.$qs.stringify(postData)
                })
                .then(function (response) {
                  if (response.status == '200') {
                    vm.isDeleteMode = false
                    vm.checkedPictures = [];
                    vm.getImgList()
                  }
                })
                .catch(function (error) {
                  console.log(error)
                })

            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
        }
      },
      goPictureAdd() {
        this.$router.push({name: 'CenterPictureAdd'})
      }
    }
  }
</script>

<style scoped>
  .over-cover {
    z-index: 11;
  }

  .cover {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    height: 100%;
    width: 100%;
  }

  .pictureList {
    display: flex;
    flex-flow: row wrap;
    justify-content: baseline;
    align-content: baseline;
  }

  .img-cover {
    width: 31%;
    margin-bottom: 10px;
    margin-right: 3.5%;
    position: relative;
  }

  .no-mr {
    margin-right: 0px !important;
  }

  .img-cover .title {
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .img-cover img {
    width: 100%;
    border-radius: 5px;
    box-shadow: 0px 0px 20px 5px #e9e9e9;
  }

  .manage {
    position: absolute;
    top: 8vh;
    right: 5.5%;
  }

  .delete {
    position: absolute;
    top: 8vh;
    right: 13%;
  }

  .select-all {
    position: absolute;
    top: 8vh;
    left: 5.5%;
    margin-top: 8px;
  }
</style>
