<template>
  <div class="memberCover">
    <vue-headful title="党员风采"/>
    <div class="memberBg memberContainer" v-for="item in listData">
      <el-row class="memberRow">
        <el-col :span="7" class="avatar"><img :src="item.thumb"></el-col>
        <el-col :span="17">
          <div class="memberName" v-text="item.name"></div>
          <div class="memberDescription" v-html="item.description"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
    export default {
        name: "member",
        data(){
          return{
            listData:[]
          }
        },
        created() {
          this.getMemberList();
        },
        methods:{
          getMemberList:function () {
            let vm = this;
            this.axios(vm.$commonTools.g_restUrl,{
              params:{
                i: "8",
                c: "entry",
                p: "information",
                do: "shop",
                m: "ewei_shop"
              }
            })
              .then(function (response) {
                if(response.data.result.data){
                  for(var i = 0 ; i < response.data.result.data.length ; i++){
                    vm.listData.push(response.data.result.data[i]);
                  }
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
  .memberCover{
    margin: 20px;
  }

  .memberContainer{
    margin-bottom: 10px;
    height: 100px;
  }

  .memberRow{
    height: inherit;
  }

  .avatar{
    height: inherit;
    background-size: 100% 100%;
    width: 80px;
  }

  .avatar img {
    width: inherit;
    height: inherit;
    border-radius: 10px 0 0 10px;
  }

  .memberName{
    font-size: 18px;
    color: #1264b4;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 15px 5px 5px 10px;
  }

  .memberDescription{
    text-align: left;
    font-size: 14px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    line-height: 20px;
    padding: 0px 5px 5px 10px;
  }
</style>
