<template>
  <scroller
    :on-infinite="infinite" class="scroller-container">
    <!-- content goes here -->
    <div style="height: 44px;"></div>
    <div v-for="item in items" class="row" @click="goDetail(item.id)">
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
  name: 'my-list',
  data() {
    return {
      items: [],
      cateId: '',
      curPage: 1,
      isLast: false
    }
  },
  props: {
    listType: Number
  },
  /*mounted(){
      this.getListByCateId();
    },*/
  methods: {
    getListByCateId(done) {
      let vm = this
      this.axios(vm.$commonTools.g_restUrl, {
        params: {
          i: '8',
          c: 'entry',
          p: 'article',
          do: 'shop',
          m: 'ewei_shop',
          ccate: vm.listType, //分类
          page: vm.curPage
        }
      })
        .then(function(response) {
          if (response.data.result.list) {
            for (var i = 1; i <= response.data.result.list.length; i++) {
              vm.items.push(response.data.result.list[i - 1])
            }
          }

          if (
            response.data.result.list &&
            response.data.result.list.length == 10
          ) {
            vm.isLast = false
            vm.curPage++
          } else {
            vm.isLast = true
          }
          done()
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    infinite(done) {
      let vm = this
      if (!vm.isLast) {
        vm.getListByCateId(done)
      } else {
        done(true)
      }
    },
    goDetail(id) {
      this.$router.push({ name: 'NewsDetail', params: { id: id } })
    }
  }
}
</script>

<style scoped>
.scroller-container {
  top: -44px !important;
  padding-bottom: 44px;
}

.row {
  margin: 0 2%;
  padding: 2vh 0;
  height: 12vh;
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
  height: 7vh;
  line-height: 3.5vh;
  overflow: hidden;
  font-size: 0.9rem;
}

.row .content {
  width: 100%;
  height: 3vh;
  line-height: 3vh;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.65rem;
  margin-top: 1vh;
  color: #999999;
}
</style>
