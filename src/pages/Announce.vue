<template>
  <div class="list-container long-container announce-wrapper">
    <vue-headful
      title="最新发布"
    />
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="first">
        <span slot="label"> 最新发布</span>
        <keep-alive>
          <my-list :listType="type" v-if="type==37"></my-list>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label"> 重要通知</span>
        <keep-alive>
          <my-list :listType="type" v-if="type==38"></my-list>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MyList from '@/components/MyList.vue'

export default {
  name: 'Announce',
  data() {
    return {
      activeName: 'first',
      type: 37
    }
  },
  methods: {
    handleClick(tab, event) {
      this.type = event.target.innerText == '最新发布' ? 37 : 38
    }
  },
  components: {
    'my-list': MyList
  }
}
</script>


