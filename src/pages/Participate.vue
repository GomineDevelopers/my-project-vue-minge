<template>
  <div class="list-container news-list">
    <vue-headful
      title="参政议政"
    />
    <el-carousel :interval="5000" arrow="never">
      <el-carousel-item v-for="(item,index) in images" :key="index">
        <img :src="item.thumb" @click="goDetail(item.id)">
        <div class="slider-desc"><span v-text="item.title"></span></div>
      </el-carousel-item>
    </el-carousel>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="first">
        <span slot="label"> 两会专栏</span>
        <keep-alive>
          <my-list :listType="type" v-if="type==56"></my-list>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label"> 社情民意</span>
        <keep-alive>
          <my-list :listType="type" v-if="type==57 "></my-list>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import MyList from '@/components/MyList.vue'
    export default {
        name: "Participate",
      data() {
        return {
          activeName: 'first',
          type: 56,
          images: []
        }
      },
      created: function() {
        this.getCarouselData()
      },
      methods: {
        handleClick(tab, event) {
          this.type = event.target.innerText == '两会专栏' ? 56 : 57
        },
        getCarouselData() {
          let vm = this
          this.axios(vm.$commonTools.g_restUrl, {
            params: {
              i: '8',
              c: 'entry',
              p: 'article',
              do: 'shop',
              m: 'ewei_shop',
              ccate: 57,
              bannd: 1
            }
          })
            .then(function(response) {
              vm.images = response.data.result.bannd
            })
            .catch(function(error) {
              console.log(error)
            })
        },
        goDetail(id) {
          this.$router.push({name: 'NewsDetail', params: {id: id}})
        }
      },
      components: {
        'my-list': MyList
      }
    }
</script>

<style scoped>

</style>
