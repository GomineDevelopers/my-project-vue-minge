<template>
  <my-comment-list></my-comment-list>
</template>

<script>
  import MyCommentList from '@/components/MyCommentList.vue'

  export default {
    name: "news-comment",
    components: {
      'my-comment-list': MyCommentList,
    }
  }
</script>

