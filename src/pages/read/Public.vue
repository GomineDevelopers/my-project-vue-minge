<template>
  <div class="user center_no_bg">
    <vue-headful title="书友会"/>
    <div class="read-center-wrap">
      <div class="tab-wrapper"></div>
     
        
      
    </div>
    <div class="click-button"> <img src="../../../static/image/my-book-icon.png" alt="" srcset=""> </div>
  </div>
</template>

<script>
export default {
  name: 'public',
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      if (this.activeName == 'first') {
        this.$router.push({ name: 'BooksCenter' })
      } else if (this.activeName == 'second') {
        this.$router.push({ name: 'NotesCenter' })
      } else {
        this.$router.push({ name: 'ShareReadCenter' })
      }
    }
  }
}
</script>

<style scoped>
.read-center-wrap {
  width: 100%;
}
.click-button {
  width: 20vh;
  position: absolute;
  right: 0vh;
  z-index: 999;
}
.click-button img {
  width: 14vh;
}
</style>


