<template>
  <div class="book_detail_bg">
    <div class="book_detail">
      <el-row>
        <el-col :span="20">
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
              <span v-if="bookDetailData == 0">否</span>
              <span v-else-if="bookDetailData == 1">是</span>
            </div>
          </el-row>
          <el-row>
            <div class="wrapper">总页数：<span v-text="bookDetailData.page_number"></span><span>页</span></div>
          </el-row>
          <el-row class="wrapper">
              已读页数：<span v-text="bookDetailData.page_schedule"></span><span>页</span>
              <el-button size="mini" type="primary" plain @click="updatePages" v-if="bookDetailData.status == 0">更新</el-button>
          </el-row>
          <el-row>
            <div class="readProgress">
              <span>读书进度：</span>
              <el-progress :percentage="bookDetailData.percentage" color="#ec8947"></el-progress>
            </div>
          </el-row>
          <el-row>
            <div class="wrapper">读书伙伴：<span>80%小小苏</span></div>
          </el-row>
        </el-col>

        <el-col :span="4">
          <div class="iconRight" v-if="bookDetailData.my_book == 1">
            <div>邀伴读书</div>
            <div @click="rewrite(bookDetailData.id)">编辑</div>
            <div @click="del(bookDetailData.id)">删除</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
    export default {
      name: "book-detail",
      data(){
        return{
          bookDetailData:Object
        }
      },
      created(){
        this.getBookDetailData()
      },
      methods:{
        updatePages(){
          let vm=this;
          vm.$prompt('输入页数', '更新进度', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern:  /^[1-9]\d*$/,
            inputErrorMessage: '只能输入非负整数'
          }).then(({ value }) => {
            vm.updateNewPages(value);
          }).catch(() => {
            vm.$message({
              type: 'info',
              message: '取消输入'
            });
          });
        },
        updateNewPages(value){
          let vm = this;
          vm.axios(vm.$commonTools.g_restUrl, {
            params: {
              i: '8',
              c: 'entry',
              p: 'bookmates',
              do: 'shop',
              m: 'ewei_shop',
              ac: 'update_number',
              id:vm.$route.params.id,
              page_schedule: value
            }
          })
            .then(function(response) {
              vm.getBookDetailData();
            })
            .catch(function(error) {
              console.log(error)
            })
        },
        getBookDetailData(){
          let vm = this;
          vm.axios(vm.$commonTools.g_restUrl, {
              params: {
                i: '8',
                c: 'entry',
                p: 'bookmates',
                do: 'shop',
                m: 'ewei_shop',
                ac: 'detail_book',
                id:vm.$route.params.id
              }
            })
            .then(function(response) {
              vm.bookDetailData = response.data.result;
            })
            .catch(function(error) {
              console.log(error)
            })
        },
        del(id){
          let vm = this;
          vm.axios(vm.$commonTools.g_restUrl, {
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
              if(response.data.result.info == '操作成功'){
                vm.$router.replace({name: 'BookList'});
              }
            })
            .catch(function(error) {
              console.log(error)
            })
        },
        rewrite(id){
          this.$router.push({name: 'EditBook',params:{id:id}});
        }
      }
    }
</script>

<style scoped>
  .book_detail{
    text-align: left;
    margin: 12vw 16vw;
  }

  .cover{
    display: flex;
    align-items: flex-start;
    padding-bottom: 1vh;
    max-height: 20vh;
  }

  .cover img{
    max-height:17vh;
    max-width: 70%;
    padding: 5px;
    border: 1px solid #b3b3b3;
    border-radius: 5px;
  }

  .book_detail span{
    font-weight: bold;
  }

  .book_detail .wrapper{
    height: 5vh;
    line-height: 5vh;
  }

  .iconRight{
    position: absolute;
    top: 18vh;
    right: -8vw;
  }

  .title{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .readProgress span{
    float: left;
    height: 5vh;
    line-height: 5vh;
    font-weight: normal;
  }

  .textInterception{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>
<style>

</style>
