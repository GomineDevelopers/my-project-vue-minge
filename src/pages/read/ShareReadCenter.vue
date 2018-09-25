<template>
  <div class="container">
    <div class="card" v-for="item in shareReadList">
      <el-row>
        <div class="topDiv">
          <span class="people">{{item.sender}}</span>邀请
          <span class="people">{{item.accept}}</span>
          {{item.book}}
        </div>
      </el-row>
      <el-row>
        <div class="bottomDiv">
          <span class="share-read-center-span-icon1"><i class="iconfont icon-together-read"></i> &nbsp;{{item.date}}</span>
          <span class="share-read-center-span-icon2" @click="goDetail(item.id)"><i class="el-icon-edit-outline"></i>留言</span>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'share-read-center',
    data() {
      return {
        shareReadList: []
      }
    },
    created() {
      this.getShareReadList();
    },
    methods: {
      getShareReadList() {
        let vm = this;
        vm.axios(vm.$commonTools.g_restUrl, {
          params: {
            i: '8',
            c: 'entry',
            p: 'mq',
            do: 'shop',
            m: 'ewei_shop',
            ac: 'mq_invite',
          }
        })
          .then(function (response) {
            for (let i = 0; i < response.data.result.length; i++) {
              let message = response.data.result[i].message;
              let messageArray = message.split(";");
              let messageObject = {
                "sender": messageArray[0],
                "act": messageArray[1],
                "accept": messageArray[2].substring(0, messageArray[2].length - 1),
                "book": messageArray[3],
                "date": vm.$commonTools.formatDate(response.data.result[i].create_time),
                "id":response.data.result[i].id
              }
              vm.shareReadList.push(messageObject);
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      goDetail(id){
        this.$router.push({ name: 'ShareReadDetail', params: { id: id } });
      }
    }
  }
</script>

<style scoped>
  .card {
    margin: 2vh 3vh;
    background-color: white;
    box-shadow: 0px 0px 20px 5px #e9e9e9;
    border-radius: 5px;
    text-align: left;
    padding: 2vh;
  }

  .topDiv {
    line-height: 26px;
  }

  .topDiv .people {
    color: #dc9705;
    font-weight: bold;
  }

  .bottomDiv {
    text-align: right;
    margin-top: 10px;
  }

  .bottomDiv span {
    font-size: 14px;
  }

  .share-read-center-span-icon1{
    float: left;
    color: #8a969f;
  }
  .share-read-center-span-icon2{
    color: #0064ba;
  }
</style>
