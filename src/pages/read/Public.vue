<template>
  <div class="user center_no_bg" @touchmove.prevent>
    <vue-headful title="书友会"/>
    <div class="read-center-wrap">
      <div class="tab-wrapper">
        <div class="tab-item" @click="handleClick('first')" :class="{active:activeItem==1}"><span>图书中心</span></div>
        <div class="tab-item" @click="handleClick('second')" :class="{active:activeItem==2}"><span>心得笔记</span></div>
        <div class="tab-item" @click="handleClick('third')" :class="{active:activeItem==3}"><span>约伴读书</span></div>
      </div>
      <div class="click-button" 
      @click="gobooklist" 
      @mousedown="down" 
      @touchstart="down"
      @mousemove="move" 
      @touchmove="move"
      @mouseup="end"
      @touchend="end"
      id="moveDiv"> 
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
      activeItem: 0,
      flags: false,
      position: {
        x: 0,
        y: 0
      },
      nx: '',
      ny: '',
      dx: '',
      dy: '',
      xPum: '',
      yPum: ''
    }
  },
  mounted() {
    this.updateActiveItem()
    this.handleClick('first')
    /*去掉iphone手机滑动默认行为*/
    this.handletouchmove()
  },
  watch: {
    $route() {
      this.updateActiveItem()
    }
  },
  methods: {
    handletouchmove() {
      this.document.body.on('touchmove', function(event) {
        event.preventDefault()
      })
    },
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
    },
    // 实现移动端拖拽
    down() {
      this.flags = true
      var touch
      if (event.touches) {
        touch = event.touches[0]
      } else {
        touch = event
      }
      this.position.x = touch.clientX
      this.position.y = touch.clientY
      this.dx = moveDiv.offsetLeft
      this.dy = moveDiv.offsetTop
      console.log(touch.clientX, touch.clientY)
    },
    move() {
      if (this.flags) {
        var touch
        if (event.touches) {
          touch = event.touches[0]
        } else {
          touch = event
        }
        this.nx = touch.clientX - this.position.x
        this.ny = touch.clientY - this.position.y
        this.xPum = this.dx + this.nx
        this.yPum = this.dy + this.ny
        console.log(
          document.documentElement.clientWidth,
          document.documentElement.clientHeight
        )
        if (
          this.xPum > -15 &&
          this.xPum < document.documentElement.clientWidth - 80
        ) {
          moveDiv.style.left = this.xPum + 'px'
          if (
            this.yPum > 0 &&
            this.yPum < document.documentElement.clientHeight - 80
          ) {
            moveDiv.style.top = this.yPum + 'px'
          }
        }
      }
    },
    //鼠标释放时候的函数
    end() {
      this.flags = false
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
  font-weight: bold;
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
  right: 16vw;
  right: 0vw;
  z-index: 998;
  top: 85vh;
  top: 89vh;
  background-color: rgba(0, 133, 208, 0.8);
}

.click-button .el-row {
  margin-top: 5px;
}
.click-button img {
  width: 14vh;
  width: 20px;
  margin-top: 5%;
}
.click-button .mybook {
  font-size: 10px;
  color: white;
}
</style>


