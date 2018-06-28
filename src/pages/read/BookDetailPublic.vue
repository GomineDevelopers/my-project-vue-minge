<template>
  <div class="book_detail_bg">
    <div class="book_detail" v-if="bookDetailData">
      <el-row>
        <el-col :span="24">
          <el-row class="cover">
            封面：
            <img :src="bookDetailData.img">
          </el-row>
          <el-row>
            <div class="wrapper title">书名：<span>《</span><span v-text="bookDetailData.title"></span><span>》</span></div>
          </el-row>
          <el-row>
            <div class="wrapper textInterception">作者：<span v-text="bookDetailData.author"></span></div>
          </el-row>
          <el-row v-if="bookDetailData.translators != ''">
            <div class="wrapper textInterception">译者：<span v-text="bookDetailData.translators">猪老八</span></div>
          </el-row>
          <el-row>
            <div class="wrapper textInterception">出版社：<span v-text="bookDetailData.publisher"></span></div>
          </el-row>
          <el-row>
            <div class="wrapper">总页数：<span v-text="bookDetailData.page_number"></span><span>页</span></div>
          </el-row>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
  export default {
    name: "book-detail",
    data() {
      return {
        bookDetailData: "",
      }
    },
    created() {
      this.getBookDetailData();
    },
    watch:{
      $route() {
        this.getBookDetailData()
      }
    },
    methods: {
      getBookDetailData() {
        let vm = this;
        vm.axios(vm.$commonTools.g_restUrl, {
          params: {
            i: '8',
            c: 'entry',
            p: 'bookmates',
            do: 'shop',
            m: 'ewei_shop',
            ac: 'detail_book',
            showLoading: true,
            id: vm.$route.params.id
          }
        })
          .then(function (response) {
            vm.bookDetailData = response.data.result;
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
</script>

<style scoped>
  .book_detail {
    text-align: left;
    margin: 12vw 16vw;
  }

  .cover {
    display: flex;
    align-items: flex-start;
    padding-bottom: 1vh;
    max-height: 20vh;
  }

  .cover img {
    max-height: 17vh;
    max-width: 70%;
    padding: 5px;
    border: 1px solid #b3b3b3;
    border-radius: 5px;
  }

  .book_detail span {
    font-weight: bold;
  }

  .book_detail .wrapper {
    height: 5vh;
    line-height: 5vh;
  }

  .title {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .textInterception {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>

