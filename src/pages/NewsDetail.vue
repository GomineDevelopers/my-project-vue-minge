<template>
  <div>
    <vue-headful title="文章详情" />
    <my-detail></my-detail>
  </div>
</template>

<script>
  import MyDetail from '@/components/MyDetail.vue'

  export default {
    name: "news-detail",
    components: {
      'my-detail': MyDetail,
    }
  }
</script>

