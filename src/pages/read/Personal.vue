<template>
  <div class="user center_no_bg">
    <vue-headful title="书友会"/>
    <div class="read-center-wrap">
      <div class="tab-wrapper">
        <div class="tab-item" @click="handleClick('first')" :class="{active:activeItem==1}">
          <el-row>
            <el-col :span="24"><i class="iconfont icon-dushu"></i></el-col>
            <el-col :span="24"><span class="tab-text">书籍</span></el-col>
          </el-row>

        </div>
        <div class="tab-item" @click="handleClick('second')" :class="{active:activeItem==2}">
          <el-row>
            <el-col :span="24"><i class="iconfont icon-jilu note"></i></el-col>
            <el-col :span="24"><span class="tab-text">笔记</span></el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="router-view-wrapper">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>


  </div>
</template>

<script>
  export default {
    name: 'personal',
    data() {
      return {
        activeItem: 0,
      }
    },
    mounted() {
      this.updateActiveItem();
    },
    watch: {
      $route() {
        this.updateActiveItem();
      }
    },
    methods: {
      updateActiveItem: function () {
        switch (this.$route.name) {
          case "BookList":
            this.activeItem = 1;
            break;
          case "NoteList":
            this.activeItem = 2;
            break;
        }
      },
      handleClick(flag) {
        if (flag == 'first') {
          this.$router.push({name: 'BookList'})
        }
        else if (flag == 'second') {
          this.$router.push({name: 'NoteList'})
        }
      }
    }
  }
</script>

<style scoped>
  .read-center-wrap {
    position: absolute;
    bottom: 0;
    height: 8vh;
    background: #ffffff;
    width: 100%;
    z-index: 999;
    box-shadow: 0px -10px 10px #e9e9e9;
  }

  .active {
    position: relative;
  }

  .active span {
    color: #333333;
  }

  .active i {
    color: #0064ba !important;
  }

  .tab-wrapper {
    height: 8vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tab-wrapper .tab-item {
    display: flex;
    align-items: center;
    width: 50%;
    height: 8vh;
    color: #333333;
    font-weight: bold;
    justify-content: center;
  }

  .tab-item .icon-dushu {
    color: #cccccc;
    font-size: 1.4rem;
  }

  .tab-item .icon-jilu {
    color: #cccccc;
    font-size: 1.4rem;
  }

  .tab-item .tab-text {
    font-size: 0.7rem;
  }

  .tab-wrapper .tab-item:first-child {
    border-right: 1px solid #cccccc;
  }

  .router-view-wrapper {
    height: 92vh;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
</style>


