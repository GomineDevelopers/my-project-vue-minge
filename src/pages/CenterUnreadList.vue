<template>
  <div class="center_home_bg">
    <vue-headful title="未读列表"/>
    <div class="Un_container">
      <el-row>
        <el-col :span="24">
          <div class="Un_border-left">
            <span v-if="type == 1">新的入党申请</span>
            <span v-else-if="type == 2">新的提案</span>
            <span v-else="type == 3">新的读书邀请</span>
          </div>
        </el-col>
      </el-row>
      <el-row v-for="item in unreadList" :key="item.id">
        <el-col :span="24">
          <div class="Un_card" :class="[item.status == 1 ? 'status-success' : 'status-wait' ]" @click="goDetail(item.id)">
            <el-row class="Un_card_list">
              <el-col :span="1"><span>●</span></el-col>
              <el-col :span="14"><div v-text="item.title" class="title"></div></el-col>
              <el-col :span="9" v-if="type == 1" class="Un_card_div">的入党申请</el-col>
              <el-col :span="9" v-else-if="type == 2" class="Un_card_div">的提案</el-col>
              <el-col :span="9" v-else="type == 3" class="Un_card_div">的读书邀请</el-col>
            </el-row>
            <div class="c1"></div>
            <div class="c2"></div>
            <div class="c3" v-if="item.status == 0">未处理</div>
            <div class="c3" v-if="item.status == 1">已处理</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
    export default {
      name: "CenterUnreadList",
      data () {
        return {
          unreadList : [],
          type:this.$route.params.type
        }
      },
      created(){
        this.getUnreadList();
      },
      methods:{
        getUnreadList(){
          let vm = this;
          vm.axios(vm.$commonTools.g_restUrl,{
            params: {
              i: "8",
              c: "entry",
              p: "mq",
              do: "shop",
              m: "ewei_shop",
              ac: "mq_list",
              type: vm.$route.params.type,
            }
          })
            .then(function (response) {
              vm.unreadList = response.data.result;
            })
            .catch(function (error) {
              console.info(error);
            })
        },
        goDetail(id){
          let vm = this;
          if(vm.$route.params.type == 1){
            this.$router.push({name: 'CheckApply',params: { id: id }});
          }else if(vm.$route.params.type == 2){
            this.$router.push({name: 'CheckProposal',params: { id: id }});
          }else if(vm.$route.params.type == 3){}
        }
      }
    }
</script>

<style scoped>
  .center_home_bg{
    overflow: auto;
  }

  .Un_container{
    margin: 12vh 3vh 0 3vh;
  }

  .Un_border-left{
    text-align: left;
    border-left: 3px solid #357baa;
  }

  .Un_border-left span{
    display: inline-block;
    padding-left: 10px;
  }

  .Un_card{
    text-align: left;
    background: #ffffff;
    -webkit-box-shadow: 0px 0px 20px 5px #e9e9e9;
    box-shadow: 0px 0px 20px 5px #e9e9e9;
    position: relative;
    border-radius: 5px;
    margin: .5rem  0 .2rem 0;
  }

  .Un_card .c1 {
    width: 0;
    height: 0;
    border-left: 7.5vh solid transparent;
    position: absolute;
    top: 0;
    right: 0;
  }

  .Un_card .c2 {
    width: 0;
    height: 0;
    border-top: 3vh solid white;
    border-left: 3vh solid transparent;
    position: absolute;
    top: 0;
    right: 0;
  }

  .Un_card .c3 {
    top: 1.0vh;
    right: -1.3vh;
    color: white;
    position: absolute;
    width: 8vh;
    height: 3.6vh;
    line-height: 3.6vh;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg) scale(0.9);
    z-index: 111;
    font-size: 2vw;
    text-align: center;
    letter-spacing: 0.5px;
  }

  .Un_card_list{
    margin : 0 6vw 0 4vw
  }

  .Un_card .title{
    height: 7.5vh;
    line-height: 7.5vh;
    color:#56b0f0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .Un_card_div{
    height: 7.5vh;
    line-height: 7.5vh;
  }

  .Un_card span{
    height: 7.5vh;
    line-height: 7.5vh;
    color:#56b0f0;
  }

  .status-success .c1 {
    border-top: 7.5vh solid #66c661;
  }

  .status-wait .c1 {
    border-top: 7.5vh solid #d26e7a;
  }

</style>
