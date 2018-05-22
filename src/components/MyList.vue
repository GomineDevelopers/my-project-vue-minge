<template>
  <scroller
    :on-infinite="infinite">
    <!-- content goes here -->
    <div v-for="(item, index) in items" class="row" :class="{'grey-bg': index % 2 == 0}">
      {{ item }}
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
      infinite (done) {
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

</style>
