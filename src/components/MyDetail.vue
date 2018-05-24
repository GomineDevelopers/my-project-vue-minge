<template>
  <div class="news-detail-container">
    <div class="news-detail-top">
      <el-row class="news-detail-top-row">
        <el-col :span="24"><div class="news-detail-title"><span v-text="title"></span></div></el-col>
      </el-row>
      <el-row class="news-detail-top-row">
        <el-col :span="24">
          <div class="news-detail-subtitle">
            <span class="news-detail-subtitle-span" v-text="source"></span><span v-text="article_time_c"></span>
          </div>
        </el-col>
      </el-row>
      <el-row class="news-detail-top-row">
        <el-col :span="24">
          <div class="news-detail-img">
            <img src="http://192.168.0.5/attachment/images/8/2018/04/cMZmK5kt0P7MRr0GfrTrtgz0H0rBG7.jpg">
          </div>
        </el-col>
      </el-row>
      <el-row class="news-detail-top-row">
        <el-col :span="24">
          <div class="news-detail-top-article" v-html="content"></div>
        </el-col>
      </el-row>
    </div>
    <div class="news-detail-bottom">
      <el-row>
        <span class="news-detail-bottom-span-icon1"><img src="../pages/read.png"/><span v-text="click_count"></span></span><span class="news-detail-bottom-span-icon2"><i class="el-icon-edit-outline"></i>评论</span>
      </el-row>
      <div class="news-detail-bottom-commentArea">
        <div class="news-detail-bottom-comment-border">
          <el-row>
            <el-col :span="4">
              <div class="news-detail-bottom-icon">
                <img src="http://192.168.0.5/attachment/images/8/2018/04/cMZmK5kt0P7MRr0GfrTrtgz0H0rBG7.jpg">
              </div>
            </el-col>
            <el-col :span="20" class="news-detail-bottom-comment">
              <el-row>
                <el-col :span="24"><span class="news-detail-bottom-username">借东西的小人</span></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><span class="news-detail-bottom-time">05-22 13:57</span></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><span class="news-detail-bottom-content">座谈中的内容结合自身实际，进一步激发老百姓脱贫的内生动力</span></el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div class="news-detail-bottom-comment-border">
          <el-row>
            <el-col :span="4">
              <div class="news-detail-bottom-icon">
                <img src="http://192.168.0.5/attachment/images/8/2018/04/cMZmK5kt0P7MRr0GfrTrtgz0H0rBG7.jpg">
              </div>
            </el-col>
            <el-col :span="20" class="news-detail-bottom-comment">
              <el-row>
                <el-col :span="24"><span class="news-detail-bottom-username">借东西的小人</span></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><span class="news-detail-bottom-time">05-22 13:57</span></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><span class="news-detail-bottom-content">座谈中的内容结合自身实际，进一步激发老百姓脱贫的内生动力</span></el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "MyDetail",
        data(){
          return{
            title : '',
            content : '',
            source:'',
            article_time:'',
            click_count:0
          }
        },
        mounted:function(){
          this.getDetailData()
        },
        methods:{
          getDetailData:function () {
            let vm = this;
            this.axios('http://192.168.0.5/app/index.php',{
              params: {
                i: "8",
                c: "entry",
                p: "api_detail",
                do: "shop",
                m: "ewei_shop",
                id:"223"
              }
            })
              .then(function (response){
                vm.title  = response.data.result.data.title
                vm.content  = response.data.result.data.content
                vm.article_time  = response.data.result.data.createtime;

                vm.click_count  = response.data.result.data.click
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        },
        computed: {
          article_time_c: function () {
            debugger
            return "发布日期：" + this.$formatDate(this.article_time)
          }
        }
    }
</script>

<style scoped>
  .news-detail-top{
    padding-bottom: 10px;
    box-shadow: 0 0 20px #999999;
  }
  .news-detail-top-row{
    padding: 0 20px;
  }
  .news-detail-title{
    color: #333333;
    font-size: 20px;
    padding: 10px 0;
  }
  .news-detail-subtitle{
    color: #999999;
    font-size: 14px;
    padding-bottom: 10px;
  }
  .news-detail-subtitle-span{
    margin-right:20px;
  }
  .news-detail-img img{
    width: 100%;
  }
  .news-detail-top-article{
    text-align: left;
    padding: 0 5px;
  }
  .news-detail-bottom{
    padding: 20px 20px 0 20px;
  }
  .news-detail-bottom span img{
    width: 20px;
  }
  .news-detail-bottom-span-icon1{
    float: left;
    padding-bottom: 10px;
    color: #999999;
    font-size: 14px;
  }
  .news-detail-bottom-span-icon2{
    float: right;
    padding-bottom: 10px;
    color: #0064ba;
    font-size: 14px;
  }
  .news-detail-bottom-icon img{
    width: 26px;
    height: 26px;
    border-radius: 50%;
  }
  .news-detail-bottom-commentArea{
    clear:both;
    border: 1px dashed #cccccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 30px;
  }
  .news-detail-bottom-comment{
    text-align: left;
  }
  .news-detail-bottom-username{
    font-size: 14px;
  }
  .news-detail-bottom-time{
    font-size: 12px;
    color: #cccccc;
  }
  .news-detail-bottom-content{
    font-size: 14px;
  }
  .news-detail-bottom-comment-border{
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 8px;
  }
</style>
