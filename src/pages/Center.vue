<template>
  <div>
    <vue-headful title="我的民革"/>
    <div v-if="memberType==1">
      <my-no-member></my-no-member>
    </div>
    <div v-if="memberType==2">
      <my-member></my-member>
    </div>
  </div>

</template>

<script>
  import MyNoMember from '@/components/MyNoMember.vue'
  import MyMember from '@/components/MyMember.vue'

  export default {
    name: "center",
    data() {
      return {
        memberType: "",
      }
    },
    components: {
      'my-no-member': MyNoMember,
      'my-member': MyMember,
    },
    mounted() {
      this.getMemberType();
    },
    methods: {
      getMemberType: function () {
        this.memberType = 2;
      }
    }
  }
</script>

<style scoped>

</style>
