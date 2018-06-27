<template>
  <div class="container">
    <div class="card" v-for="item in bookCenterData" @click="goBookDetail(item.id)">
      <el-row type="flex" justify="space-between">
        <el-col :span="6">
          <div class="bookImg"><img :src="item.img"></div>
        </el-col>
        <el-col :span="10" class="book-container">
          <div class="bookTitle" v-text="item.title"></div>
          <el-row class="book-center">
            <el-col :span="12">
              <div class="authorDiv">
                <div class="author" v-text="item.author"></div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="translate" v-if="item.translators != '' ">
                <img src="../../../static/image/interpriter-icon.png">
                <span v-text="item.translators"></span>
              </div>
            </el-col>
          </el-row>
          <div class="publish" v-text="item.publisher"></div>
        </el-col>
        <el-col :span="6" class="reader">
          <div class="reader-container">
            <div class="readerPerson">读书人</div>
            <div class="readerName" v-text="item.realname"></div>
            <div class="readerTime" v-text="$commonTools.formatDate(item.create_time)">2017-07-21</div>
            <i class=" iconfont icon-icon-hxz"></i>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'books-center',
    data() {
      return {
        bookCenterData: Array
      }
    },
    created() {
      this.getBookCenterData();
    },
    methods: {
      getBookCenterData() {
        let vm = this;
        vm.axios(vm.$commonTools.g_restUrl, {
          params: {
            i: '8',
            c: 'entry',
            p: 'bookmates',
            do: 'shop',
            m: 'ewei_shop',
            ac: 'list_book',
          }
        })
          .then(function (response) {
            vm.bookCenterData = response.data.result;
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      goBookDetail(id){
        this.$router.push({name:'BookDetail',params:{id : id}});
      }
    }
  }
</script>

<style scoped>
  .card {
    margin: 2vh 3vh;
    background-color: white;
    box-shadow: 0px 0px 20px 5px #e9e9e9;
    border-radius: 5px;
  }

  .card .bookImg {
    margin: 1vh;
    box-shadow: 0px 0px 20px 5px #e9e9e9;
    border-radius: 5px;
  }

  .card .bookImg img {
    width: 100%;
    max-height: 15vh;
  }

  .book-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .book-center {
    margin: 0 0 1vh 0;
  }

  .bookTitle {
    text-align: left;
    color: #457094;
    font-weight: bold;
    margin: 0 0 1.5vh 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .authorDiv {
    height: 3vh;
    line-height: 3vh;
    display: flex;
    align-items: center;
  }

  .author {
    background-color: #e2edf5;
    border-radius: 5px;
    color: #457094;
    font-size: 0.8rem;
    padding: 3px 5px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .translate {
    margin-left: 5px;
    text-align: left;
    height: 3vh;
    line-height: 3vh;
    display: flex;
    align-items: center;
  }

  .translate img {
    width: 16px;
    height: 16px;
  }

  .translate span {
    color: #8a969f;
    font-size: 0.7rem;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .publish {
    text-align: left;
    color: #8a969f;
    margin: 5px 0;
    font-size: 0.7rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .reader {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .reader-container {
    background-color: #419ddc;
    color: #ffffff;
    font-size: 0.6rem;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    text-align: center;
    position: relative;
  }

  .readerName {
    font-size: 1rem;
    font-weight: bold;
    border-top: 1px dashed #ffffff;
    border-bottom: 1px dashed #ffffff;
    padding: 0.5vh 0.85vh;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .icon-icon-hxz {
    position: absolute;
    font-size: 20px;
    top: -8px;
    right: -2px;
    transform: rotate(-30deg);
  }

  .readerPerson {
    padding: 0.5vh 0.85vh;
    letter-spacing: 2px;
  }

  .readerTime {
    padding: 0.5vh 0.85vh;
  }
</style>
