<template>
  <div class="list-container full-container">
    <vue-headful
      title="统战工作"
    />
    <my-card-list :listType="type"></my-card-list>
  </div>
</template>

<script>
  import MyCardList from '@/components/MyCardList.vue'
    export default {
        name: "UnitedWork",
      data() {
        return {
          activeName: 'first',
          type: 40
        }
      },
      components: {
        'my-card-list': MyCardList
      }
    }
</script>

<style scoped>

</style>
