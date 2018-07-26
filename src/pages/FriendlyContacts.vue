<template>
  <div class="list-container full-container">
    <vue-headful title="友好往来"/>
    <scroller
      :on-infinite="infinite" class="scroller-container" >
      <!-- content goes here -->
      <div style="height: 44px;"></div>
      <div v-for="item in items" class="row">
        <div class="title">{{item.title}}</div>
        <div class="image"><img :src="item.thumb"></div>
        <div class="readMore" @click="goDetail(item.id)">查看更多>></div>
      </div>
    </scroller>
  </div>
</template>

<script>
    export default {
        name: "FriendlyContacts",
      data() {
        return {
          items: [],
          curPage: 1,
          isLast: false
        }
      },
      methods: {
        getListByCateId(done) {
          let vm = this;
          this.axios(vm.$commonTools.g_restUrl,{
            params: {
              i: "8",
              c: "entry",
              p: "article",
              do: "shop",
              m: "ewei_shop",
              ccate:55,//分类
              page: vm.curPage
            }
          })
            .then(function (response) {
              if (response.data.result.list) {
                for (var i = 1; i <= response.data.result.list.length; i++) {
                  vm.items.push(response.data.result.list[i - 1])
                }
              }

              if (response.data.result.list && response.data.result.list.length == 10) {
                vm.isLast = false;
                vm.curPage++;
              }
              else {
                vm.isLast = true;
              }
              done();
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        infinite(done) {
          let vm = this;
          if (!vm.isLast) {
            vm.getListByCateId(done);
          }
          else {
            done(true);
          }
        },
        goDetail(id) {
          this.$router.push({name: 'NewsDetail', params: {id: id}})
        }
      }
    }
</script>

<style scoped>
  .scroller-container {
    top: -44px;
    padding-bottom: 44px;
    background: #EBEBEB;
  }

  .row {
    padding: 5% 3vh;
    border-bottom: 1px solid #d3dce6;
    background: white;
    text-align:justify;
    margin-bottom: 1.5vh;
  }

  .row .title {
    width: 100%;
    max-height: 6vh;
    line-height: 3vh;
    overflow: hidden;
  }

  .row .image {
    margin-top:.6vh;
    height: 20vh;
    width: 100%;
  }

  .row .image img {
    height: 100%;
    width: 100%;
  }

  .readMore{
    text-align: right;
    margin-top: 10px;
    color: #cccccc;
    font-size: 12px;
  }


</style>
