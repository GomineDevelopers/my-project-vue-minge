<template>
  <div class="user center_no_bg">
    <vue-headful title="书友会"/>
    <div class="read-center-wrap">
      <div class="tab-wrapper">
        <div class="tab-item" @click="handleClick('first')" :class="{active:activeItem==1}"><span>图书中心</span></div>
        <div class="tab-item" @click="handleClick('second')" :class="{active:activeItem==2}"><span>闲话评书</span></div>
        <div class="tab-item" @click="handleClick('third')" :class="{active:activeItem==3}"><span>约伴读书</span></div>
      </div>
      <div class="click-button"  @click="gobooklist" > 
        <el-row>
          <el-col :span="24"> <img src="../../../static/image/my-book-icon.png" alt="" srcset=""></el-col>
          <el-col :span="24" class="mybook"> <span>我的图书</span></el-col>
      </el-row>
      </div>
    </div>
    <div class="router-view-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'public',
  data() {
    return {
      activeItem: 0
    }
  },
  mounted() {
    this.updateActiveItem()
    this.handleClick('first')
  },
  watch: {
    $route() {
      this.updateActiveItem()
    }
  },
  methods: {
    updateActiveItem: function() {
      switch (this.$route.name) {
        case 'BookDetailPublic':
        case 'BooksCenter':
          this.activeItem = 1
          break
        case 'NotesCenterDetail':
        case 'NotesCenter':
          this.activeItem = 2
          break
        case 'ShareReadCenter':
          this.activeItem = 3
          break
      }
    },
    handleClick(flag) {
      if (flag == 'first') {
        this.$router.replace({ name: 'BooksCenter' })
      }

      if (flag == 'second') {
        this.$router.replace({ name: 'NotesCenter' })
      }
      if (flag == 'third') {
        this.$router.replace({ name: 'ShareReadCenter' })
      }
    },
    gobooklist() {
      this.$router.push({ name: 'BookList' })
    }
  }
}
</script>

<style scoped>
.read-center-wrap {
  position: absolute;
  top: 0;
  height: 6vh;
  background: #3a88d5;
  width: 100%;
}

.active {
  position: relative;
}

.active span {
  color: #fff;
  font-weight: bold;
}

.active ::before {
  content: ' ';
  background: white;
  height: 5px;
  width: 5px;
  position: absolute;
  bottom: 5px;
  left: 50%;
}

.tab-wrapper {
  height: 6vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.tab-wrapper .tab-item {
  height: 6vh;
  line-height: 6vh;
  width: 33%;
  color: #c6daec;
  font-size: 14px;
  justify-content: center;
}

.tab-wrapper .tab-item:first-child {
  border-right: 1px solid #ffffff;
}

.tab-wrapper .tab-item:last-child {
  border-left: 1px solid #ffffff;
}

.router-view-wrapper {
  margin-top: 6vh;
  height: 94vh;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.click-button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  position: absolute;
  right: 0vw;
  z-index: 998;
  top: 89vh;
  background-color: rgba(0, 133, 208, 0.6);
}
.click-button .el-row {
  margin-top: 5px;
}
.click-button img {
  width: 20px;
  margin-top: 5%;
}
.click-button .mybook {
  font-size: 10px;
  color: white;
}
</style>


