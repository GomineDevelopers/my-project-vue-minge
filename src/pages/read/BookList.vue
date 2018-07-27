<template>
  <div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="在读" name="first" class="tabFirst">

        <div class="no_book" v-if="isLoadFinish && !showReading">
          <div class="no_bookImg">
            <img src="../../../static/image/no_book.png">
          </div>
          <div class="no_bookDiv">
            <div class="no_bookText">
              <span class="comma"></span>
              <span class="contentText">您还没有在读图书，请点击下方按钮添加</span>
            </div>
          </div>
        </div>
        <div class="readingBook" v-if="isLoadFinish && showReading">
          <div class="card" v-for="(item,index) in privateBookData" :key="index"
               v-if="item.status == 0" @click="goBookDetail(item.id)">
            <el-row class="contentDiv">
              <el-col :span="6">
                <div class="readingBookImg">
                  <img :src="item.img">
                  <div class="imgBottom"><span class="number" v-text="item.total"></span>篇笔记</div>
                  <div class="labelDiv" v-if="item.private_book == 1"><i class="iconfont icon-lock labelIcon"></i></div>
                </div>
              </el-col>
              <el-col :span="18" class="middleDiv">
                <el-row>
                  <el-col :span="18">
                    <div class="middleDiv2">
                      <div class="bookTitle" v-text="item.title"></div>
                      <div class="authorDiv">
                        <div class="author" v-text="item.author"></div>
                        <div class="translate" v-if="item.translators != '' ">
                          <img src="../../../static/image/interpriter-icon.png">
                          &nbsp;<span v-text="item.translators"></span>
                        </div>
                      </div>
                      <div class="publish" v-text="item.publisher"></div>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="time" v-text="$commonTools.formatDate(item.create_time)"></div>
                    <div class="note" @click.stop="writeNote(item.id)"><i class="iconfont icon-write"></i>写笔记</div>
                  </el-col>
                </el-row>
                <el-row>
                  <div class="progress" v-for="m in item.list" v-if="item.list.length > 1">
                    <el-progress :percentage="m.percentage" color="#ebb71d" v-if="m.deleted!=1"></el-progress>
                    <span v-if="m.is_currentuser">我的进度</span>
                    <span v-if="!m.is_currentuser && m.deleted!=1"><span v-text="m.realname" class="nickname"></span>的进度</span>
                    <span v-if="!m.is_currentuser && m.deleted==1"><span v-text="m.realname" class="nickname"></span>(已删除本书)</span><span v-else></span>
                  </div>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="已读" name="second" class="tabLast">
        <div class="no_book" v-if="isLoadFinish && !showRead">
          <div class="no_bookImg">
            <img src="../../../static/image/no_book.png">
          </div>
          <div class="no_bookDiv">
            <div class="no_bookText">
              <span class="comma"></span>
              <span class="contentText">您还没有已读图书，请加油</span>
            </div>
          </div>
        </div>
        <div class="readBook" v-if="isLoadFinish && showRead">
          <div class="card" v-for="(item,index) in privateBookData" :key="index"
               v-if="item.status == 1" @click="goBookDetail(item.id)">
            <el-row class="contentDiv">
              <el-col :span="6">
                <div class="readingBookImg">
                  <img :src="item.img">
                  <div class="imgBottom"><span class="number" v-text="item.total"></span>篇笔记</div>
                  <div class="labelDiv" v-if="item.private_book == 1"><i class="iconfont icon-lock labelIcon"></i></div>
                </div>
              </el-col>
              <el-col :span="18" class="middleDiv">
                <el-row>
                  <el-col :span="18">
                    <div class="middleDiv2">
                      <div class="bookTitle" v-text="item.title"></div>
                      <div class="authorDiv">
                        <div class="author" v-text="item.author"></div>
                        <div class="translate" v-if="item.translators != '' ">
                          <img src="../../../static/image/interpriter-icon.png">
                          &nbsp;<span v-text="item.translators"></span>
                        </div>
                      </div>
                      <div class="publish" v-text="item.publisher"></div>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="time" v-text="$commonTools.formatDate(item.create_time)"></div>
                    <div class="note" @click.stop="writeNote(item.id)"><i class="iconfont icon-write"></i>写笔记</div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'book-list',
  data() {
    return {
      activeName: 'first',
      showReading: false,
      showRead: false,
      privateBookData: '',
      isLoadFinish: false
    }
  },
  mounted() {
    this.getBookList()
  },
  methods: {
    getBookList() {
      let vm = this
      vm.isLoadFinish = false
      vm
        .axios(vm.$commonTools.g_restUrl, {
          params: {
            i: '8',
            c: 'entry',
            p: 'bookmates',
            do: 'shop',
            m: 'ewei_shop',
            ac: 'private_book',
            showLoading: true
          }
        })
        .then(function(response) {
          if (response.data && response.data.result) {
            response.data.result.forEach(function(val, index, arr) {
              if (val.status == 0) {
                vm.showReading = true
              } else if (val.status == 1) {
                vm.showRead = true
              }
              if (vm.showReading && vm.showRead) return false
              let newListData = []
              val.list.forEach(function(element, index, arr) {
                if (element.is_currentuser) {
                  newListData.unshift(element)
                } else {
                  newListData.push(element)
                }
              })
              val.list = newListData
            })
          }
          vm.privateBookData = response.data.result
          vm.isLoadFinish = true
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    goBookDetail(id) {
      this.$router.push({ name: 'BookDetail', params: { id: id } })
    },
    writeNote(bookId) {
      this.$router.push({ name: 'AddNote', query: { bookId: bookId } })
    }
  }
}
</script>

<style scoped>
/*无图书*/
.no_bookImg img {
  width: 60vw;
}

.no_bookDiv {
  display: flex;
  justify-content: center;
}

.no_bookText {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 10vh;
  width: 90%;
  padding: 5px;
  position: relative;
}

.comma::after {
  content: '”';
  font-size: 50px;
  color: #ccc;
  border-radius: 4px;
  position: absolute;
  z-index: 1000;
  right: 0px;
  bottom: -25px;
}

.comma::before {
  content: '“';
  font-size: 50px;
  color: #ccc;
  border-radius: 4px;
  position: absolute;
  z-index: 1000;
  left: 0px;
  top: 0px;
}

/*图书在读、已读*/
.card {
  /*width: 100%;*/
  margin: 2vh 3vh;
  background-color: white;
  box-shadow: 0px 0px 20px 5px #e9e9e9;
  border-radius: 5px;
}

.contentDiv {
  padding: 10px;
}

.readingBook {
  height: 80vh;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.readingBook,
.readBook {
  text-align: left;
}

.readingBookImg img,
.readBookImg img {
  margin: 1vh;
  box-shadow: 0px 0px 20px 5px #e9e9e9;
  border-radius: 5px;
  width: 100%;
  max-height: 15vh;
}

.imgBottom {
  position: absolute;
  bottom: 6px;
  margin: 0 1vh;
  width: 25%;
  font-size: 0.7rem;
  background-color: rgba(255, 255, 255, 0.7);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  color: #457094;
  text-align: center;
  letter-spacing: 1px;
}

.number {
  color: #eaa41e;
}

.labelDiv {
  position: absolute;
  border: 17px solid;
  border-color: #ec8947 transparent transparent #ec8947;
  left: 1vh;
  top: 1vh;
}

.labelDiv .labelIcon {
  position: absolute;
  top: -14px;
  left: -15px;
  color: #ffffff;
  font-size: 12px;
}

.middleDiv {
  padding-left: 2vw;
}

.middleDiv2 {
  width: 100%;
  padding: 0 12px;
}

.bookTitle {
  text-align: left;
  color: #457094;
  font-weight: bold;
  margin: 0 0 1.5vh 0;
  max-width: 35vw;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.authorDiv {
  display: flex;
  height: 1.5rem;
  line-height: 1.5rem;
}

.author {
  background-color: #e2edf5;
  border-radius: 5px;
  color: #457094;
  font-size: 0.7rem;
  padding: 0 5px;
  width: 14vw;
  height: 1.5rem;
  line-height: 1.5rem;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.translate {
  width: 50%;
  margin-left: 5px;
  text-align: left;
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
  width: 14vw;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.publish {
  width: 100%;
  color: #8a969f;
  font-size: 0.7rem;
  height: 1.5rem;
  line-height: 1.5rem;
  padding-top: 0.5rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.progress {
  padding-left: 5px;
}

.progress span {
  color: #8a969f;
  font-size: 0.7rem;
  float: left;
  height: 3vh;
  line-height: 3vh;
}

.time {
  position: absolute;
  right: 10px;
  top: 12px;
  color: #8a969f;
  font-size: 0.7rem;
}

.note {
  height: 30px;
  line-height: 30px;
  background-color: #419ddc;
  color: #ffffff;
  border-radius: 5px;
  text-align: center;
  position: absolute;
  top: 50%;
  margin-top: -15px;
  right: 0px;
  font-size: 0.9rem;
  padding: 2px 6px;
}

.icon-write {
  font-size: 12px;
  margin-right: 3px;
}

.nickname {
  display: inline-block;
  max-width: 12vw;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>

