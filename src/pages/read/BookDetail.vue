<template>
  <div class="book_detail_bg">
    <div class="book_detail">
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
          <div class="wrapper">私密读书：
            <span v-if="bookDetailData.private_book == 0">否</span>
            <span v-else-if="bookDetailData.private_book == 1">是</span>
          </div>
        </el-row>
        <el-row>
          <div class="wrapper">总页数：<span v-text="bookDetailData.page_number"></span><span>页</span></div>
        </el-row>
        <el-row class="wrapper">
          已读页数：<span v-text="bookDetailData.page_schedule"></span><span>页</span>
          <el-button size="mini" type="primary" plain @click="updatePages">更新
          </el-button>
        </el-row>
        <el-row>
          <div class="readProgress">
            <span class="spanLeft">读书进度：</span>
            <el-progress :percentage="bookDetailData.percentage" color="#ec8947"></el-progress>
          </div>
        </el-row>
        <el-row v-for="item in bookDetailData.list" v-if="item != ''">
          <div class="wrapper readProgress readProgressText">
            <span class="spanLeft">读书伙伴：</span>
            <el-progress :percentage="item.percentage" color="#ebb71d"></el-progress>
            <span class="friendName textInterception" v-text="item.nickname"></span>
          </div>
        </el-row>
    </div>
    <div class="iconRight read" @click="askRead(bookDetailData.id,bookDetailData.title)"
         v-if="bookDetailData.my_book == 1 && bookDetailData.private_book == 0">
      <i class="iconfont icon-read"/><span class="icon-text">邀伴读书</span>
    </div>
    <div class="iconRight edit" @click="rewrite(bookDetailData.id)" v-if="bookDetailData.my_book == 1  ">
      <i class="el-icon-edit"/><span class="icon-text">编辑</span>
    </div>
    <div class="iconRight delete" @click="del(bookDetailData.id)">
      <i class=" el-icon-delete"/><span class="icon-text">删除</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'book-detail',
  data() {
    return {
      bookDetailData: Object
    }
  },
  created() {
    this.getBookDetailData()
  },
  methods: {
    updatePages() {
      let vm = this
      vm
        .$prompt('输入页数', '更新进度', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[1-9]\d*$/,
          inputErrorMessage: '只能输入非负整数'
        })
        .then(({ value }) => {
          if (parseInt(value) > parseInt(vm.bookDetailData.page_number)) {
            vm.$message({
              type: 'warning',
              message: '已读页数不能大于总页数'
            })
          } else {
            vm.updateNewPages(value)
          }
        })
        .catch(() => {
          vm.$message({
            type: 'info',
            message: '取消输入'
          })
        })
    },
    updateNewPages(value) {
      let vm = this
      vm
        .axios(vm.$commonTools.g_restUrl, {
          params: {
            i: '8',
            c: 'entry',
            p: 'bookmates',
            do: 'shop',
            m: 'ewei_shop',
            ac: 'update_number',
            id: vm.$route.params.id,
            page_schedule: value
          }
        })
        .then(function(response) {
          vm.getBookDetailData()
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    getBookDetailData() {
      let vm = this
      vm
        .axios(vm.$commonTools.g_restUrl, {
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
        .then(function(response) {
          vm.bookDetailData = response.data.result
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    del(id) {
      let vm = this
      vm
        .$confirm('是否确定删除此书?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          vm
            .axios(vm.$commonTools.g_restUrl, {
              params: {
                i: '8',
                c: 'entry',
                p: 'bookmates',
                do: 'shop',
                m: 'ewei_shop',
                ac: 'del_book',
                id: id
              }
            })
            .then(function(response) {
              if (response.data.result.info == '操作成功') {
                vm.$router.replace({ name: 'BookList' })
              }
            })
            .catch(function(error) {
              console.log(error)
            })
        })
        .catch(() => {
          vm.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    rewrite(id) {
      this.$router.push({ name: 'EditBook', params: { id: id } })
    },
    askRead(id, name) {
      this.$router.push({
        name: 'AskRead',
        query: { bookId: id, bookName: name }
      })
    }
  }
}
</script>

<style scoped>
.book_detail {
  text-align: left;
  margin: 12vw 10vw 12vw 16vw;
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

.iconRight {
  position: absolute;
  width: 40px;
  height: 40px;
  background: #ffffff;
  border-radius: 50%;
  right: 30px;
  color: #409eff;
  border: 1px solid #409eff;
}

.iconRight i {
  font-size: 20px;
  top: 50%;
  margin-top: -10px;
  position: absolute;
  left: 50%;
  margin-left: -10px;
}

.iconRight .icon-text {
  position: absolute;
  top: 42px;
  font-size: 10px;
  width: 60px;
  margin-left: -30px;
}

.read {
  top: 100px;
}

.edit {
  top: 170px;
}

.delete {
  top: 240px;
}

.title {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.readProgress .spanLeft {
  float: left;
  height: 5vh;
  line-height: 5vh;
  font-weight: normal;
}

  .spanWidth{
    width: 80px;
  }

  .friendName{
    display: inline-block;
    width: 15vw;
    font-size: .8rem;
  }

  .textInterception {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>

