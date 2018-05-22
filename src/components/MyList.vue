<template>
  <scroller
    :on-infinite="infinite">
    <!-- content goes here -->
    <div v-for="(item, index) in items" class="row">
      <div class="image"><img src="http://via.placeholder.com/350x350"></div>
      <div class="text">
        <div class="title">民革中央和最高检在上海开展联合调研</div>
        <div class="content">5月12日至14日，万鄂湘率民革中央、最高人民检察院联合调研组赴上海开展调研。高小玫、张伯军参加调研。</div>
      </div>
    </div>
  </scroller>
</template>

<script>
  export default {
    name: "MyList",
    data() {
      return {
        items: []
      }
    },
    props: {
      listType: String
    },
    mounted() {
      for (var i = 1; i <= 20; i++) {
        this.items.push(i + ' - keep walking, be 2 with you.')
      }
      this.top = 1
      this.bottom = 20
    },
    methods: {
      infinite(done) {
        setTimeout(() => {
          var start = this.bottom + 1
          for (var i = start; i < start + 10; i++) {
            this.items.push(i + ' - keep walking, be 2 with you.')
          }
          this.bottom = this.bottom + 10
          done()
        }, 1500)
      }
    }
  }
</script>

<style scoped>
  .row {
    margin: 0 2%;
    padding: .9vh 0;
    height: 11vh;
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
    max-height: 6vh;
    line-height: 3vh;
    margin-top: .7vh;
    overflow: hidden;
  }

  .row .content {
    width: 100%;
    height: 3vh;
    line-height: 3vh;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    margin-top: .6vh;
  }
</style>
