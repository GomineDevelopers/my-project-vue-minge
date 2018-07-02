<template>
  <div>
    <my-comment-list></my-comment-list>
  </div>
</template>

<script>
  import MyCommentList from '@/components/MyCommentList.vue'

  export default {
    name: "note-comment",
    components: {
      'my-comment-list': MyCommentList,
    },
  }
</script>

