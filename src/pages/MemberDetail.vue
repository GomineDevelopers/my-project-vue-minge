<template>
  <div>
    <el-row class="member-detail-row">
      <el-col :span="24">
        <div class="member-detail-title" :class="{'member-detail-title-more': !isTitleOneRow }"
             ref="titleTxtContainer" >
          <span v-text="title" ref="titleTxt"></span>
        </div>
      </el-col>
    </el-row>
    <el-row class="member-detail-row">
      <el-col :span="24">
        <div class="member-detail-subtitle">发布时间：<span v-text="time"></span></div>
      </el-col>
    </el-row>
    <el-row class="member-detail-row">
      <el-col :span="24">
        <img class="member-detail-img" :src="thumb">
      </el-col>
    </el-row>
    <el-row class="member-detail-row">
      <el-col :span="24">
        <div class="member-detail-article" v-text="description"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
      name: "MemberDetail",
      data(){
          return {
            memberDetailData:'',
            isTitleOneRow: true,
            title:'',
            time:'',
            description:'',
            thumb:''
          }
      },
      watch: {
        $route: 'updatePage',
        title: 'updateTitleCss'
      },
      mounted(){
        this.getDetailData();
      },
      methods:{
        getDetailData(){
          let vm = this;
          vm.axios(vm.$commonTools.g_restUrl, {
            params: {
              i: "8",
              c: "entry",
              p: "information",
              do: "shop",
              m: "ewei_shop",
              ac: "inform_detail",
              showLoading: true,
              id:vm.$route.params.id
            }
          })
            .then(function(response) {
              vm.title = response.data.result.name;
              vm.time = vm.$commonTools.formatDate(response.data.result.create_time);
              vm.description = response.data.result.description;
              vm.thumb = response.data.result.thumb;
              console.info(vm.thumb.width)
            })
            .catch(function(error) {
              console.log(error);
            });
        },
        updateTitleCss: function() {
          this.$nextTick(function() {
            if (this.isOneRow()) this.isTitleOneRow = true
            else this.isTitleOneRow = false
          })
        },
        isOneRow: function() {
          var width1 = this.$refs.titleTxt.offsetWidth;
          var width2 = this.$refs.titleTxtContainer.offsetWidth;
          return width1 <= width2
        },
        updatePage: function() {
          this.updateTitleCss();
          this.getDetailData();
        }
      }
    }
</script>

<style scoped>
  .member-detail-row {
    padding: 0 20px;
  }

  .member-detail-title{
    color: #333333;
    font-size: 20px;
    padding: 10px 0;
    text-align: center;
    white-space: nowrap;
  }

  .member-detail-title-more {
    text-align: justify !important;
    white-space: normal !important;
  }

  .member-detail-subtitle{
    color: #999999;
    font-size: 12px;
  }

  .member-detail-article{
    text-align: left;
    padding: 0 5px;
  }

  /*.member-detail-img1{
    padding: 10px;
    width: 96%;
  }*/

  .member-detail-img{
    padding: 10px;
    height: 20vh;
  }
</style>
