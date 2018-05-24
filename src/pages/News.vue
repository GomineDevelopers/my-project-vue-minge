<template>
  <div class="list-container">
    <vue-headful
      title="时政要闻"
    />
    <el-carousel :interval="5000" arrow="never">
      <el-carousel-item v-for="(item,index) in images" :key="index">
        <img :src="item.thumb">
        <div class="slider-desc"><span v-text="item.title"></span></div>
      </el-carousel-item>
    </el-carousel>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="first">
        <span slot="label"> 实时要闻</span>
        <keep-alive>
          <my-list :listType="type" v-if="type==35"></my-list>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label"> 民革新闻</span>
        <keep-alive>
          <my-list :listType="type" v-if="type==36 "></my-list>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import MyList from '@/components/MyList.vue'

  export default {
    name: 'News',
    data() {
      return {
        activeName: 'first',
        type: 35,
        images:[]
      }
    },
    created:function () {
      this.getCarouselData()
    },
    methods: {
      handleClick(tab, event) {
        this.type = event.target.innerText == '实时要闻' ? 35 : 36;
      },
      getCarouselData(){
        let vm = this
        this.axios(vm.$commonTools.g_restUrl, {
          params: {
            i: "8",
            c: "entry",
            p: "article",
            do: "shop",
            m: "ewei_shop",
            ccate: 36,
            bannd:1
          }
        })
          .then(function (response) {
            vm.images = response.data.result.bannd
          })
          .catch(function (error) {
            console.log(error);
          });

        }
    },
    components: {
      'my-list': MyList
    }
  }
</script>


