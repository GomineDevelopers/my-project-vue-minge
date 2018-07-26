<template>
  <div class="list-container full-container">
    <vue-headful
      title="社会服务"
    />
    <my-card-list :listType="type"></my-card-list>
  </div>
</template>

<script>
  import MyCardList from '@/components/MyCardList.vue'

  export default {
    name: 'social-service',
    data() {
      return {
        activeName: 'first',
        type: 39
      }
    },
    components: {
      'my-card-list': MyCardList
    }
  }
</script>


