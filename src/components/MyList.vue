<template>
  <scroller
    :on-infinite="infinite"  class="scroller-container">
    <!-- content goes here -->
    <div style="height: 44px;"></div>
    <div v-for="item in items" class="row">
      <div class="image"><img :src="item.thumb"></div>
      <div class="text">
        <div class="title">{{item.title}}</div>
        <div class="content">{{item.contents}}</div>
      </div>
    </div>
  </scroller>
</template>

<script>
  export default {
    name: "MyList",
    data() {
      return {
        items: [],
        cateId: "",
        curPage: 1,
        isLast: false,
      }
    },
    props: {
      listType: Number
    },
    methods: {
      getListByCateId(done) {
        let vm = this;
        this.axios('http://192.168.0.5/app/', {
          params: {
            i: "8",
            c: "entry",
            p: "article",
            do: "shop",
            m: "ewei_shop",
            ccate: vm.listType,//分类
            page: vm.curPage
          }
        })
          .then(function (response) {
            console.log(vm.listType, vm.curPage);
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
    }
  }
</script>

<style scoped>
  .scroller-container {
    top: -44px;
    padding-bottom: 44px;
  }

  .row {
    margin: 0 2%;
    padding: .9vh 0;
    height: 11vh;
    border-bottom: 1px solid #d3dce6;
  }

  .row .image {
    height: 100%;
    width: 30%;
    float: left;
  }

  .row .image img {
    height: 100%;
    width: 100%;
  }

  .row .text {
    width: 68%;
    margin-left: 2%;
    height: 100%;
    line-height: 100%;
    float: left;
    text-align: justify;
  }

  .row .title {
    width: 100%;
    max-height: 6vh;
    line-height: 3vh;
    margin-top: .7vh;
    overflow: hidden;
  }

  .row .content {
    width: 100%;
    height: 3vh;
    line-height: 3vh;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    margin-top: .6vh;
    color:#999999;
  }
</style>
