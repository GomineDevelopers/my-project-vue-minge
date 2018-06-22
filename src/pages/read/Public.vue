<template>
  <div class="user center_no_bg">
    <vue-headful title="书友会"/>
    <div class="read-center-wrap">
      <div class="tab-wrapper" >
          <div class="tab-item" @click="handleClick('first')" :class="{active:activeOne}"> <span>图书分享</span></div>
          <div class="tab-item" @click="handleClick('second')" :class="{active:activeTwo}"><span>心得笔记</span> </div>
          <div class="tab-item" @click="handleClick('third')" :class="{active:activeThree}"><span>约伴读书</span> </div>
         </div>
         <div class="click-button"> <img src="../../../static/image/my-book-icon.png" alt="" srcset=""> </div>
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
  name: 'public',
  data() {
    return {
      activeOne: true,
      activeTwo: false,
      activeThree: false
    }
  },
  mounted: function() {
    this.$router.push({ name: 'BooksCenter' })
  },
  methods: {
    handleClick(flag) {
      if (flag == 'first') {
        this.activeOne = true
        this.activeTwo = false
        this.activeThree = false
        this.$router.push({ name: 'BooksCenter' })
      }

      if (flag == 'second') {
        this.activeOne = false
        this.activeTwo = true
        this.activeThree = false
        this.$router.push({ name: 'NotesCenter' })
      }
      if (flag == 'third') {
        this.activeOne = false
        this.activeTwo = false
        this.activeThree = true
        this.$router.push({ name: 'ShareReadCenter' })
      }
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
  color: #ffffff;
}
.active span::after {
  content: '';
  background: white;
  height: 5px;
  width: 5px;
  position: absolute;
  bottom: -2px;
  left: 50%;
  margin-left: -2.5px;
}
.tab-wrapper {
  height: 6vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-wrapper .tab-item {
  height: 6vh;
  line-height: 6vh;
  width: 33%;
  color: #c6daec;
  font-weight: bold;
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
  overflow: scroll;
}
.click-button {
  width: 20vh;
  position: absolute;
  right: 0vh;
  z-index: 998;
  top: 70vh;
}
.click-button img {
  width: 14vh;
}
</style>


