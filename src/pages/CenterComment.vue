<template>
  <div class="my-all-comments">
    <vue-headful title="我的留言"/>
    <div class="my-all-comments-container">
      <div class="my-all-comments-card" v-for="(item,index) in dataList">
        <el-row>
          <el-row>
            <el-col :span="24"><div class="my-all-comments-mycom"><span>|</span>&nbsp;&nbsp;我的留言{{index+1}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="my-all-comments-title"><span v-text="item.title"></span></el-col>
          </el-row>
          <el-row>
            <el-col :span="24"><div class="my-all-comments-dashborder" v-text="item.content"></div></el-col>
          </el-row>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "center-comment",
    data() {
      return {
        dataList:[]
      }
    },
    created(){
      this.getMyComments();
    },
    methods:{
      getMyComments:function () {
        let vm = this;
        vm.axios(vm.$commonTools.g_restUrl,{
          params:{
            i: "8",
            c: "entry",
            p: "common",
            do: "shop",
            m: "ewei_shop",
            ac:"collection",
            psize:"999",
            showLoading: true,
          }
        })
          .then(function (response) {
            if(response.data.result.data){
              vm.dataList = response.data.result.data;
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }
</script>

<style scoped>
  .my-all-comments{
    height:100% ;
    overflow:auto;
    background-color: #eaeff2;
  }

  .my-all-comments-container{
    padding: 10px 20px 20px 20px;
  }

  .my-all-comments-card{
    background-color: #ffffff;
    text-align: left;
    box-shadow:2px 2px 2px 2px  #cbcdcf;
    margin-top: 10px;
  }

  .my-all-comments-mycom{
    font-size: 14px;
    color: #838e97;
    padding: 10px 10px 10px 0;
  }

  .my-all-comments-mycom span{
    color:#5c8ab2;
    font-size: 18px;
    font-weight: 700;
  }

  .my-all-comments-title{
    padding: 0 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .my-all-comments-title span{
    color:#0064ba;
    font-weight: bold;
    font-size: 16px;
    height: 25px;
    line-height: 25px;
  }

  .my-all-comments-dashborder{
    border: 1px #cccccc dashed;
    border-radius: 5px;
    margin: 10px;
    padding: 6px 10px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    height: 48px;
    line-height: 25px;
    overflow: hidden;
    word-wrap: break-word;
  }
</style>
