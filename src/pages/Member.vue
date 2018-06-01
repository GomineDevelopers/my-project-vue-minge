<template>
  <div class="memberCover">
    <div class="memberBg memberContainer" v-for="item in listData">
      <el-row class="memberRow">
        <el-col :span="7" class="avatar"></el-col>
        <el-col :span="17">
          <div class="memberName" v-text="item.name"></div>
          <div class="memberDescription" v-text="item.decription"></div>
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
            listData:[
              {"name":"龙超云","decription":"贵州中药民族药质量控制的守望者"},
              {"name":"栗战书","decription":"民革党员李健铭：当选全国青联委员并 参加全国青联十二。"},
              {"name":"刘奇葆","decription":"唱响中国人的高男高音"},
              {"name":"陈希","decription":"老林村的致富引路人"},
              {"name":"龙超云","decription":"贵州中药民族药质量控制的守望者"},
              {"name":"龙超云","decription":"贵州中药民族药质量控制的守望者"},
              {"name":"龙超云","decription":"贵州中药民族药质量控制的守望者"},
            ]
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
    background-image: url("./1.jpg");
    background-size: 100% 100%;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  .avatar img {
    width: inherit;
    height: inherit;
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
