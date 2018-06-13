<template>
  <div>
    <el-row  class="gender-picker">
          <el-col :span="24">
             <el-radio-group v-model="radioValue" size="large" @change="emitValue()">
              <el-radio-button  v-for="(item, index) in radioValues" :key="index" :label="item"></el-radio-button>
            </el-radio-group>
          </el-col>
          
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'radio-picker',
  props: {
    radioValues: Array
  },
  data() {
    return {
      radioValue: '男'
    }
  },

  methods: {
    emitValue() {
      this.$emit('handleGender', this.radioValue)
    }
  }
}
</script>
<style scoped>
.gender-picker .el-radio-group {
  width: 100%;
  margin: 1vh 0;
}
.el-radio-button {
  width: 50%;
}
.el-radio-button,
.el-radio-button__inner {
  display: inline-block;
  position: relative;
  outline: 0;
  width: 50%;
}
el-radio-button__inner {
  width: 100%;
}
</style>
<style>
.el-radio-button .el-radio-button__inner {
  width: 100%;
}
</style>

