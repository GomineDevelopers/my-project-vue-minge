<template>
  <div class="user center_no_bg">
    <vue-headful title="书友会"/>
    <div class="read-center-wrap">
      <div class="tab-wrapper">
        <div class="circle-cover" v-if="showAdd" @click="goAddPage">
          <div class="add-btn"></div>
          <div class="add-btn-row"></div>
          <div class="add-btn-col"></div>
          <div class="add-btn-text">{{addBtnText}}</div>
        </div>
        <div class="tab-item" @click="handleClick('first')" :class="{active:activeItem==1}">
          <el-row>
            <el-col :span="24"><i class="iconfont icon-dushu"></i></el-col>
            <el-col :span="24"><span class="tab-text">书籍</span></el-col>
          </el-row>

        </div>
        <div class="tab-item" @click="handleClick('second')" :class="{active:activeItem==2}">
          <el-row>
            <el-col :span="24"><i class="iconfont icon-biji note"></i></el-col>
            <el-col :span="24"><span class="tab-text">笔记</span></el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="router-view-wrapper">
      <router-view/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'personal',
    data() {
      return {
        activeItem: 0,
        showAdd: false,
        addBtnText: ""
      }
    },
    mounted() {
      this.updateActiveItem()
    },
    watch: {
      $route() {
        this.updateActiveItem()
      }
    },
    methods: {
      updateActiveItem: function () {
        switch (this.$route.name) {
          case 'BookList':
            this.activeItem = 1;
            this.showAdd = true;
            this.addBtnText = "添加图书";
            break;
          case 'BookDetail':
            this.activeItem = 1;
            this.showAdd = false;
            break;
          case 'NoteList':
            this.activeItem = 2;
            this.showAdd = true;
            this.addBtnText = "添加笔记";
            break;
          case 'AddBook':
            this.activeItem = 1;
            this.showAdd = false;
            break;
          case 'AddNote':
            this.activeItem = 2;
            this.showAdd = false;
            break;
        }
      },
      handleClick(flag) {
        if (flag == 'first') {
          this.$router.push({name: 'BookList'})
        } else if (flag == 'second') {
          this.$router.push({name: 'NoteList'})
        }
      },
      goAddPage: function () {
        if (this.activeItem == 1) {
          this.$router.push({name: 'AddBook'});
        }
        else {
          this.$router.push({name: 'AddNote'});
        }
      }

    }
  }
</script>

<style scoped>

  .add-btn {
    height: 8vh;
    width: 8vh;
    background: #2192e0;
    position: absolute;
    top: -4vh;
    left: 50%;
    margin-left: -4vh;
    border-radius: 50%;
    box-shadow: 0px 0px 20px 5px #e9e9e9;
    z-index:10;
  }

  .add-btn-row,
  .add-btn-col {
    position: absolute;
    height: 5vh;
    width: .6vh;
    background: #ffffff;
    top: -2.5vh;
    left: 50%;
    margin-left: -.3vh;
    border-radius: 100px;
    z-index:11;
  }

  .add-btn-col {
    transform: rotate(90deg);
  }

  .add-btn-text {
    position: absolute;
    top: 4.5vh;
    left: 50%;
    margin-left: -24px;
    font-size: 12px;
    z-index:10;
  }

  .read-center-wrap {
    position: absolute;
    bottom: 0;
    height: 8vh;
    background: #ffffff;
    width: 100%;
    z-index: 999;
    border-top: 1px solid #cccccc;
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

  .tab-item .iconfont {
    color: #cccccc;
    font-size: 1.4rem;
    font-weight: 100;
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


