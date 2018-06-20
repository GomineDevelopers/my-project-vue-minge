<template>
  <div class="center_home_bg ">
    <div class="center-title">我的图片</div>
    <el-button type="text" class="manage" @click="openDeleteMode" v-show="!isDeleteMode"><i
      class="el-icon-edit-outline"></i>批量管理
    </el-button>
    <el-button type="text" class="manage" @click="closeDeleteMode" v-show="isDeleteMode">退出
    </el-button>
    <div class="pictureList center-list" ref="pictureList">
      <div class="img-cover" v-for="(item,index) in imgList">
        <img v-gallery :src="item.url" :style="styleObject" />
        <div class="title">{{item.title}}</div>
      </div>
    </div>
    <div class="center-footer">
      <div class="center-add-btn"></div>
      <div class="center-add-btn-row"></div>
      <div class="center-add-btn-col"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "center-picture",
    data() {
      return {
        imgList: [],
        isDeleteMode: false,
        styleObject: ""
      }
    },
    mounted() {
      this.getImgHeight();
      this.getImgList();
    },
    methods: {
      getImgList: function () {
        let vm = this;
        vm.axios(vm.$commonTools.g_restUrl, {
          params: {
            i: "8",
            c: "entry",
            p: "images",
            do: "shop",
            m: "ewei_shop",
            ac: "list_images",
          }
        })
          .then(function (response) {
            vm.imgList = response.data.result;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      getImgHeight: function () {
        let height = this.$refs.pictureList.offsetWidth * 31 / 100;
        this.styleObject = {
          height: height + 'px',
        }
      },
      openDeleteMode: function () {
        this.isDeleteMode = true;
      },
      closeDeleteMode: function () {
        this.isDeleteMode = false;
      },
    }
  }
</script>

<style scoped>
  .pictureList {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-content: baseline;
  }

  .img-cover {
    width: 31%;
    margin-bottom: 10px;
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

  .select-all {
    position: absolute;
    top: 8vh;
    left: 5.5%;
  }
</style>
