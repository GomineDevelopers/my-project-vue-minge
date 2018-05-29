<template>
  <div>
    <vue-headful :title="title"/>
    <my-comment-list></my-comment-list>
  </div>
</template>

<script>
  import MyCommentList from '@/components/MyCommentList.vue'

  export default {
    name: "news-comment",
    components: {
      'my-comment-list': MyCommentList,
    },
    data() {
      return {
        title: ""
      }
    },
    watch: {
      '$route': 'updateHeader',
    },
    created() {
      this.updateHeader();
    },
    methods: {
      updateHeader: function () {
        switch (this.$route.params.typeId) {
          case 1:
            this.title = "留言列表";
            break;
          case 2:
            this.title = "回复列表";
            break;
          case 3:
            this.title = "留言页";
            break;
          case 4:
            this.title = "回复页";
            break;
        }
      }
    },
  }
</script>

