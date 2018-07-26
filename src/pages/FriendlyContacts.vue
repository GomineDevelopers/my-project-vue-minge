<template>
  <div class="list-container full-container">
    <vue-headful
      title="友好往来"
    />
    <my-card-list :listType="type"></my-card-list>
  </div>
</template>

<script>
  import MyCardList from '@/components/MyCardList.vue'
    export default {
        name: "FriendlyContacts",
      data() {
        return {
          activeName: 'first',
          type: 55
        }
      },
      components: {
        'my-card-list': MyCardList
      }
    }
</script>

<style scoped>

</style>
