<template>
  <div class="container">
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
    mounted:function () {
      this.getCarouselData()
    },
    methods: {
      handleClick(tab, event) {
        this.type = event.target.innerText == '实时要闻' ? 35 : 36;
      },
      getCarouselData(){
        let vm = this
        this.axios('http://192.168.0.5/app/', {
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

<style>
  .container {
    height: 100%;
  }

  .el-carousel {
    height: 30%;
  }

  .el-carousel__container {
    height: 100%;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 30vh;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .el-tabs__nav {
    height: 6vh;
    background: #3A88D5;
    width: 100%;
  }

  .el-tabs__item {
    width: 50%;
    color: #c6daec;
    height: 100%;
    line-height: 100%;
    vertical-align: top;
  }

  .el-tabs__item span {
    position: absolute;
    line-height: 4vh;
    width: 100%;
    left: 0;
    top: 50%;
    height: 4vh;
    margin-top: -2vh;
  }

  .el-tabs__item.is-active {
    color: white;
    font-weight: bold;
  }

  .el-tabs__item.is-active span::after {
    content: "";
    background: white;
    height: 5px;
    width: 5px;
    position: absolute;
    bottom: -2px;
    left: 50%;
    margin-left: -2.5px;
  }

  .el-tabs__active-bar {
    height: 0;
  }

  .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    padding-left: 20px;
  }

  .el-tabs--top .el-tabs__item.is-top:last-child {
    padding-right: 20px;
    border-left: 1px solid #A4C3E4;
  }

  .el-tabs__header {
    margin: 0;
  }

  .el-tabs__content {
    height: 64vh;
    overflow-y: auto;
  }

  .slider-desc {
    background-color: rgba(0,0,0,.2);
    position: absolute;
    bottom: 0;
    padding: 10px;
    width: 100%;
    color: #fff;
    width: 100%;
    height: 25px;
    text-align: left;

    word-wrap: normal; /* for IE */
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .slider-desc span{
    height: 25px;
    line-height: 25px;
    font-size: 14px;
  }
</style>
