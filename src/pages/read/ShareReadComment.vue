<template>
  <div>
    <my-comment-list></my-comment-list>
  </div>
</template>

<script>
  import MyCommentList from '@/components/MyCommentList.vue'
    export default {
      name: "ShareReadComment",
      components: {
        'my-comment-list': MyCommentList
      }
    }
</script>

<style scoped>

</style>
