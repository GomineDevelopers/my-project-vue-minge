<template>
    <div class="center_home_bg">
      <vue-headful title="积分列表"/>
      <div class="point_container">
        <el-row>
          <div class="point_border_left"><span>积分详情</span></div>
        </el-row>
        <el-row class="point_card" v-for="(item,index) in centerPointList" :key="index">
          <div class="point_content">
            <el-col :span="15">
              <span v-text="item.score_type"></span>&nbsp;<span class="el-icon-plus"></span><span class="score" v-text="item.score"></span>分
            </el-col>
            <el-col :span="9" class="timeDiv">
              <span class="time" v-text="$commonTools.formatDate(item.create_time,true)"></span>
            </el-col>
          </div>
        </el-row>
      </div>
    </div>
</template>

<script>
    export default {
      name: "CenterPoint",
      data(){
          return {
            centerPointList:''
          }
      },
      created(){
        this.getCenterPoints();
      },
      methods:{
        getCenterPoints(){
          let vm = this;
          vm.axios(vm.$commonTools.g_restUrl, {
            params: {
              i: "8",
              c: "entry",
              p: "mq",
              do: "shop",
              m: "ewei_shop",
              ac: "mq_list",
              type: 5,
            }
          })
            .then(function (response) {
              vm.centerPointList = response.data.result;
            })
            .catch(function (error) {
              console.info(error);
            })
        }
      }
    }
</script>

<style scoped>
  .point_container{
    margin: 12vh 3vh 0 3vh;
  }

  .point_border_left{
    text-align: left;
    border-left: 3px solid #357baa;
  }

  .point_border_left span{
    padding-left: 2vw;
  }

  .point_card{
    text-align: left;
    background: #ffffff;
    -webkit-box-shadow: 0px 0px 20px 5px #e9e9e9;
    box-shadow: 0px 0px 20px 5px #e9e9e9;
    position: relative;
    border-radius: 5px;
    margin: .5rem 0 .2rem 0;
  }

  .point_content{
    padding: 2vh 4vw;
    display: flex;
    align-items: center;
  }

  .timeDiv{
    text-align: right;
  }

  .time{
    font-size: .8rem;
    color: #cccccc;
  }

  .score{
    color: #dc9705;
    font-weight: bold;
  }
</style>
