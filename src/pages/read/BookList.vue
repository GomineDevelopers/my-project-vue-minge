<template>
  <div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="在读" name="first" class="tabFirst">

        <div class="no_book" v-if="showItem == 0">
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

        <div class="readingBook" v-if="showItem == 1">
          <div class="card" v-for="(item,index) in privateBookData" :key="index" v-if="item.status == 0">
            <el-row type="flex" justify="space-between">
              <el-col :span="6">
                <div class="readingBookImg">
                  <img :src="item.img">
                  <div class="imgBottom"><span class="number">3</span>篇笔记</div>
                </div>
              </el-col>
              <el-col :span="10" class="middleDiv">
                <div>
                  <div class="bookTitle" v-text="item.title"></div>
                  <div class="authorDiv">
                    <div class="author" v-text="item.author"></div>
                    <div class="translate" v-if="item.translators != '' ">
                      <img src="../../../static/image/interpriter-icon.png">
                      <span v-text="item.translators"></span>
                    </div>
                  </div>
                  <div class="publish" v-text="item.publisher"></div>
                  <div class="progress" ><span v-text="item.page_number"></span>读书进度</div>
                </div>
              </el-col>
              <el-col :span="6">
                  <div class="time" v-text="$commonTools.formatDate(item.create_time)"></div>
                  <div class="note">写笔记</div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="已读" name="second" class="tabLast">

        <div class="no_book" v-if="showItem == 0">
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

        <div class="readBook" v-if="showItem == 1">
          <div class="card" v-for="(item,index) in privateBookData" :key="index" v-if="item.status == 1">
            <el-row type="flex" justify="space-between">
              <el-col :span="6">
                <div class="readBookImg">
                  <img :src="item.img">
                  <div class="imgBottom"><span class="number">3</span>篇笔记</div>
                </div>
              </el-col>
              <el-col :span="10" class="middleDiv">
                <div>
                  <div class="bookTitle" v-text="item.title"></div>
                  <div class="authorDiv">
                    <div class="author" v-text="item.author"></div>
                    <div class="translate" v-if="item.translators != '' ">
                      <img src="../../../static/image/interpriter-icon.png">
                      <span v-text="item.translators"></span>
                    </div>
                  </div>
                  <div class="publish" v-text="item.publisher"></div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="time" v-text="$commonTools.formatDate(item.create_time)"></div>
                <div class="note">写笔记</div>
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
      name: "book-list",
      data() {
        return {
          activeName: 'first',
          showItem : 1,
          privateBookData : Array
        }
      },
      mounted(){
        this.getBookList();
      },
      methods: {
        getBookList(){
          let vm = this;
          vm.axios(vm.$commonTools.g_restUrl,{
            params: {
              i: '8',
              c: 'entry',
              p: 'bookmates',
              do: 'shop',
              m: 'ewei_shop',
              ac: 'private_book',
            }
          })
            .then(function (response) {
              if(response.data.result){
                vm.privateBookData = response.data.result;
              }else{
                vm.showItem = 0;
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      }
    }
</script>

<style scoped>

  /*无图书*/
  .no_bookImg img{
    width: 60vw;
  }

  .no_bookDiv{
    display: flex;
    justify-content: center;
  }

  .no_bookText{
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
    content: "”";
    font-size: 50px;
    color: #ccc;
    border-radius: 4px;
    position: absolute;
    z-index: 1000;
    right:0px;
    bottom: -25px;
  }

  .comma::before {
    content: "“";
    font-size: 50px;
    color: #ccc;
    border-radius: 4px;
    position: absolute;
    z-index: 1000;
    left: 0px;
    top: 0px;
  }

  /*图书在读、已读*/
  .card{
    /*width: 100%;*/
    margin: 2vh 3vh;
    background-color: white;
    box-shadow: 0px 0px 20px 5px #e9e9e9;
    border-radius: 5px;
  }

  .readingBook{
    height: 80vh;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .readingBook,.readBook{
    text-align: left;
  }

  .readingBookImg img,.readBookImg img{
    margin: 1vh;
    box-shadow: 0px 0px 20px 5px #e9e9e9;
    border-radius: 5px;
    width: 100%;
    height: 100%;
  }

  .imgBottom{
    position: absolute;
    bottom: 10px;
    margin:0 1vh ;
    width: 25%;
    font-size: .7rem;
    background-color: rgba(255,255,255,0.7);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    color: #457094;
    text-align: center;
    letter-spacing: 1px;
  }

  .number{
    color: #eaa41e;
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

  .middleDiv{
    display: flex;
    align-items: center;
  }

  .authorDiv{
    display: flex;
    height: 1.5rem;
    line-height: 1.5rem;
  }

  .author{
    background-color: #e2edf5;
    border-radius: 5px;
    color: #457094;
    font-size: 0.8rem;
    padding:0 5px;
    width: 14vw;
    height: 1.5rem;
    line-height: 1.5rem;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .translate{
    margin-left: 5px;
    text-align: left;
    display: flex;
    align-items: center;
  }

  .translate img{
    width: 16px;
    height: 16px;
  }

  .translate span{
    color: #8a969f;
    font-size: 0.7rem;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .publish{
    color: #8a969f;
    font-size: 0.7rem;
    height: 1.5rem;
    line-height: 1.5rem;
    padding-top: .5rem;
  }

  .progress{
    color: #8a969f;
    font-size: 0.7rem;
    height: 1.5rem;
    line-height: 1.5rem;
  }


  .time{
    position: absolute;
    right: 10px;
    top:12px;
    color: #8a969f;
    font-size: 0.7rem;
  }

  .note{
    height:30px;
    line-height: 30px;
    background-color: #419ddc;
    color: #ffffff;
    border-radius: 5px;
    text-align: center;
    padding: 0 5px;
    position: absolute;
    top:50%;
    margin-top: -15px;
    right: 10px;
    font-size: .9rem;
    padding: 2px 10px;
  }
</style>

